import { Module } from '@nestjs/common';
import { UserLevelAccessService } from './user-level-access.service';
import { UserLevelAccessResolver } from './user-level-access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLevelAccess } from './user-level-access.entity';
import { UserModule } from 'src/user/user.module';
import { LevelAccessModule } from 'src/level-access/level-access.module';

@Module({
  providers: [UserLevelAccessService, UserLevelAccessResolver],
  imports: [
    TypeOrmModule.forFeature([UserLevelAccess]),
    UserModule,
    LevelAccessModule
  ],
  exports: [UserLevelAccessService]
})
export class UserLevelAccessModule {}
