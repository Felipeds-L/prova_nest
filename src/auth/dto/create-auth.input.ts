import { ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class CreateAuthInput{

  @IsString()
  @IsNotEmpty({message: 'You need pass a email!'})
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty({message: 'You need pass a password!'})
  password: string
}