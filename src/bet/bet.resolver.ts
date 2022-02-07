import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { IsClient } from 'src/auth/isClient';
import { SAuthGuard } from 'src/auth/SAuth.guard';
import { userLogged } from 'src/auth/user-logged';
import { User } from 'src/user/user.entity';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { BetsInputTDO } from './dto/create-bet.input';

@UseGuards(SAuthGuard, IsClient)
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
  
  @Query(() => [Bet])
  async betsUser(
    @Args('user') user: number
  ): Promise<Bet[]>{
    const bets = await this.betService.betsFromUser(user)

    return bets
  }

  @Mutation(() => [Bet])
  async createBet(
    @Args('data') data: BetsInputTDO,
    @userLogged() user: User
  ): Promise<Bet[]>{

    const bet = await this.betService.createBet(data, user)
    return bet
  }

  @Mutation(() => Boolean)
  async deleteBet(
    @Args('id') id: number
  ): Promise<boolean>{
    await this.betService.delete(id)
    return true
  }

}
