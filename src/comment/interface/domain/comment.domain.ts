import { ApiProperty } from '@nestjs/swagger';

export class IComment {
  @ApiProperty({
    description: 'ObjectID of comment',
    example: 'string',
  })
  _id: string;

  @ApiProperty({
    description: 'Must be objectID of user as string type',
    example: 'string',
  })
  userId: string;

  @ApiProperty({
    description: 'This is the comment will show on post',
    example: 'string',
  })
  description: string;
}
