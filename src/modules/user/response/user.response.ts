import { ObjectType, Field, Int, ID, PickType } from '@nestjs/graphql';
import { GqlApiResponse } from 'src/core/types';
import { User } from '../user.entity';

@ObjectType()
export class UserPublicData extends PickType(User, [
  'id',
  'username',
] as const) {}

@ObjectType()
export class UserResponse extends GqlApiResponse<UserPublicData> {
  @Field(() => UserPublicData, { nullable: true })
  data: UserPublicData;
}
