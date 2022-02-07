import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LevelAccess } from './level-access.entity';
import { LevelAccessService } from './level-access.service';
import { CreateLevelAccessInput } from './dto/create-level-access.input';
import { SAuthGuard } from 'src/auth/SAuth.guard';
import { UseGuards } from '@nestjs/common';
import { IsAdmin } from 'src/auth/isAdmin';

@Resolver()
@UseGuards(SAuthGuard, IsAdmin)
export class LevelAccessResolver {
  constructor(
    private levelAccessService: LevelAccessService
  ){}

  @UseGuards(SAuthGuard, IsAdmin)
  @Query(() => [LevelAccess])
  async findLevels(): Promise<LevelAccess[]>{
    return await this.levelAccessService.findAll()
  }

  @UseGuards(SAuthGuard, IsAdmin)
  @Query(() => LevelAccess)
  async levels(
    @Args('id') id: number
  ): Promise <LevelAccess>{
    const level = await this.levelAccessService.levelById(id);

    return level
  }

  @UseGuards(SAuthGuard, IsAdmin)
  @Mutation(() => LevelAccess)
  async createLevelAcces(
    @Args('data') data: CreateLevelAccessInput
  ): Promise<LevelAccess> {
    
    const level_access = await this.levelAccessService.createLevelAcces(data)
    
    return level_access
  }

  @UseGuards(SAuthGuard, IsAdmin)
  @Mutation(() => LevelAccess)
  async updateLevel(
    @Args('level_id') level_id: number,
    @Args('data') data: CreateLevelAccessInput
  ): Promise<LevelAccess> {
    
    return await this.levelAccessService.updateLevel(data, level_id)
    
  }

  @UseGuards(SAuthGuard, IsAdmin)
  @Mutation(() => Boolean)
  async deleteLevel(
    @Args('level_id') level_id: number
  ): Promise<boolean> {
    
    await this.levelAccessService.deleteLevel(level_id)
    
    return true
  }
}
