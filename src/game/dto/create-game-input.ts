import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateGameInput{
  @IsString()
  @IsNotEmpty()
  type: string


  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  range: number

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  max_number: number

  @IsString()
  @IsNotEmpty()
  color: string

}