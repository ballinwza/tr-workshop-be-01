import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/models/user';
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [];

  // async save(user: User): Promise<User> {
  //   this.users.push(user);
  //   return user;
  // }

  // async findAll(): Promise<User[]> {
  //   return this.users;
  // }

  async getHello(): Promise<string> {
    return 'hello';
  }
}
