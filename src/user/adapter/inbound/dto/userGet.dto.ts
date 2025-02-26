import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntity } from '../../outbound/schema/user.schema';

export class UserGetDto {
  @ApiProperty({
    description: 'Must be objectID',
    example: '67b1dcf048e7fe2b304f9924',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Must be string',
    example: 'someImage.jpg',
  })
  profileImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Must be string',
    example: 'John Doe',
  })
  fullName: string;

  public static toDto(entity: UserEntity): UserGetDto {
    return {
      id: entity._id,
      profileImageUrl: entity.profileImageUrl,
      fullName: entity.fullName,
    };
  }
}
