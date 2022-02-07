import { InputType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Game } from "src/game/game.entity";
import { User } from "src/user/user.entity";

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

@InputType()
export class BetsInputTDO{
  @Field(() => [CreateBetInput])
  @IsArray()
  bets: CreateBetInput[]
}