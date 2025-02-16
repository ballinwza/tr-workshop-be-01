import { CommentEntityMapper } from './adapter/outbound/mapper/comment.mapper';
import { IComment } from './interface/domain/comment.domain';
import { ICommentRepository } from './interface/repository/comment.repository.interface';

export class CommentService {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async save(data: IComment): Promise<IComment> {
    console.log('service', data);
    const afterMapping = CommentEntityMapper.saveCommentEntity(data);
    return await this.commentRepository.saveComment(afterMapping);
  }
}
