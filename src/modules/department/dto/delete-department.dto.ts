// update-department.dto.ts
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class DeleteDepartmentDto {
  @Field(() => ID)
  id: string;
}
