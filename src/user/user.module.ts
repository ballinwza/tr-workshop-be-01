import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserEntitySchema,
  UserSchemaName,
} from './adapter/outbound/schema/user.schema';
import { UserController } from './user.controller';

import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaName, schema: UserEntitySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
