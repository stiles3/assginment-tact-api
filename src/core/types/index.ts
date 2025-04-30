import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class GqlApiResponse<T> {
  @Field(() => Boolean)
  status: boolean;

  @Field(() => String)
  message: string;

  abstract data: T;
}
