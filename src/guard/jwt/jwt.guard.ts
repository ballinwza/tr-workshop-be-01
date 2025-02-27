import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { StrategyJwtName } from './jwt.strartegy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyJwtName) {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.headers.authorization && request.cookies?.access_token) {
      request.headers.authorization = `Bearer ${request.cookies.access_token}`;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      throw new Error(info + err);
    }

    return user;
  }
}
