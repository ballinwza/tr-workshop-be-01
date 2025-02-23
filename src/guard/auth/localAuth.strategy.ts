import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth/auth.service';

export const StrategyAuthName = 'authentication';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyAuthName,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string): Promise<any> {
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new Error('Invalid username !!');
    }
    return user;
  }
}
