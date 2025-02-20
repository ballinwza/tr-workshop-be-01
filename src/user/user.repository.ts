import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUserRepository } from '@/user/interface/repository/user.repository.interface';
import { Model } from 'mongoose';
import { UserEntityMapper } from './adapter/outbound/mapper/user.mapper';
import {
  UserEntity,
  UserSchemaName,
} from './adapter/outbound/schema/user.schema';
import { IUser } from './interface/domain/user.domain';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchemaName)
    private userModel: Model<UserEntity>,
  ) {}

  async save(data: UserEntity): Promise<IUser> {
    const newUser = new this.userModel(data);
    await newUser.save();

    const result = UserEntityMapper.toDomain(newUser);
    return result;
  }

  async getByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: username }).lean();

    const result = UserEntityMapper.toDomain(user);
    return result;
  }
}
