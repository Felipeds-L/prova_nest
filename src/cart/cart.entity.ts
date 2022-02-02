import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Cart{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  min_cart_value: number
}