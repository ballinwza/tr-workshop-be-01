import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlacardSaveDto } from './adapter/inbound/dto/placardSave.dto';
import {
  PlacardEntity,
  PlacardSchemaName,
} from './adapter/outbound/schema/placard.schema';

export class PlacardService {
  constructor(
    @InjectModel(PlacardSchemaName)
    private placardModel: Model<PlacardEntity>,
  ) {}

  async save(data: PlacardSaveDto): Promise<PlacardEntity> {
    try {
      const newPlacard = (await this.placardModel.insertOne(data)).populate(
        'userId',
      );

      return newPlacard;
    } catch (error) {
      throw new Error(`PlacardService.save Error: ${error}`);
    }
  }

  async update(data: PlacardSaveDto): Promise<boolean> {
    try {
      const result = await this.placardModel.updateOne(
        { _id: data.id },
        { $set: data },
      );

      if (result.modifiedCount >= 1) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(`PlacardService.save Error: ${error}`);
    }
  }

  async getList(): Promise<PlacardEntity[]> {
    try {
      const result = await this.placardModel
        .find()
        .populate({
          path: 'userId',
        })
        .lean();

      return result;
    } catch (error) {
      throw new Error(`PlacardService.getList Error: ${error}`);
    }
  }

  async getById(placardId: string): Promise<PlacardEntity> {
    try {
      const result = await this.placardModel
        .findById(placardId)
        .populate({
          path: 'userId',
        })
        .lean();

      return result;
    } catch (error) {
      throw new Error(`PlacardService.getById Error: ${error}`);
    }
  }

  async getListByUserId(userId: string): Promise<PlacardEntity[]> {
    try {
      const result = await this.placardModel
        .find({
          userId,
        })
        .populate({ path: 'userId' });

      return result;
    } catch (error) {
      throw new Error(`PlacardService.getListByUserId Error: ${error}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.placardModel.deleteOne({ _id: id });

      if (result.deletedCount >= 1) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(`PlacardService.delete Error: ${error}`);
    }
  }
}
