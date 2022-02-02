import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelAccessService } from 'src/level-access/level-access.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserLevelAccessInput } from './dto/create-user-level-access.input';
import { UserLevelAccess } from './user-level-access.entity';

@Injectable()
export class UserLevelAccessService {
  constructor(
    @InjectRepository(UserLevelAccess)
    private userLevelAccessRepository: Repository<UserLevelAccess>,
    private userService: UserService,
    private levelService: LevelAccessService
  ){}

  async findUserLevel(user: number){
    const user_level = await this.userLevelAccessRepository.find({where: { user: user }})
    let isAdmin = false
    user_level.forEach((user) => {
      if(user.level_access === 1){
        isAdmin = true
      }
    })

    return isAdmin
  }

  async createUserLevel(data: CreateUserLevelAccessInput): Promise<UserLevelAccess>{
    const level = await this.levelService.levelById(data.level_access)
    const user = await this.userService.userById(data.user)
    
    if(!level){
      throw new InternalServerErrorException('The level_access informed do not exist!')
    }else if(!user){
      throw new InternalServerErrorException('The User your trying to add a level_access do not exist!')
    }else{
      const user_level = await this.userLevelAccessRepository.create(data)
      const user_level_saved = await this.userLevelAccessRepository.save(user_level)
      if(!user_level_saved){
        throw new InternalServerErrorException("Error on attribute to the level to a user")
      }
  
      return user_level_saved
    }
    
  }
}
