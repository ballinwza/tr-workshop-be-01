import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUserRepository } from '@/user/interface/repository/user.repository.interface';
import { Model } from 'mongoose';
import { UserEntityMapper } from './adapter/outbound/mapper/user.mapper';
import { UserEntity } from './adapter/outbound/schema/user.schema';
import { IUser } from './interface/domain/user.domain';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserEntity>,
  ) {}

  async saveUser(data: UserEntity): Promise<IUser> {
    const newUser = new this.userModel(data);
    await newUser.save();

    const result = UserEntityMapper.mappingToDomain(newUser);
    return result;
  }
}
