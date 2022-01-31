import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  providers: [BetResolver, BetService],
  imports: [
    TypeOrmModule.forFeature([Bet])
  ]
})
export class BetModule {}
