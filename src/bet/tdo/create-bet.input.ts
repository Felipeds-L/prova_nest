import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateBetInput{
  @IsNumber()
  @IsNotEmpty({message: 'game_id need be specified'})
  game: number

  @IsNumber()
  @IsNotEmpty({message: 'user_id need be specified'})  
  user: number

  @IsString()
  @IsNotEmpty({message: 'numbers_choosed need be specified'})
  numbers_choosed: string
}