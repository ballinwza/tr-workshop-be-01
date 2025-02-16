import { UserSchemaName } from '@/user/adapter/outbound/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const CommentSchemaName = 'comments';

@Schema({ timestamps: true, collection: CommentSchemaName })
export class CommentEntity {
  _id: string;

  @Prop({ type: Types.ObjectId, required: true, ref: UserSchemaName })
  userId: string;

  @Prop({ required: true })
  description: string;
}

export const CommentEntitySchema = SchemaFactory.createForClass(CommentEntity);
