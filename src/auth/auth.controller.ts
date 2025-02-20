import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(username);

    response.cookie('jwt', jwt, {
      httpOnly: true, // ป้องกัน XSS
      // secure: process.env.NODE_ENV === 'production', // ใช้ Secure Cookie ใน Production
      secure: true, // ใช้ Secure Cookie ใน Production
      sameSite: 'none', // ป้องกัน CSRF
      maxAge: 24 * 60 * 60 * 1000, // อายุ 1 วัน
    });

    if (jwt !== null) {
      response.status(200).send({
        success: true,
        message: 'Login successful',
      });
      return;
    }

    response.status(500).send({
      success: false,
      message: 'Login unsuccessful',
    });
    return;
  }

  @Post('logout')
  async logout(@Res() response: Response): Promise<Response> {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });

    response.status(200).send({ success: true, message: 'Logout successful' });
    return;
  }
}
