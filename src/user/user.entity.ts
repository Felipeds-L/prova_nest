import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bet/bet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User{

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bet, bet => bet.user)
  public bet: Bet[]
}