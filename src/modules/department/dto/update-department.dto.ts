// update-department.dto.ts
import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentDto {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name?: string;
}
