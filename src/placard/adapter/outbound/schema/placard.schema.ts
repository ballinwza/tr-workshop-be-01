import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import {
  UserEntity,
  UserSchemaName,
} from '@/user/adapter/outbound/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

export const PlacardSchemaName = 'placards';

@Schema({ timestamps: true, collection: PlacardSchemaName })
export class PlacardEntity {
  _id: string;

  @Prop({
    type: Types.ObjectId,
    required: false,
    ref: UserSchemaName,
  })
  userId: UserEntity;

  @Prop({ required: false, enum: CommunityTypeEnum })
  community: CommunityTypeEnum;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PlacardEntitySchema = SchemaFactory.createForClass(PlacardEntity);
