import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentEntityMapper } from './adapter/outbound/mapper/comment.mapper';
import { CommentEntity } from './adapter/outbound/schema/comment.schema';
import { IComment } from './interface/domain/comment.domain';
import { ICommentRepository } from './interface/repository/comment.repository.interface';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(CommentEntity.name)
    private commentModel: Model<CommentEntity>,
  ) {}

  async saveComment(data: CommentEntity): Promise<IComment> {
    console.log('repo', data);
    const newComment = new this.commentModel(data);
    await newComment.save();

    const result = CommentEntityMapper.mappingToDomain(newComment);
    return result;
  }
}
