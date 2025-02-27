import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiKeyGuard } from '../guard/apiKey/apiKey.guard';
import { LocalAuthGuard } from '../guard/auth/localAuth.guard';
import { AuthService } from './auth.service';

@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Login',
    example: {
      success: true,
      statis: 200,
      message: 'Login successful',
    },
  })
  @Post('/login')
  async login(@Request() req, @Res() res: Response) {
    const accesToken = await this.authService.generateJwtToken(req.user, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '60m',
    });

    res.cookie('access_token', accesToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000, // 60min
    });

    res.status(200).send({
      success: true,
      statis: 200,
      message: 'Login successful',
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Logout from system.',
    example: {
      success: true,
      statis: 200,
      message: 'Logout successful',
    },
  })
  @Post('/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('access_token', {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });

    response
      .status(200)
      .send({ success: true, status: 200, message: 'Logout successful' });
  }
}
