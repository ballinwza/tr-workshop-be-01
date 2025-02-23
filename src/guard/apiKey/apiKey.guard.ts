import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const xAPIKey = process.env.X_API_KEY;
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyFromHeader = request.headers['x-api-key'];

    if (xAPIKey !== apiKeyFromHeader) {
      throw new Error('invalid x-api-key !!!');
    }

    return true;
  }
}
