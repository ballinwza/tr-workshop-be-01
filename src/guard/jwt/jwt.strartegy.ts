import { configEnv } from '@/common/configs/configEnv.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from './jwt.payload.interface';

export const StrategyJwtName = 'jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyJwtName) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies.access_token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configEnv().jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.id };
  }
}
