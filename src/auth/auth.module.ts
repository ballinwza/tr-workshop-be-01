import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { ConfigModule } from '@nestjs/config';

import {
  UserEntitySchema,
  UserSchemaName,
} from '@/user/adapter/outbound/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaName, schema: UserEntitySchema },
    ]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
