import { Res } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Response } from 'express';
import { GameService } from 'src/game/game.service';
import { UserService } from 'src/user/user.service';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';

@Resolver('Bet')
export class BetResolver {
  constructor(
    private betService: BetService,
  ){}

  @Query(() => [Bet])
  async bets(): Promise<Bet[]>{
    const bets = await this.betService.showAllBets()

    return bets
  }

  @Mutation(() => Bet)
  async createBet(
    @Args('data') data: CreateBetInput
  ): Promise<any>{
    const bet = await this.betService.createBet(data)
    return bet
  }
}
