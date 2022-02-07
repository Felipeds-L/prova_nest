import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelAccess } from './level-access.entity';
import { CreateLevelAccessInput } from './dto/create-level-access.input';

@Injectable()
export class LevelAccessService {
  constructor(
    @InjectRepository(LevelAccess)
    private levelAccessRepository: Repository<LevelAccess>
  ){}

  async findAll(): Promise<LevelAccess[]>{
    const levels = await this.levelAccessRepository.find()

    if(!levels){
      throw new BadRequestException('any level access found!')
    }

    return levels
  }

  async levelById(id: number): Promise<LevelAccess>{
    const level = await this.levelAccessRepository.findOne(id)

    if(!level){
      throw new NotFoundException('Level do not found!')
    }

    return level;
  }

  async createLevelAcces(data: CreateLevelAccessInput): Promise<LevelAccess>{
    const level_access = await this.levelAccessRepository.create(data)
    const level_access_saved = await this.levelAccessRepository.save(level_access)

    if(!level_access_saved){
      throw new InternalServerErrorException('Error on create the level access')
    }

    return level_access_saved
  }

  async updateLevel(data: CreateLevelAccessInput, level_id: number): Promise<LevelAccess>{
    const level = await this.levelAccessRepository.findOne(level_id)
    if(!level){
      throw new BadRequestException('Level Access do not found!')
    }
    await this.levelAccessRepository.update(level_id,  {...data})

    const level_updated = await this.levelAccessRepository.findOne(level_id)

    return level_updated
  }

  async deleteLevel(level_id: number){
    const level = await this.levelAccessRepository.findOne(level_id)
    if(!level){
      throw new BadRequestException('Level Access do not found!')
    }

    return await this.levelAccessRepository.delete(level_id)
  }
}
