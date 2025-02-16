import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { IPlacard } from '@/placard/interface/domain/placard.domain';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PlacardResDto {
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
    default: '67b1dcf048e7fe2b304f9924',
  })
  readonly userId: string;

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

  public static toDto({
    _id,
    description,
    userId,
    commentId,
    community,
    title,
  }: IPlacard): PlacardResDto {
    return {
      id: _id,
      description,
      userId,
      commentId,
      community,
      title,
    };
  }

  public static mappingListToDto(entities: IPlacard[]): PlacardResDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
