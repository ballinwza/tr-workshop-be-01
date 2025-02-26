import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PlacardDeleteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be objectID',
    example: '67b1dcf048e7fe2b304f9924',
  })
  readonly id: string;
}
