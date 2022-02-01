import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateLevelAccessInput{
  @IsString()
  @IsNotEmpty({message: 'level can not be null'})
  level: string
}