// update-sub-department.dto.ts
import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateSubDepartmentDto {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name?: string;
}
