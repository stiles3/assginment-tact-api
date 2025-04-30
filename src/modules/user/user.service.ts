import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { hashPassword, verifyPassword } from 'src/shared/utils';
import { LoginUserInput } from './dto/login-user.dto';

import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/core/config';
import { IDecodedJwtToken } from './strategies';
import { UserResponse } from './response/user.response';
import { LoginResponse } from './response/login.response';
import { Context } from '@nestjs/graphql';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<UserResponse> {
    const { password, username } = createUserInput;
    const hashedPassword = await hashPassword(password);
    const user = this.repo.create({
      password: hashedPassword,
      username,
    });

    const savedUser = await this.repo.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;

    const response = new UserResponse();
    response.status = true;
    response.message = 'User created successfully';
    response.data = userWithoutPassword;

    return response;
  }
  async loginUser(loginUserInput: LoginUserInput, res): Promise<UserResponse> {
    const { username, password } = loginUserInput;
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new BadRequestException('Account does not exist');
    }
    const isValidPassword = await verifyPassword(
      password,
      user?.password || '',
    );

    if (!isValidPassword) {
      throw new BadRequestException('Password does not match');
    }
    let jwt = await this.generateJwtTokens({ id: user.id.toString() });
    res.cookie('tact_token', jwt.accessToken, {
      httpOnly: true,
      secure: true, // Must be false in localhost (no HTTPS)
      sameSite: 'none', // or 'none' if still not working
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/',
    });
    return {
      status: true,
      message: 'Login success',
      data: user,
    };
  }

  async getUser(userId: string): Promise<UserResponse> {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid user');
    }
    return {
      status: true,
      message: 'User Loaded',
      data: user,
    };
  }
  async logoutUser(res): Promise<UserResponse> {
    res.clearCookie('tact_token', {
      httpOnly: true,
      secure: true, // Should match the same settings as when the cookie was set
      sameSite: 'lax',
      path: '/',
    });

    return {
      status: true,
      message: 'Logout successful',
      data: null,
    };
  }

  private async generateJwtTokens(
    payload: IDecodedJwtToken,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: envConfig.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRY,
    });

    return { accessToken };
  }
}
