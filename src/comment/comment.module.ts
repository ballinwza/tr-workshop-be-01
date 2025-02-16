import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommentEntity,
  CommentEntitySchema,
} from './adapter/outbound/schema/comment.schema';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentEntity.name, schema: CommentEntitySchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
