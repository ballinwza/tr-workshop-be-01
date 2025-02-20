import { configEnv } from '@/common/configs/configEnv.config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private readonly jwtService: JwtService) {
    const { jwtSecret } = configEnv();
    this.jwtSecret = jwtSecret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.cookies?.jwt;

    if (!apiKey) {
      throw new UnauthorizedException('Missing API Key');
    }

    const payload = await this.validateApiKey(apiKey as string);

    if (!payload) {
      throw new UnauthorizedException('Invalid or expired API Key');
    }

    console.log('payload', payload);
    request['id'] = payload;

    return true;
  }

  private async validateApiKey(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.jwtSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired API Key : ', error);
    }
  }
}
