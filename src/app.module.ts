import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { LevelAccessService } from './level-access/level-access.service';
import { LevelAccessResolver } from './level-access/level-access.resolver';
import { LevelAccessModule } from './level-access/level-access.module';
import { UserLevelAccessService } from './user-level-access/user-level-access.service';
import { UserLevelAccessModule } from './user-level-access/user-level-access.module';
import { BetsService } from './bets/bets.service';
import { BetsModule } from './bets/bets.module';
import { BetService } from './bet/bet.service';
import { BetModule } from './bet/bet.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    GameModule,
    LevelAccessModule,
    UserLevelAccessModule,
    BetsModule,
    BetModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService, LevelAccessService, LevelAccessResolver, UserLevelAccessService, BetsService, BetService, CartService],
})
export class AppModule {}
