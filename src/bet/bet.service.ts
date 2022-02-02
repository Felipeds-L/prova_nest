import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    private gameService: GameService,
    private userService: UserService
  ){}

  async showAllBets(): Promise<Bet[]>{
    const bets = await this.betRepository.find()
    return bets
  }
  async createBet(data: CreateBetInput): Promise<any>{
    const user = await this.userService.userById(data.user)
    const game = await this.gameService.findById(data.game)

    if(!user){
      throw new InternalServerErrorException("Error User do not found")
    }else if(!game){
      throw new InternalServerErrorException("Error Game do not found")
    }else{
      let isBetAlreadyMade = false
      let inBetAlreadyExists = false
      // take all the bets made from the user
      const bets_from_user = await this.betRepository.find({where: {user: data.user}})
      for(let x=0;x<bets_from_user.length;x++){
        
        let bet_made = bets_from_user[x].numbers_choosed.split(',')
        let bet_now = data.numbers_choosed.split(',')
        if(this.compareListas(bet_made.sort(), bet_now.sort())){
          isBetAlreadyMade = true
        }
        
      }
      const current = data.numbers_choosed.split(',')


      if(isBetAlreadyMade){
        throw new InternalServerErrorException('The bet already have been made')
      }
      const nonDuplicatedList = [...new Set(current)]
      if(nonDuplicatedList.length === current.length){
        const bet = await this.betRepository.create(data)
        const bet_saved = await this.betRepository.save(bet)
        
        if(!bet_saved){
          throw new InternalServerErrorException("Error on create bet")
        }
    
        return bet_saved
      }else{
        throw new InternalServerErrorException('There are a duplicated number on the list!')
      }
      
    }
  }

  public compareListas(lista1, lista2){
    if (lista1.length !== lista2.length) return false;
      for (let i = 0; i < lista2.length; i++){
        if (lista1[i] !== lista2[i]){
            return false;
        }
      }
    return true;
  }
    
    

}
