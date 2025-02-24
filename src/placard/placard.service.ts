import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PlacardEntity,
  PlacardSchemaName,
} from './adapter/outbound/schema/placard.schema';
import { IPlacard } from './interface/domain/placard.domain';

export class PlacardService {
  constructor(
    @InjectModel(PlacardSchemaName)
    private placardModel: Model<PlacardEntity>,
  ) {}

  async save(data: IPlacard): Promise<{ id: string }> {
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

  async findList(): Promise<IPlacard[]> {
    const result = await this.placardModel
      .find()
      .populate({
        path: 'userId',
      })
      .lean();

    return result;
  }

  async findById(placardId: string): Promise<PlacardEntity> {
    const result = await this.placardModel.findById(placardId).populate({
      path: 'userId',
    });

    return result;
  }

  async findListByUserId(userId: string): Promise<PlacardEntity[]> {
    const result = await this.placardModel
      .find({
        userId,
      })
      .populate({ path: 'userId' });

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.placardModel.deleteOne({ _id: id });
    return result.acknowledged;
  }
}
