import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from '@/guards/apiKey/apiKey.guard';
import { Request } from 'express';
import { UserSaveReqDto } from './adapter/inbound/dto/user.req.dto';
import { UserResDto } from './adapter/inbound/dto/user.res.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
@UseGuards(ApiKeyGuard)
@Controller('user')
export class UserController {
  private userService: UserService;

  constructor(private readonly userRepository: UserRepository) {
    this.userService = new UserService(this.userRepository);
  }

  @Post('/save')
  async userSave(@Body() body: UserSaveReqDto): Promise<UserResDto> {
    const result = UserResDto.toDto(
      await this.userService.save(UserSaveReqDto.toDomain(body)),
    );
    return result;
  }

  @Get('/find')
  async user(@Req() request: Request): Promise<UserResDto | null> {
    if (request['id'].id !== undefined) {
      const result = UserResDto.toDto(
        await this.userService.getByUsername(request['id'].id),
      );
      return result;
    }

    return null;
  }
}
