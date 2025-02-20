import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentSaveReqDto } from './adapter/inbound/dto/comment.req.dto';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { IComment } from './interface/domain/comment.domain';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  private commentService: CommentService;

  constructor(private readonly commentRepository: CommentRepository) {
    this.commentService = new CommentService(this.commentRepository);
  }

  @Post('/create')
  @ApiResponse({ status: 200, description: 'Found comment.', type: IComment })
  async createComment(@Body() body: CommentSaveReqDto): Promise<IComment> {
    return await this.commentService.save(CommentSaveReqDto.toDomain(body));
  }
}
