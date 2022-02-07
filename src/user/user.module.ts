import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LevelAccessModule } from 'src/level-access/level-access.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LevelAccessModule
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
