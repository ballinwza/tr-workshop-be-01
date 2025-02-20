import { IUser } from '@/user/interface/domain/user.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSaveReqDto {
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
    description: 'String of image',
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

  public static toDomain({
    fullName,
    profileImageUrl,
    username,
  }: UserSaveReqDto): IUser {
    return {
      _id: undefined,
      fullName,
      profileImageUrl,
      username,
    };
  }
}

export class UserReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'String of username',
    example: 'johndoe',
  })
  username: string;

  public static toDomain({ username }: UserReqDto): IUser {
    return {
      _id: undefined,
      fullName: undefined,
      profileImageUrl: undefined,
      username,
    };
  }
}
