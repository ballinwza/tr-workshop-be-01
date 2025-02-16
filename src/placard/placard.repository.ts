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
    private commentModel: Model<PlacardEntity>,
  ) {}

  async savePlacard(data: PlacardEntity): Promise<IPlacard> {
    const newComment = new this.commentModel(data);
    await newComment.save();

    const result = PlacardEntityMapper.mappingToDomain(newComment);
    return result;
  }
}
