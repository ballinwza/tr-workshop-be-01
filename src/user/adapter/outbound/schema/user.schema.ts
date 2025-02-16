import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const UserSchemaName = 'users';

@Schema({ timestamps: true, collection: UserSchemaName })
export class UserEntity {
  _id: string;

  // @Prop({ type: Types.ObjectId, required: true, ref: userSchemaName })
  // userId: string;

  @Prop({ required: true })
  profileImageUrl: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;
}

export const UserDetailEntitySchema = SchemaFactory.createForClass(UserEntity);
