import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlacardEntity,
  PlacardEntitySchema,
} from './adapter/outbound/schema/placard.schema';
import { PlacardController } from './placard.controller';
import { PlacardRepository } from './placard.repository';
import { PlacardService } from './placard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlacardEntity.name, schema: PlacardEntitySchema },
    ]),
  ],
  controllers: [PlacardController],
  providers: [PlacardRepository, PlacardService],
  exports: [PlacardService],
})
export class PlacardModule {}
