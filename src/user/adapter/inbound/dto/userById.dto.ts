import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserByIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'String of id',
    example: '67b1dcf048e7fe2b304f9924',
  })
  id: string;
}
