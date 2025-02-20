import { ApiKeyGuard } from '@/guards/apiKey/apiKey.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PlacardDeleteReqDto } from './adapter/inbound/dto/deletePlacard.req.dto';
import { PlacardResDto } from './adapter/inbound/dto/placard.res.dto';
import { PlacardSaveReqDto } from './adapter/inbound/dto/savePlacard.req.dto';
import { PlacardRepository } from './placard.repository';
import { PlacardService } from './placard.service';

@ApiTags('Placard')
@Controller('placard')
export class PlacardController {
  private placardService: PlacardService;

  constructor(private readonly placardRepository: PlacardRepository) {
    this.placardService = new PlacardService(this.placardRepository);
  }

  @UseGuards(ApiKeyGuard)
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
  async placardSave(
    @Body() body: PlacardSaveReqDto,
    @Req() request: Response,
  ): Promise<{ id: string }> {
    return await this.placardService.save(
      PlacardSaveReqDto.toDomain(body, request['id'].id),
    );
  }

  @Get('/find-all')
  @ApiResponse({
    status: 200,
    description: 'Found placard list.',
    isArray: true,
    type: PlacardResDto,
  })
  async placards(): Promise<PlacardResDto[]> {
    return PlacardResDto.mappingListToDto(await this.placardService.find());
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
