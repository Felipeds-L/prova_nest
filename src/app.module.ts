import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { BetModule } from './bet/bet.module';
import { LevelAccessService } from './level-access/level-access.service';
import { LevelAccessResolver } from './level-access/level-access.resolver';
import { LevelAccessModule } from './level-access/level-access.module';


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
  ],
  controllers: [AppController],
  providers: [AppService, LevelAccessService, LevelAccessResolver],
})
export class AppModule {}
