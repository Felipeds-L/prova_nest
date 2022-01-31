import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ){}
  
  async findAll(): Promise<Game[]>{
    const games = await this.gameRepository.find()

    return games
  }

  async createGame(data: CreateGameInput): Promise<Game>{
    const game = await this.gameRepository.create(data)
    const game_saved = await this.gameRepository.save(game)

    if(!game_saved){
      throw new InternalServerErrorException('ERROR ON CREATE THE GAME')
    }

    return game_saved
  }
}
