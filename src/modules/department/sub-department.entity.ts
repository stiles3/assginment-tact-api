import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from './department.entity';

@ObjectType()
@Entity()
export class SubDepartment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, (department) => department.subDepartments)
  department: Department;
}
