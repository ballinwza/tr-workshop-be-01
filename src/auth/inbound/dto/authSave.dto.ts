import { ApiProperty } from '@nestjs/swagger';

export class AuthSaveDto {
  _id: string;

  @ApiProperty({
    description: 'Profile image url',
    example: 'string',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: 'String of full name',
    example: 'string',
  })
  fullName: string;

  @ApiProperty({
    description: 'String of username',
    example: 'string',
  })
  username: string;
}
