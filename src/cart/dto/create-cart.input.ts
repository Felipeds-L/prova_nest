import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class CreateCartInput{
  @IsNumber()
  @IsNotEmpty({message: 'min_cart_value can not be null'})
  min_cart_value: number
}