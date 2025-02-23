import { AuthModule } from '@/auth/auth.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ApiKeyGuard } from './apiKey/apiKey.guard';
import { LocalAuthStrategy } from './auth/localAuth.strategy';
import { JwtStrategy } from './jwt/jwt.strartegy';

@Module({
  imports: [PassportModule, AuthModule],
  providers: [JwtStrategy, ApiKeyGuard, LocalAuthStrategy],
})
export class GuardModule {}
