import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { IPlacard } from '@/placard/interface/domain/placard.domain';
import { UserSaveReqDto } from '@/user/adapter/inbound/dto/user.req.dto';
import { IUser } from '@/user/interface/domain/user.domain';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PlacardSaveReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Must be objectID but optional',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be objectID',
    type: IUser,
  })
  readonly userId: IUser;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @IsOptional()
  @ApiProperty({
    description: 'Must be objectID but optional',
    default: ['67b1dcf048e7fe2b304f9924'],
  })
  readonly commentId?: string[];

  @IsEnum(CommunityTypeEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be enum of CommunityTypeEnum',
    example: 'history | food | pets | health | fashion | exercise | others',
    default: 'pets',
  })
  readonly community: CommunityTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string',
    default: 'Title of post card.',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string.',
    default: 'Type some thing for post card description.',
  })
  readonly description: string;

  public static toDomain({
    id,
    description,
    userId,
    commentId,
    community,
    title,
  }: PlacardSaveReqDto): IPlacard {
    return {
      _id: id,
      description,
      userId: UserSaveReqDto.toDomain(userId),
      commentId,
      community,
      title,
    };
  }
}
