import { CommentSchemaName } from '@/comment/adapter/outbound/schema/comment.schema';
import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { UserSchemaName } from '@/user/adapter/outbound/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const PlacardSchemaName = 'placards';

@Schema({ timestamps: true, collection: PlacardSchemaName })
export class PlacardEntity {
  _id: string;

  @Prop({ type: Types.ObjectId, required: true, ref: UserSchemaName })
  userId: string;

  @Prop({
    type: [Types.ObjectId],
    required: false,
    ref: CommentSchemaName,
  })
  commentId?: string[];

  @Prop({ required: true, enum: CommunityTypeEnum })
  community: CommunityTypeEnum;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PlacardEntitySchema = SchemaFactory.createForClass(PlacardEntity);
