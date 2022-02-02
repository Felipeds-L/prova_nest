import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  providers: [CartService, CartResolver],
  imports: [
    TypeOrmModule.forFeature([Cart])
  ],
})
export class CartModule {}
