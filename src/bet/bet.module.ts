import { Module } from '@nestjs/common';
import { BetResolver } from './bet.resolver';

@Module({
  providers: [BetResolver]
})
export class BetModule {}
