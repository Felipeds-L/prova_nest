import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserLevelAccessInput } from './dto/create-user-level-access.input';
import { UserLevelAccess } from './user-level-access.entity';

@Injectable()
export class UserLevelAccessService {
  constructor(
    @InjectRepository(UserLevelAccess)
    private userLevelAccessRepository: Repository<UserLevelAccess>
  ){}

  async createUserLevel(data: CreateUserLevelAccessInput): Promise<UserLevelAccess>{
    const user_level = await this.userLevelAccessRepository.create(data)
    const user_level_saved = await this.userLevelAccessRepository.save(user_level)

    if(!user_level_saved){
      throw new InternalServerErrorException("Error on attribute to the level to a user")
    }

    return user_level_saved
  }
}
