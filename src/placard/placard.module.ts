import {
  UserEntitySchema,
  UserSchemaName,
} from '@/user/adapter/outbound/schema/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlacardEntitySchema,
  PlacardSchemaName,
} from './adapter/outbound/schema/placard.schema';
import { PlacardController } from './placard.controller';
import { PlacardService } from './placard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlacardSchemaName, schema: PlacardEntitySchema },
      { name: UserSchemaName, schema: UserEntitySchema },
    ]),
  ],
  controllers: [PlacardController],
  providers: [PlacardService],
  exports: [PlacardService],
})
export class PlacardModule {}
