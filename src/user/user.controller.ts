import { Body, Controller, Post } from '@nestjs/common';

import { UserReqDto, UserSaveReqDto } from './adapter/inbound/dto/user.req.dto';
import { UserResDto } from './adapter/inbound/dto/user.res.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

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

  @Post('/find')
  async user(@Body() { username }: UserReqDto): Promise<UserResDto> {
    const result = UserResDto.toDto(
      await this.userService.getByUsername(username),
    );
    return result;
  }
}
