import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse } from './response/user.response';
import { CreateUserInput } from './dto/create-user.dto';
import { LoginUserInput } from './dto/login-user.dto';
import { LoginResponse } from './response/login.response';
import { AuthGuard } from './guards';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: { res: Response },
  ) {
    const { res } = context;
    return await this.userService.loginUser(loginUserInput, res);
  }
  @Mutation(() => UserResponse)
  async logoutUser(@Context() context: { res: Response }) {
    const { res } = context;
    return await this.userService.logoutUser(res);
  }
  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async getUser(@Context() context): Promise<UserResponse> {
    const userId = context.req.user.id;
    return await this.userService.getUser(userId);
  }
}
