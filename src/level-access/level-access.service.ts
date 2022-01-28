import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level_Access } from './level-access.entity';

@Injectable()
export class LevelAccessService {
  constructor(
    @InjectRepository(Level_Access)
    private level_accessRepository: Repository<Level_Access>
  ){}

  
}
