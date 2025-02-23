import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyJwtName } from './jwt.strartegy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyJwtName) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      throw new Error(info + err);
    }

    return user;
  }
}
