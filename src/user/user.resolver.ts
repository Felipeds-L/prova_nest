import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SAuthGuard } from 'src/auth/SAuth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ){}

  @Query(() => [User])
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
    @Args('data') data: CreateUserInput,
    @Args('level') level: number
  ): Promise<User>{
    const user = await this.userService.createUser(data, level)
    return user;
  }

  @UseGuards(SAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: CreateUserInput
  ){
    return await this.userService.updateUser(id, data)
  }

  @UseGuards(SAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('user_id') user_id: number
  ){
    await this.userService.deleteUser(user_id)
    return true
  }
}
