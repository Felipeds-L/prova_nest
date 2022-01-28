import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game-input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver('Game')
export class GameResolver {
  constructor(
    private gameService: GameService
  ){}

  @Mutation(() => Game)
  async createUser(
    @Args('data') data: CreateGameInput
  ): Promise<Game>{
    const user = await this.gameService.createUser(data)
    return user
  }
}
