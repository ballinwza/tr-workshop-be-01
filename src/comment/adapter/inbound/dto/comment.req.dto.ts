import { IComment } from '@/Comment/interface/domain/Comment.domain';
import { Builder } from 'builder-pattern';

export class CommentSaveReqDto {
  description: string;
  userId: string;

  public static toDomain({ description, userId }: CommentSaveReqDto): IComment {
    return Builder(IComment).description(description).userId(userId).build();
  }
}
