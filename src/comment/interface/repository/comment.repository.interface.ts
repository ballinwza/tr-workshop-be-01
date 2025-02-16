import { IComment } from '../domain/comment.domain';

export interface ICommentRepository {
  saveComment(data: IComment): Promise<IComment>;
}
