import { Body, Controller, Post } from '@nestjs/common';
import { CommentSaveReqDto } from './adapter/inbound/dto/comment.req.dto';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  private commentService: CommentService;

  constructor(private readonly commentRepository: CommentRepository) {
    this.commentService = new CommentService(this.commentRepository);
  }

  @Post('/create')
  async createComment(@Body() body: CommentSaveReqDto) {
    return await this.commentService.save(CommentSaveReqDto.toDomain(body));
  }
}
