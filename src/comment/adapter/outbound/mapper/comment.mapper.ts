import { IComment } from '@/comment/interface/domain/comment.domain';
import { Builder } from 'builder-pattern';
import { CommentEntity } from '../schema/comment.schema';

export class CommentEntityMapper {
  public static saveCommentEntity({
    description,
    userId,
  }: IComment): CommentEntity {
    return Builder(CommentEntity)
      .userId(userId)
      .description(description)
      .build();
  }

  public static mappingToDomain({
    _id,
    description,
    userId,
  }: CommentEntity): IComment {
    return Builder(IComment)
      ._id(_id)
      .description(description)
      .userId(userId)
      .build();
  }
}
