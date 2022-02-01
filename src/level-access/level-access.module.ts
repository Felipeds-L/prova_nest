import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelAccess } from './level-access.entity';
import { LevelAccessResolver } from './level-access.resolver';
import { LevelAccessService } from './level-access.service';

@Module({
  providers: [LevelAccessResolver, LevelAccessService],
  imports: [
    TypeOrmModule.forFeature([LevelAccess])
  ],
  exports: [LevelAccessService]
})
export class LevelAccessModule {}
