import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';

@Resolver()
export class CartResolver {
  constructor(
    private cartService: CartService
  ){}

  @Mutation(() => Cart)
  async createCart(
    @Args('data') data: CreateCartInput
  ): Promise<Cart>{
    const cart = await this.cartService.createCart(data)

    return cart
  }
}
