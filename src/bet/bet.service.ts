import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './tdo/create-bet.input';

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

}
