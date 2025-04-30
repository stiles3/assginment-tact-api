// create-sub-department.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field()
  @IsNotEmpty()
  page: number;

  @Field()
  @IsNotEmpty()
  limit: number;
}
