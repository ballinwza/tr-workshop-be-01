import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntityMapper } from './adapter/outbound/mapper/user.mapper';
import {
  UserEntity,
  UserSchemaName,
} from './adapter/outbound/schema/user.schema';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName)
    private userModel: Model<UserEntity>,
  ) {}

  async save(data: IUser): Promise<boolean | undefined> {
    const afterMapping = UserEntityMapper.saveToEntity(data);

    const newUser = new this.userModel(afterMapping);
    const result = await newUser.save();

    if (result.id) {
      return true;
    }

    return false;
  }

  async getByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username });

    if (user !== null) {
      return UserEntityMapper.toDomain(user);
    }

    return;
  }
  async getById(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id });

    if (user !== null) {
      return UserEntityMapper.toDomain(user);
    }

    return;
  }
}
