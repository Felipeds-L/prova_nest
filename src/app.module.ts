import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { GameModule } from './game/game.module';
import { BetModule } from './bet/bet.module';
import { LevelAccessModule } from './level-access/level-access.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    AuthModule,
    GameModule,
    BetModule,
    LevelAccessModule,
    CartModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}