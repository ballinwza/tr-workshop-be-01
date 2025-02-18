import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const UserSchemaName = 'users';

@Schema({ timestamps: true, collection: UserSchemaName })
export class UserEntity {
  _id: string;

  @Prop({ required: true })
  profileImageUrl: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  username: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
