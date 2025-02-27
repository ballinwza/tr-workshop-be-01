import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { SuccessResponseDto } from '@/common/utils/successResponse';
import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';
import { IJwtPayload } from '@/guard/jwt/jwt.payload.interface';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserGetDto } from './adapter/inbound/dto/userGet.dto';
import { UserSaveDto } from './adapter/inbound/dto/userSave.dto';
import { UserGetDtoExample } from './adapter/inbound/exmaple/userGet.example';
import { UserService } from './user.service';

@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Create user.',
    example: new SuccessResponseDto(true, 'User was created'),
  })
  @Post('/save')
  async userSave(
    @Body() body: UserSaveDto,
  ): Promise<SuccessResponseDto<boolean, string>> {
    const result = await this.userService.save(body);

    return new SuccessResponseDto(result, 'User was created');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Found user.',
    example: new SuccessResponseDto(UserGetDtoExample, 'Found user'),
  })
  @Get('/find')
  async user(@Request() req): Promise<SuccessResponseDto<UserGetDto, string>> {
    // async user(
    //   @Body() body: UserByIdDto,
    // ): Promise<SuccessResponseDto<UserGetDto, string>> {
    const payload: IJwtPayload = req.user;
    const result = await this.userService.getById(payload.id);
    // const result = await this.userService.getById(body.id);
    const mapToDto = UserGetDto.toDto(result);

    return new SuccessResponseDto(mapToDto, 'Found user');
  }
}
