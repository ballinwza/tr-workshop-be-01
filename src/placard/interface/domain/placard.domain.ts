import { CommunityTypeEnum } from '@/common/enums/communityType.enum';
import { IUser } from '@/user/interface/domain/user.domain';
import { ApiProperty } from '@nestjs/swagger';

export class IPlacard {
  @ApiProperty({
    description: 'ID of placard',
    example: 'string',
  })
  readonly _id: string;

  @ApiProperty({
    description: 'ID of userId',
    type: IUser,
  })
  readonly userId: string;

  @ApiProperty({
    description: 'Array ID of commentId',
    example: 'string[]',
  })
  readonly commentId?: string[];

  @ApiProperty({
    description: 'CommunityTypeEnum of community',
    example: 'history | food | pets | health | fashion | exercise | others',
  })
  readonly community: CommunityTypeEnum;

  @ApiProperty({
    description: 'String of title',
    example: 'string',
  })
  readonly title: string;

  @ApiProperty({
    description: 'String of description',
    example: 'string',
  })
  readonly description: string;
}
