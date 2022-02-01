import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './tdo/create-bet.input';

@Resolver('Bet')
export class BetResolver {
  constructor(
    private betService: BetService
  ){}

  @Query(() => [Bet])
  async bets(): Promise<Bet[]>{
    const bets = await this.betService.showAllBets()

    return bets
  }

  // @Mutation(() => Bet)
  // async create(
  //   @Args('data') data: CreateBetInput
  // ): Promise<Bet>{
  //   const bet = await this
  // }
}
