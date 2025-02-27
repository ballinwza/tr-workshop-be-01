import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../outbound/schema/user.schema';

export class UserSaveDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'String of username',
    example: 'johndoe',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'String of profile image',
    example: 'johndoe.jpg',
  })
  profileImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'String of username',
    example: 'johndoe',
  })
  username: string;

  public static toDomain(dto: UserSaveDto): UserEntity {
    return {
      _id: undefined,
      fullName: dto.fullName,
      profileImageUrl: dto.profileImageUrl,
      username: dto.username,
    };
  }
}
