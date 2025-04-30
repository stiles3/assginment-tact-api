// create-department.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MinLength, IsNotEmpty } from 'class-validator';
import { CreateSubdepartmentDto } from './create-subdepartment.dto';

@InputType()
export class CreateDepartmentDto {
  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => [CreateSubdepartmentDto], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubdepartmentDto)
  subDepartments?: CreateSubdepartmentDto[];
}
