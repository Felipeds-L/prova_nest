import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { GameModule } from 'src/game/game.module';
import { GameService } from 'src/game/game.service';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { Bet } from './bet.entity';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';

@Module({
  providers: [BetResolver, BetService],
  imports: [
    TypeOrmModule.forFeature([Bet]),
    GameModule,
    UserModule,
    CartModule,
    MailModule
  ],
  exports: [BetService]
})
export class BetModule {}
