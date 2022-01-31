import { InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

@InputType()
export class CreateGameInput{
  @IsString()
  @IsNotEmpty({message: 'Type can not be null'})
  type: string

  @IsString()
  @IsNotEmpty({message: 'Description can not be null'})
  description: string

  @IsNumber()
  @IsNotEmpty({message: 'Range can not be null'})
  range: number

  @IsNumber()
  @IsNotEmpty({message: 'Price can not be null'})
  price: number

  @IsNumber()
  @IsNotEmpty({message: 'Max-Number can not be null'})
  max_number: number

  @IsString()
  @IsNotEmpty({message: 'Color can not be null'})
  color: string

}