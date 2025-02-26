import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';
import { IJwtPayload } from '@/guard/jwt/jwt.payload.interface';
import { UserGetDto } from './adapter/inbound/dto/userGet.dto';
import { UserSaveDto } from './adapter/inbound/dto/userSave.dto';
import { UserService } from './user.service';

@UseGuards(ApiKeyGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/save')
  async userSave(@Body() body: UserSaveDto): Promise<boolean> {
    return await this.userService.save(UserSaveDto.toDomain(body));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find')
  async user(@Request() req): Promise<UserGetDto> {
    const payload: IJwtPayload = req.user;

    const result = UserGetDto.toDto(await this.userService.getById(payload.id));

    if (result) {
      return result;
    }

    return;
  }
}
