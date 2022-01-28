import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameResolver } from './game.resolver';

@Module({
  providers: [GameService, GameResolver],
  controllers: [GameController]
})
export class GameModule {}
