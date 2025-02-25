import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentSaveDto } from './adapter/inbound/dto/commentSave.dto';
import { CommentUpdateDto } from './adapter/inbound/dto/commentUpdate.dto';
import { CommentEntity } from './adapter/outbound/schema/comment.schema';

export class CommentService {
  constructor(
    @InjectModel(CommentEntity.name)
    private commentModel: Model<CommentEntity>,
  ) {}

  async save(data: CommentSaveDto): Promise<CommentEntity> {
    try {
      const newComment = await this.commentModel.insertOne(data);

      return newComment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(data: CommentUpdateDto): Promise<boolean> {
    try {
      const result = await this.commentModel.updateOne(
        { _id: data.id },
        { $set: data },
      );

      if (result.modifiedCount >= 1) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const result = await this.commentModel.deleteOne({ _id: id });

      if (result.deletedCount >= 1) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCommentListByPlacardId(placardId: string): Promise<CommentEntity[]> {
    try {
      const comment = await this.commentModel
        .find({
          placardId,
        })
        .populate('placardId')
        .populate('userId');

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
}
