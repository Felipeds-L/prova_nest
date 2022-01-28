import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game-input';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ){}

  async createUser(data: CreateGameInput): Promise<Game>{
    const game = await this.gameRepository.create(data)
    const gameSaved = await this.gameRepository.save(game)

    if(!gameSaved){
      throw new InternalServerErrorException('Error on create the game') 
    }

    return gameSaved
  }
}
