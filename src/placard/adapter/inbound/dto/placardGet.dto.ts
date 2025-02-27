import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { UserGetDto } from '@/user/adapter/inbound/dto/userGet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlacardEntity } from '../../outbound/schema/placard.schema';

export class PlacardGetDto {
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
    description: 'User detail',
    type: UserGetDto,
  })
  readonly user: UserGetDto;

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
    example: 'Title of post card.',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be string.',
    example: 'Type some thing for post card description.',
  })
  readonly description: string;

  public static toDto(entity: PlacardEntity): PlacardGetDto {
    return {
      id: entity._id,
      description: entity.description,
      user: UserGetDto.toDto(entity.userId),
      community: entity.community,
      title: entity.title,
    };
  }

  public static listToDto(entities: PlacardEntity[]): PlacardGetDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
