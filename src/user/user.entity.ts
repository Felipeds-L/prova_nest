import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bet/bet.entity";
import { LevelAccess } from "src/level-access/level-access.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @OneToMany(() => Bet, bet => bet.user,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public bet: Bet[]

  @Field(() => [LevelAccess])
  @ManyToMany(() => LevelAccess, {eager: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinTable({name: 'user_level'})
  access: LevelAccess[]

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}