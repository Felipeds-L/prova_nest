import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    if(!games){
      throw new BadRequestException('any game haver been found!')
    }
    return games
  }

  async findById(id: number): Promise<Game>{
    const game = await this.gameRepository.findOne(id)
    if(!game){
      throw new BadRequestException('Game do not found!')
    }
    return game
  }
  async createGame(data: CreateGameInput): Promise<Game>{
    const game = await this.gameRepository.create(data)
    const game_saved = await this.gameRepository.save(game)

    if(!game_saved){
      throw new InternalServerErrorException('ERROR ON CREATE THE GAME')
    }

    return game_saved
  }

  async updateGame(id: number, data: CreateGameInput): Promise<Game>{
    const game = await this.gameRepository.findOne(id)
    

    if(!game){
      throw new BadRequestException('CAN NOT FIND GAME')
    }
    await this.gameRepository.update(id, {...data})
    const updatedGame = await this.gameRepository.findOne(id)
    
    return updatedGame

  }

  async deleteGame(game_id: number){
    const game = await this.gameRepository.findOne(game_id)
    if(!game){
      throw new BadRequestException('Could not find the game')
    }
    return await this.gameRepository.delete(game_id)
  }
}
