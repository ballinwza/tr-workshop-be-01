import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CommentGetDto } from './adapter/inbound/dto/commentGet.dto';
import { CommentSaveDto } from './adapter/inbound/dto/commentSave.dto';
import { CommentUpdateDto } from './adapter/inbound/dto/commentUpdate.dto';
import { CommentService } from './comment.service';

@UseGuards(ApiKeyGuard)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/save')
  @ApiResponse({
    status: 200,
    description: 'Create comment.',
    type: CommentSaveDto,
  })
  async createComment(@Body() body: CommentSaveDto): Promise<CommentSaveDto> {
    const result = await this.commentService.save(body);
    return CommentSaveDto.toDto(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete comment.',
    example: {
      success: true,
      status: 200,
      message: 'Comment was deleted',
    },
  })
  async deleteComment(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.commentService.deleteById(id);

    if (result) {
      response.status(200).send({
        success: result,
        status: 200,
        message: 'Comment was deleted',
      });
    } else {
      throw new Error('Error: Failed to delete not found comment Id');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'Update comment.',
    example: {
      success: true,
      status: 200,
      message: 'Comment was updated',
    },
  })
  async updateComment(
    @Body() body: CommentUpdateDto,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.commentService.update(body);

    if (result) {
      response.status(200).send({
        success: result,
        status: 200,
        message: 'Comment was updated',
      });
    } else {
      throw new Error('Error: Failed to update not found comment Id');
    }
  }

  @Get('/find/list/:placardId')
  @ApiResponse({
    status: 200,
    description: 'Found comment.',
    type: [CommentGetDto],
  })
  async commentListByPlacardId(
    @Param('placardId') placardId: string,
  ): Promise<CommentGetDto[]> {
    const result =
      await this.commentService.getCommentListByPlacardId(placardId);
    return CommentGetDto.toDtoList(result);
  }
}
