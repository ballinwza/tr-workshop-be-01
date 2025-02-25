import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'ObjectID of Id',
    example: '67b426f3145d73f622917c28',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the comment will show on post',
    example: 'Do not mess with me',
  })
  readonly description: string;
}
