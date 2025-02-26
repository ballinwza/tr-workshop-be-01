import { SuccessResponseDto } from '@/common/utils/successResponse';
import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CommentDeleteDto } from './adapter/inbound/dto/commentDelete.dto';
import { CommentGetDto } from './adapter/inbound/dto/commentGet.dto';
import { CommentSaveDto } from './adapter/inbound/dto/commentSave.dto';
import { CommentUpdateDto } from './adapter/inbound/dto/commentUpdate.dto';
import { CommentGetExample } from './adapter/inbound/example/commentGet.example';
import { CommentSaveExample } from './adapter/inbound/example/commentSave.example';
import { CommentService } from './comment.service';

@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/save')
  @ApiResponse({
    status: 200,
    description: 'Create comment.',
    example: new SuccessResponseDto(CommentSaveExample, 'Comment was created'),
  })
  async createComment(
    @Body() body: CommentSaveDto,
  ): Promise<SuccessResponseDto<CommentSaveDto, string>> {
    const result = await this.commentService.save(body);
    const mapToDto = CommentSaveDto.toDto(result);
    return new SuccessResponseDto(mapToDto, 'Comment was created');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @ApiResponse({
    status: 200,
    description: 'Delete comment.',
    example: new SuccessResponseDto(true, 'Comment was deleted'),
  })
  async deleteComment(
    @Body() body: CommentDeleteDto,
  ): Promise<SuccessResponseDto<boolean, string>> {
    const result = await this.commentService.deleteById(body.id);

    if (result) {
      return new SuccessResponseDto(true, 'Comment was updated');
    } else {
      throw new Error('Error: Failed to delete not found comment Id');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'Update comment.',
    example: new SuccessResponseDto(true, 'Comment was updated'),
  })
  async updateComment(
    @Body() body: CommentUpdateDto,
  ): Promise<SuccessResponseDto<boolean, string>> {
    const result = await this.commentService.update(body);

    if (result) {
      return new SuccessResponseDto(true, 'Comment was updated');
    } else {
      throw new Error('Error: Failed to update not found comment Id');
    }
  }

  @Get('/find/list/:placardId')
  @ApiResponse({
    status: 200,
    description: 'Found comment.',
    example: new SuccessResponseDto(CommentGetExample, 'Found comment'),
  })
  async commentListByPlacardId(
    @Param('placardId') placardId: string,
  ): Promise<SuccessResponseDto<CommentGetDto[], string>> {
    const result =
      await this.commentService.getCommentListByPlacardId(placardId);
    const mapToDto = CommentGetDto.toDtoList(result);
    return new SuccessResponseDto(mapToDto, 'Found comment by placard Id');
  }
}
