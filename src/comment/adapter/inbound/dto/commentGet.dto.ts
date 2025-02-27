import { PlacardGetDto } from '@/placard/adapter/inbound/dto/placardGet.dto';
import { UserGetDto } from '@/user/adapter/inbound/dto/userGet.dto';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { CommentEntity } from '../../outbound/schema/comment.schema';

export class CommentGetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ObjectID of Id',
    example: '67b426f3145d73f622917c28',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The comment is show on post',
    example: 'Do not mess with me',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User detail',
    type: UserGetDto,
  })
  readonly user: UserGetDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Placard detail',
    type: PlacardGetDto,
  })
  readonly placard: PlacardGetDto;

  public static toDtoList(entities: CommentEntity[]): CommentGetDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  public static toDto(entity: CommentEntity): CommentGetDto {
    return {
      id: entity._id,
      description: entity.description,
      placard: PlacardGetDto.toDto(entity.placardId),
      user: UserGetDto.toDto(entity.userId),
    };
  }
}
