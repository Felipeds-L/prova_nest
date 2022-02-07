import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsAdmin } from 'src/auth/isAdmin';
import { SAuthGuard } from 'src/auth/SAuth.guard';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';

@Resolver()
@UseGuards(SAuthGuard, IsAdmin)
export class CartResolver {
  constructor(
    private cartService: CartService
  ){}

  @Query(() => [Cart])
  async showCart(): Promise<Cart[]>{
    const cart = await this.cartService.showCart()

    return cart
  }

  @Mutation(() => Cart)
  async createCart(
    @Args('data') data: CreateCartInput
  ): Promise<Cart>{
    const cart = await this.cartService.createCart(data)

    return cart
  }

  @Mutation(() => String)
  async deleteCart(
    @Args('id') data: number
  ): Promise<boolean>{
    await this.cartService.deleteCart(data)

    return true
  }
}
