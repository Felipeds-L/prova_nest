import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>
  ){}

  async showAllBets(): Promise<Bet[]>{
    const bets = await this.betRepository.find()
    return bets
  }
  async createBet(data: CreateBetInput): Promise<Bet>{
    const bet = await this.betRepository.create(data)
    const bet_saved = await this.betRepository.save(bet)
  
    if(!bet_saved){
      throw new InternalServerErrorException("Error on create bet")
    }

    return bet_saved
  }

}
