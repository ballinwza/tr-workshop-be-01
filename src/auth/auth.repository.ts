import { configEnv } from '@/common/configs/configEnv.config';
import {
  UserEntity,
  UserSchemaName,
} from '@/user/adapter/outbound/schema/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserEntity>,
    private jwtService: JwtService,
  ) {
    const { jwtSecret, jwtExpiresIn } = configEnv();
    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = jwtExpiresIn;
  }

  async login(username: string): Promise<string> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    bcrypt.hash(user.username, 10, function (err, hash) {
      if (err) throw new UnauthorizedException('Invalid username');

      bcrypt.compare(username, hash, function (err) {
        if (err) throw new UnauthorizedException('Invalid username');
      });
    });

    const jwt = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtExpiresIn,
      },
    );

    return jwt;
  }
}
