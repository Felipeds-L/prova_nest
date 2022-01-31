import { Get, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ){}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users(): Promise<User[]>{
    const users = await this.userService.findAllUsers()

    return users;
  }

  @Query(() => User)
  async user(
    @Args('id') id: number
  ): Promise <User>{
    const user = await this.userService.userById(id);

    return user
  }


  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserInput
  ): Promise<User>{
    const user = await this.userService.createUser(data)
    return user;
  }

}
