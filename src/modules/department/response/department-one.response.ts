import { ObjectType, Field, Int, ID, PickType } from '@nestjs/graphql';
import { GqlApiResponse } from 'src/core/types';
import { Department } from '../department.entity';

@ObjectType()
export class DepartmentOneData extends PickType(Department, [
  'id',
  'name',
  'subDepartments',
] as const) {}

@ObjectType()
export class DepartmentOneResponse extends GqlApiResponse<DepartmentOneData | null> {
  @Field(() => DepartmentOneData, { nullable: true })
  data: DepartmentOneData | null;
}
