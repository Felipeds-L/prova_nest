import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { GameService } from 'src/game/game.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { BetsInputTDO, CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    private gameService: GameService,
    private userService: UserService,
    private cartService: CartService
  ){}

  async showAllBets(): Promise<Bet[]>{
    const bets = await this.betRepository.find()
    return bets
  }

  async betsFromUser(user: number): Promise<Bet[]>{
    const bets = await this.betRepository.find({where: {user: user}})
    if(!bets){
      throw new InternalServerErrorException("Error on find the bets")
    }

    return bets
  }
  
  async createBet(data: BetsInputTDO, user: User): Promise<any>{

      const bets = data.bets
      
      const cart = await this.cartService.showCart()
      let price = 0
      let hasBeenCreated = false
      let isBetAlreadyMade = false
      let inBetAlreadyExists = false
      let isOutOfRange = false

      for(let x = 0;x<bets.length;x++){
        const game = await this.gameService.findById(bets[x].game)
        price += game.price
      }

      if(price < cart[0].min_cart_value){
        throw new InternalServerErrorException(`the cart need have at leat ${cart[0].min_cart_value}, still have ${price}`)
      }

      for(let x = 0;x<bets.length;x++){
        const bets_made = await this.betRepository.find({
          where: {
            user: user,
            game: bets[x].game
          }
        })
        const game = await this.gameService.findById(bets[x].game)

        for(let y=0;y<bets_made.length;y++){
          const bet_now = bets[x].numbers_choosed.split(',')
          const bet_already = bets_made[y].numbers_choosed.split(',')

          if(this.compareListas(bet_now.sort(), bet_already.sort())){
            isBetAlreadyMade = true
          }
        }
  
        for(let w =0;w<bets.length;w++){
          for(let y=w+1;y<bets.length-1;y++){
            const bet_next = bets[y].numbers_choosed.split(',')
            const bet_now = bets[w].numbers_choosed.split(',')
  
            if(this.compareListas(bet_now.sort(), bet_next.sort())){
              inBetAlreadyExists = true
            }
          }
        }

        for(let w =0;w<bets.length;w++){
          const bet = bets[x].numbers_choosed.split(',')
          for(let y =0;y<bet.length;y++){
            if(Number(bet[y]) > game.range){
              isOutOfRange = true
            }
          }
        }

        const current = bets[x].numbers_choosed.split(',')
        const nonDuplicatedList = [... new Set(current)]

        if(isBetAlreadyMade){
          throw new InternalServerErrorException("Bet already made by the user!")
        }else if(inBetAlreadyExists){
          throw new InternalServerErrorException("There is a bet duplicated on your trying to do!")
        }else if(nonDuplicatedList.length != current.length){
          throw new InternalServerErrorException("There is a duplicated number on one of yours bet!")
        }else if(isOutOfRange){
          throw new InternalServerErrorException("There ir a number out of range!!")
        }
        const bet = await this.betRepository.create({
          user: user.id,
          game: bets[x].game,
          numbers_choosed: bets[x].numbers_choosed
        })
        if(bet){
          await this.betRepository.save(bet)
          hasBeenCreated = true
        }else{
          hasBeenCreated = false
        }

      }
      
      return data
      
  }

  async delete(id: number){
    const bet = await this.betRepository.findOne({where: {id}})
    if(!bet){
      throw new InternalServerErrorException('Bet do not found!')
    }

    await this.betRepository.delete(id)
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

  public compareValues(lista){
    for(let i = 0; i < lista.length; i++) {
        if(lista.indexOf(lista[i]) != i) {
            return true;
        };
    }
    return false;
  }
    
    

}
