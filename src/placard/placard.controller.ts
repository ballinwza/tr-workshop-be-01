import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacardDeleteReqDto } from './adapter/inbound/dto/deletePlacard.req.dto';
import { PlacardResDto } from './adapter/inbound/dto/placard.res.dto';
import { PlacardSaveReqDto } from './adapter/inbound/dto/savePlacard.req.dto';

import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';
import { PlacardService } from './placard.service';

@UseGuards(ApiKeyGuard)
@ApiTags('Placard')
@Controller('placard')
export class PlacardController {
  constructor(private readonly placardService: PlacardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/save')
  @ApiResponse({
    status: 200,
    description: 'Saved placard.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  })
  async placardSave(@Body() body: PlacardSaveReqDto): Promise<{ id: string }> {
    return await this.placardService.save(PlacardSaveReqDto.toDomain(body));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find/list/:id')
  @ApiResponse({
    status: 200,
    description: 'Found placard list.',
    isArray: true,
    type: PlacardResDto,
  })
  async placardsByUserId(@Param('id') id: string): Promise<PlacardResDto[]> {
    const result = await this.placardService.findListByUserId(id);
    console.log(result);
    return PlacardResDto.mappingListToDto(result);
  }

  @Get('/find/list')
  @ApiResponse({
    status: 200,
    description: 'Found placard list.',
    isArray: true,
    type: PlacardResDto,
  })
  async placards(): Promise<PlacardResDto[]> {
    return PlacardResDto.mappingListToDto(await this.placardService.findList());
  }

  @Get('/find/:id')
  @ApiResponse({
    status: 200,
    description: 'Found placard by id.',
    isArray: true,
    type: PlacardResDto,
  })
  async placardByid(@Param('id') id: string): Promise<PlacardResDto> {
    return PlacardResDto.toDto(await this.placardService.findById(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @ApiResponse({
    status: 200,
    description: 'Deleted placard.',
    type: Boolean,
  })
  async placardDeleteById(@Body() body: PlacardDeleteReqDto): Promise<boolean> {
    return await this.placardService.delete(body.id);
  }
}
