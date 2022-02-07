import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';import { error } from 'console';
import { response } from 'express';
import { throwError } from 'rxjs';
import { LevelAccessService } from 'src/level-access/level-access.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private levelService: LevelAccessService
  ){}

  async findAllUsers(): Promise<User[]>{
    const users = await this.userRepository.find();
    return users;
  }

  async userById(id: number): Promise<User>{
    const user = await this.userRepository.findOne(id)

    if(!user){
      throw new NotFoundException('User do not found!')
    }

    return user;
  }

  async createUser(data: CreateUserInput, level: number): Promise<User>{
    const user_exist_email = await this.userRepository.findOne({where:{email: data.email}})
    if(user_exist_email){
      throw new InternalServerErrorException('Email already exist!')
    }
    const user = await this.userRepository.create(data)
    const userSaved = await this.userRepository.save(user)
    const level_access = await this.levelService.levelById(level)

    userSaved.access = [level_access]
    
    if(!userSaved){
      throw new InternalServerErrorException("Error on create the user!")
    }
    return await this.userRepository.save(userSaved);
  }

  async updateUser(id: number, data: CreateUserInput){
    const user = await this.userRepository.findOne(id)
    if(!user){
      throw new InternalServerErrorException("User do not found")
    }
    await this.userRepository.update(id, {...data})

    const updatedUser = await this.userRepository.findOne(id)
    if(!updatedUser){
      throw new InternalServerErrorException("User do not found")
    }
    return updatedUser
  }

  async deleteUser(user_id: number){
    const user = await this.userRepository.findOne(user_id)
    if(!user){
      throw new InternalServerErrorException("User do not found!")
    }

    return await this.userRepository.delete(user_id)
  }

  
}
