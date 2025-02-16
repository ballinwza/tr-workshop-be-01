import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlacardEntityMapper } from './adapter/outbound/mapper/placard.mapper';
import { PlacardEntity } from './adapter/outbound/schema/placard.schema';
import { IPlacard } from './interface/domain/placard.domain';
import { IPlacardRepository } from './interface/repository/placard.repository.interface';

@Injectable()
export class PlacardRepository implements IPlacardRepository {
  constructor(
    @InjectModel(PlacardEntity.name)
    private placardModel: Model<PlacardEntity>,
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
    const result = await this.placardModel.find();
    return PlacardEntityMapper.mappingListToDomain(result);
  }

  async getListByUserId(userId: string): Promise<IPlacard[]> {
    const result = await this.placardModel.find({ userId });
    return PlacardEntityMapper.mappingListToDomain(result);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.placardModel.deleteOne({ _id: id });
    return result.acknowledged;
  }
}
