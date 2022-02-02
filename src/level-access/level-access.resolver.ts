import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LevelAccess } from './level-access.entity';
import { LevelAccessService } from './level-access.service';
import { CreateLevelAccessInput } from './dto/create-level-access.input';

@Resolver()
export class LevelAccessResolver {
  constructor(
    private levelAccessService: LevelAccessService
  ){}

  @Query(() => LevelAccess)
  async levels(
    @Args('id') id: number
  ): Promise <LevelAccess>{
    const level = await this.levelAccessService.levelById(id);

    return level
  }

  @Mutation(() => LevelAccess)
  async createLevelAcces(
    @Args('data') data: CreateLevelAccessInput
  ): Promise<LevelAccess> {
    
    const level_access = await this.levelAccessService.createLevelAcces(data)
    
    return level_access
  }
}
