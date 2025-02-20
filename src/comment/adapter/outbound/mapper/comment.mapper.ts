import { IComment } from '@/comment/interface/domain/comment.domain';
import { CommentEntity } from '../schema/comment.schema';

export class CommentEntityMapper {
  public static saveCommentEntity({
    description,
    userId,
  }: IComment): CommentEntity {
    return {
      _id: undefined,
      description,
      userId,
    };
  }

  public static mappingToDomain({
    _id,
    description,
    userId,
  }: CommentEntity): IComment {
    return {
      _id,
      description,
      userId,
    };
  }
}
