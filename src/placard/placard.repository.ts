import {
  UserEntity,
  UserSchemaName,
} from '@/user/adapter/outbound/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlacardEntityMapper } from './adapter/outbound/mapper/placard.mapper';
import {
  PlacardEntity,
  PlacardSchemaName,
} from './adapter/outbound/schema/placard.schema';
import { IPlacard } from './interface/domain/placard.domain';
import { IPlacardRepository } from './interface/repository/placard.repository.interface';

@Injectable()
export class PlacardRepository implements IPlacardRepository {
  constructor(
    @InjectModel(PlacardSchemaName)
    private placardModel: Model<PlacardEntity>,

    @InjectModel(UserSchemaName)
    private userModel: Model<UserEntity>,
  ) {}

  async save(data: PlacardEntity): Promise<{ id: string }> {
    const newPlacard = new this.placardModel(data);
    const result = await newPlacard.updateOne(data, {
      upsert: true,
    });

    if (result) {
      return {
        id: result.upsertedId ?? data._id,
      };
    }
  }

  async getList(): Promise<IPlacard[]> {
    const result = await this.placardModel
      .find()
      .populate({
        path: 'userId',
      })
      .lean();
    return PlacardEntityMapper.mappingListToDomain(result);
  }

  async getListByUserId(userId: string): Promise<IPlacard[]> {
    // const result = await this.placardModel.find({ userId:  });
    console.log(userId);

    return;
    // return PlacardEntityMapper.mappingListToDomain(result);
  }
  async getById(placardId: string): Promise<IPlacard> {
    const result = await this.placardModel.findById(placardId).populate({
      path: 'userId',
    });

    return PlacardEntityMapper.toDomain(result);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.placardModel.deleteOne({ _id: id });
    return result.acknowledged;
  }
}
