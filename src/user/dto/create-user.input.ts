import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator";

@InputType()
export class CreateUserInput{
  @Field()
  @IsString()
  @IsNotEmpty({message: 'Username can not be null'})
  username: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty({message: 'Email can not be null'})
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({message: 'Password can not be null'})
  password: string;
}