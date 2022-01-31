import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator";

@InputType()
export class CreateUserInput{
  @IsString()
  @IsNotEmpty({message: 'Username can not be null'})
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({message: 'Email can not be null'})
  email: string;

  @IsString()
  @IsNotEmpty({message: 'Password can not be null'})
  password: string;
}