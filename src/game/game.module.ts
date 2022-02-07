import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GameService, GameResolver],
  imports: [
    TypeOrmModule.forFeature([Game]),
    AuthModule
  ],
  exports: [GameService]
})
export class GameModule {}
