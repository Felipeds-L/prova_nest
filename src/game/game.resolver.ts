import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { IsAdmin } from 'src/auth/isAdmin';
import { SAuthGuard } from 'src/auth/SAuth.guard';
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

  @Query(() => Game)
  async findById(id): Promise<Game>{
    const game = await this.gameServive.findById(id)

    return game
  }

  @UseGuards(SAuthGuard, IsAdmin)
  @Mutation(() => Game)
  async createGame(
    @Args('data') data: CreateGameInput
  ): Promise<Game> {
    const game = await this.gameServive.createGame(data);

    return game;
  }
}
