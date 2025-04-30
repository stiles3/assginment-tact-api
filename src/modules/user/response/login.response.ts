import { ObjectType, Field, ID, PickType } from '@nestjs/graphql';
import { GqlApiResponse } from 'src/core/types';
import { User } from '../user.entity';

@ObjectType()
export class UserLoginData extends PickType(User, [
  'id',
  'username',
] as const) {}

@ObjectType()
export class TokenData {
  @Field(() => UserLoginData)
  user: UserLoginData;

  @Field()
  token: string;
}

@ObjectType()
export class LoginResponse extends GqlApiResponse<TokenData> {
  @Field(() => TokenData, { nullable: true })
  data: TokenData;
}
