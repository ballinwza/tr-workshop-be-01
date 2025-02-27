import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserSaveDto } from './adapter/inbound/dto/userSave.dto';
import {
  UserEntity,
  UserSchemaName,
} from './adapter/outbound/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName)
    private userModel: Model<UserEntity>,
  ) {}

  async save(data: UserSaveDto): Promise<boolean> {
    try {
      const newUser = new this.userModel(data);
      const result = await newUser.save();

      if (result.id) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(`UserService.save Error: ${error}`);
    }
  }

  async getByUsername(username: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOne({ username });

      return user;
    } catch (error) {
      throw new Error(`UserService.getByUsername Error: ${error}`);
    }
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOne({ _id: id });

      return user;
    } catch (error) {
      throw new Error(`UserService.getById Error: ${error}`);
    }
  }
}
