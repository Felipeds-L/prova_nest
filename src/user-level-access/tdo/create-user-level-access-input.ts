import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";


@InputType()
export class CreateUserLevelAccessInput{

  @IsNumber()
  @IsNotEmpty({message: 'This field can not be null'})
  user_id: number

  @IsNumber()
  @IsNotEmpty({message: 'This field can not be null'})
  level_access_id: number
}