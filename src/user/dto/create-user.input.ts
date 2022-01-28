import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator";

@InputType()
export class CreateUserInput{
  @IsString()
  @IsNotEmpty({message: 'This field can not be null'})
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({message: 'This field can not be null'})
  email: string;

  @IsString()
  @IsNotEmpty({message: 'This field can not be null'})
  password: string;
}