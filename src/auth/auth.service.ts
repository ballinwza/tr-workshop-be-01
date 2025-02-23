import { IUser } from '@/user/interface/user.interface';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IJwtPayload } from '../guard/jwt/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<IUser> {
    const user = await this.userService.getByUsername(username);

    if (user && user.username === username) {
      return user;
    }

    throw new Error('Invalid username !!');
  }

  async generateJwtToken(user: IUser, options: JwtSignOptions) {
    const payload: IJwtPayload = { id: user._id };
    return this.jwtService.signAsync(payload, options);
  }
}
