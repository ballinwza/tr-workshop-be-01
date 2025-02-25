import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommentEntity } from '../../outbound/schema/comment.schema';

export class CommentSaveDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'ObjectID of Id',
    example: '67b426f3145d73f622917c28',
  })
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the comment will show on post',
    example: 'Do not mess with me',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be objectID of userId as string type',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be objectID of placardId as string type',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly placardId: string;

  public static toEntity(dto: CommentSaveDto): CommentEntity {
    return {
      _id: dto.id ?? undefined,
      description: dto.description,
      userId: {
        _id: dto.userId,
        profileImageUrl: undefined,
        fullName: undefined,
        username: undefined,
      },
      placardId: {
        _id: dto.placardId,
        userId: undefined,
        community: undefined,
        title: undefined,
        description: undefined,
      },
    };
  }

  public static toDto(entity: CommentEntity): CommentSaveDto {
    return {
      id: entity._id,
      description: entity.description,
      userId: undefined,
      placardId: undefined,
    };
  }
}
