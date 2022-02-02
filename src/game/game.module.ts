import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';

@Module({
  providers: [GameService, GameResolver],
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  exports: [GameService]
})
export class GameModule {}
