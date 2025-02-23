import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { StrategyAuthName } from './localAuth.strategy';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyAuthName) {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new Error(err);
    }

    return user;
  }
}
