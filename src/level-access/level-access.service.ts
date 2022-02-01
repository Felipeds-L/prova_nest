import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async levelById(id: number): Promise<LevelAccess>{
    const level = await this.levelAccessRepository.findOne(id)

    if(!level){
      throw new NotFoundException('User do not found!')
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
}
