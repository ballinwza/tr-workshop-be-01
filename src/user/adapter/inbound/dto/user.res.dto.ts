import { IUser } from '@/user/interface/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserSaveResDto {
  fullName: string;
  profileImageUrl: string;
}

export class UserResDto {
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

  public static toDto({ _id, profileImageUrl, fullName }: IUser): UserResDto {
    return {
      id: _id,
      profileImageUrl,
      fullName,
    };
  }
}
