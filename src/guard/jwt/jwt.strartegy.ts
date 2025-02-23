import { configEnv } from '@/common/configs/configEnv.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from './jwt.payload.interface';

export const StrategyJwtName = 'jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyJwtName) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configEnv().jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.id };
  }
}
