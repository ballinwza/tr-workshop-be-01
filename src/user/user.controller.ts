import { Controller, Get } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  // private createUserUsecase: GetHelloUsecase;
  private getHelloUsecase: UserService;

  constructor(private readonly userRepository: UserRepository) {
    // this.createUserUsecase = new GetHelloUsecase(userRepository);
    this.getHelloUsecase = new UserService(this.userRepository);
  }

  // @Post()
  // async createUser(@Body() body: { name: string; email: string }) {
  //   return this.createUserUsecase.execute(body.name, body.email);
  // }

  // @Get()
  // async getAllUsers() {
  //   return this.userRepository.findAll();
  // }

  @Get()
  async getHello(): Promise<string> {
    return await this.getHelloUsecase.execute();
  }
}
