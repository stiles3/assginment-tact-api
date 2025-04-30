import { ObjectType, Field, Int, ID, PickType } from '@nestjs/graphql';
import { GqlApiResponse } from 'src/core/types';
import { Department } from '../department.entity';

@ObjectType()
export class DepartmentsData extends PickType(Department, [
  'id',
  'name',
  'subDepartments',
] as const) {}

@ObjectType()
export class PaginatedData {
  @Field()
  total: number;
  @Field()
  page: number;
  @Field()
  limit: number;
}

@ObjectType()
export class DeptData {
  @Field(() => [DepartmentsData])
  departments: DepartmentsData[];

  @Field(() => PaginatedData)
  meta: PaginatedData;
}

@ObjectType()
export class DepartmentsResponse extends GqlApiResponse<DeptData> {
  @Field(() => DeptData, { nullable: true })
  data: DeptData;
}
