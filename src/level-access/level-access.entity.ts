import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class LevelAccess{

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  level: string
}