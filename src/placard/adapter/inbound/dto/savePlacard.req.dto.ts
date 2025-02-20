import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { IPlacard } from '@/placard/interface/domain/placard.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PlacardSaveReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Must be objectID but optional',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly id?: string;

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

  public static toDomain(dto: PlacardSaveReqDto, userId: string): IPlacard {
    return {
      _id: dto.id === '' ? undefined : dto.id,
      description: dto.description,
      userId: userId,
      commentId: undefined,
      community: dto.community,
      title: dto.title,
    };
  }
}
