import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Level_Access{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  level_access: string
}