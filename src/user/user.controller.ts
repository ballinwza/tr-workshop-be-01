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
import { UserSaveReqDto } from './adapter/inbound/dto/user.req.dto';
import { UserResDto } from './adapter/inbound/dto/user.res.dto';
import { UserService } from './user.service';

@UseGuards(ApiKeyGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/save')
  async userSave(@Body() body: UserSaveReqDto): Promise<boolean | undefined> {
    return await this.userService.save(UserSaveReqDto.toDomain(body));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find')
  async user(@Request() req): Promise<UserResDto | undefined> {
    const payload: IJwtPayload = req.user;

    const result = UserResDto.toDto(await this.userService.getById(payload.id));

    if (result) {
      return result;
    }

    return undefined;
  }
}
