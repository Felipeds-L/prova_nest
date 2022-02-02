import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';
import { UserModule } from 'src/user/user.module';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  providers: [BetResolver, BetService],
  imports: [
    TypeOrmModule.forFeature([Bet]),
    GameModule,
    UserModule
  ],
  exports: [BetService]
})
export class BetModule {}
