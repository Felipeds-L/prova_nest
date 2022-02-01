import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver()
export class GameResolver {
  constructor(
    private gameServive: GameService
  ){}

  @Query(() => [Game])
  async allGames(): Promise<Game[]> {
    const games = await this.gameServive.findAll()

    return games
  }

  @Mutation(() => Game)
  async createGame(
    @Args('data') data: CreateGameInput
  ): Promise<Game> {
    const game = await this.gameServive.createGame(data);

    return game;
  }
}
