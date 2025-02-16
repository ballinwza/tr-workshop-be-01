import { Body, Controller, Post } from '@nestjs/common';

import { UserSaveReqDto } from './adapter/inbound/dto/user.req.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // private createUserUsecase: GetHelloUsecase;
  private userService: UserService;

  constructor(private readonly userRepository: UserRepository) {
    // this.createUserUsecase = new userService(userRepository);
    this.userService = new UserService(this.userRepository);
  }

  @Post('/create')
  async createUser(@Body() body: UserSaveReqDto) {
    return await this.userService.save(UserSaveReqDto.toDomain(body));
  }
}
