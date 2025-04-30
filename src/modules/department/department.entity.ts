// department.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';
import { MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    nullable: true, // Makes it optional in TypeORM
    cascade: true, // Optional: allows operations to cascade to sub-departments
  })
  @Field(() => [SubDepartment], { nullable: true }) // Makes it optional in GraphQL
  subDepartments?: SubDepartment[];
}
