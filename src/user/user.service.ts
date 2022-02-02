import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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

  async findOne(email: string): Promise<User>{
    const user = await this.userRepository.findOne({where: {email: email}})
    if(!user){
      throw new NotFoundException('User do not found!')
    }

    return user
  }

  async createUser(data: CreateUserInput): Promise<User>{
    const user = await this.userRepository.create(data)
    const userSaved = await this.userRepository.save(user)
    
    if(!userSaved){
      throw new InternalServerErrorException("Error on create the user!")
    }
    return userSaved;
  }

  
}
