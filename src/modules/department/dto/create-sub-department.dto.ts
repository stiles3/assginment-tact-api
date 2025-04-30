// create-sub-department.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentDto {
  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field()
  @IsNotEmpty()
  departmentId: string;
}
