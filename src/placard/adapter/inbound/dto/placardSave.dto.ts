import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlacardEntity } from '../../outbound/schema/placard.schema';

export class PlacardSaveDto {
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
  })
  readonly community: CommunityTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string',
    example: 'Title of card.',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string.',
    example: 'Type some thing for card description.',
  })
  readonly description: string;

  public static toEntity(dto: PlacardSaveDto): PlacardEntity {
    return {
      _id: dto.id ?? undefined,
      description: dto.description,
      userId: {
        _id: dto.userId,
        profileImageUrl: undefined,
        fullName: undefined,
        username: undefined,
      },
      community: dto.community,
      title: dto.title,
    };
  }

  public static toDto(entity: PlacardEntity): PlacardSaveDto {
    return {
      id: entity._id,
      description: entity.description,
      userId: entity.userId._id,
      community: entity.community,
      title: entity.title,
    };
  }
}
