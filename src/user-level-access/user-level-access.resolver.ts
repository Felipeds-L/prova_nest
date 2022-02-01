import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserLevelAccessInput } from './dto/create-user-level-access.input';
import { UserLevelAccess } from './user-level-access.entity';
import { UserLevelAccessService } from './user-level-access.service';

@Resolver()
export class UserLevelAccessResolver {
  constructor(
    private userLevelAccessService: UserLevelAccessService
  ){}

  @Mutation(() => UserLevelAccess)
  async createUserLevel(
    @Args('data') data: CreateUserLevelAccessInput
  ): Promise<UserLevelAccess>{
    const user_level = await this.userLevelAccessService.createUserLevel(data)
    return user_level
  }
}
