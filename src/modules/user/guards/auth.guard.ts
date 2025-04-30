import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/core/config';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = this.extractTokenFromCookies(req);

    if (!token) {
      throw new GraphQLError('Unauthorized - No token provided', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envConfig.JWT_ACCESS_TOKEN_SECRET,
      });
      // Attach user to request
      req.user = payload;
    } catch (error) {
      throw new GraphQLError('Unauthorized - Invalid token', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies?.tact_token;
  }
}
