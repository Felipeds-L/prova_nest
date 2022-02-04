import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserLevelAccessModule } from 'src/user-level-access/user-level-access.module';

@Module({
  providers: [GameService, GameResolver],
  imports: [
    TypeOrmModule.forFeature([Game]),
    AuthModule,
    UserLevelAccessModule
  ],
  exports: [GameService]
})
export class GameModule {}
