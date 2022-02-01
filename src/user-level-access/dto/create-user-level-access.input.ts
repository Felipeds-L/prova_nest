import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class CreateUserLevelAccessInput{
  @IsNumber()
  @IsNotEmpty({message: 'User can not be null'})
  user: number

  @IsNumber()
  @IsNotEmpty({message: 'Level Access can not be null'})
  level_access: number
}