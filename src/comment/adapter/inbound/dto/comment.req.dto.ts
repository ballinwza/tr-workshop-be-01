import { IComment } from '@/Comment/interface/domain/comment.domain';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CommentSaveReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the comment will show on post',
    default: 'Do not mess with me',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be objectID of user as string type',
    default: '67b1dcf048e7fe2b304f9924',
  })
  readonly userId: string;

  public static toDomain({ description, userId }: CommentSaveReqDto): IComment {
    return {
      _id: undefined,
      description,
      userId,
    };
  }
}
