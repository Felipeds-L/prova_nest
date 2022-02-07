import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartInput } from './dto/create-cart.input';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
  ){}

  async showCart(): Promise<Cart[]>{
    const cart = await this.cartRepository.find()

    if(!cart){
      throw new InternalServerErrorException('Can not found a cart!')
    }

    return cart
  }

  async createCart(data: CreateCartInput): Promise<Cart>{
    const isCartAlreadyExist = await this.cartRepository.find()
    if(isCartAlreadyExist.length > 0){
      throw new InternalServerErrorException("Cart already exist! Delete it and create a new")
    }
    const cart = await this.cartRepository.create(data)
    const cart_saved = await this.cartRepository.save(data)

    if(!cart){
      throw new InternalServerErrorException('Error on create the cart!')
    }

    return cart_saved
  }

  async deleteCart(id: number){
    const cart = await this.cartRepository.findOne({where: {id: id}})
    if(!cart){
      throw new InternalServerErrorException("Cart do not found!")
    }
    await this.cartRepository.delete(id)
  }
}
