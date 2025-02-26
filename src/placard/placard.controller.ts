import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PlacardDeleteDto } from './adapter/inbound/dto/placardDelete.dto';
import { PlacardGetDto } from './adapter/inbound/dto/placardGet.dto';
import { PlacardSaveDto } from './adapter/inbound/dto/placardSave.dto';

import { ApiKeyGuard } from '@/guard/apiKey/apiKey.guard';
import { JwtAuthGuard } from '@/guard/jwt/jwt.guard';

import { SuccessResponseDto } from '@/common/utils/successResponse';
import { PlacardGetExample } from './adapter/inbound/example/placardGet.example';
import { PlacardSaveExample } from './adapter/inbound/example/placardSave.example';
import { PlacardService } from './placard.service';

@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@ApiTags('Placard')
@Controller('placard')
export class PlacardController {
  constructor(private readonly placardService: PlacardService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/save')
  @ApiResponse({
    status: 200,
    description: 'Saved placard.',
    type: PlacardSaveDto,
    example: new SuccessResponseDto(PlacardSaveExample, 'Placard was saved'),
  })
  async placardSave(
    @Body() body: PlacardSaveDto,
  ): Promise<SuccessResponseDto<PlacardSaveDto, string>> {
    const result = await this.placardService.save(body);
    const mappingToDto = PlacardSaveDto.toDto(result);
    return new SuccessResponseDto(mappingToDto, 'Placard was saved');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'Update placard.',
    example: new SuccessResponseDto(true, 'Placard was updated'),
  })
  async placardUpdate(
    @Body() body: PlacardSaveDto,
  ): Promise<SuccessResponseDto<boolean, string>> {
    const result = await this.placardService.update(body);

    if (result) {
      return new SuccessResponseDto(true, 'Placard was updated');
    } else {
      throw new Error('Error: Failed to update not found placard Id');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/find/list/:id')
  @ApiResponse({
    status: 200,
    description: 'Found placard list.',
    isArray: true,
    type: [PlacardGetDto],
    example: new SuccessResponseDto([PlacardGetExample], 'Found placard list'),
  })
  async placardListByUserId(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto<PlacardGetDto[], string>> {
    const result = await this.placardService.getListByUserId(id);
    const mappingToDto = PlacardGetDto.listToDto(result);
    return new SuccessResponseDto(mappingToDto, 'Found placard list');
  }

  @Get('/find/list')
  @ApiResponse({
    status: 200,
    description: 'Found placard list.',
    isArray: true,
    type: PlacardGetDto,
    example: new SuccessResponseDto([PlacardGetExample], 'Found placard list'),
  })
  async placardList(): Promise<SuccessResponseDto<PlacardGetDto[], string>> {
    const result = await this.placardService.getList();
    const mappingToDto = PlacardGetDto.listToDto(result);
    return new SuccessResponseDto(mappingToDto, 'Found placard list');
  }

  @Get('/find/:placardId')
  @ApiResponse({
    status: 200,
    description: 'Found placard by id.',
    isArray: true,
    type: PlacardGetDto,
    example: new SuccessResponseDto(PlacardGetExample, 'Found placard by id'),
  })
  async placardByid(
    @Param('placardId') placardId: string,
  ): Promise<SuccessResponseDto<PlacardGetDto, string>> {
    const result = await this.placardService.getById(placardId);
    const mappingToDto = PlacardGetDto.toDto(result);
    return new SuccessResponseDto(mappingToDto, 'Found placard by id');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @ApiResponse({
    status: 200,
    description: 'Delete placard.',
    example: new SuccessResponseDto(true, 'Placard was deleted'),
  })
  async placardDeleteById(
    @Body() body: PlacardDeleteDto,
  ): Promise<SuccessResponseDto<boolean, string>> {
    const result = await this.placardService.delete(body.id);
    if (result) {
      return new SuccessResponseDto(true, 'Placard was deleted');
    } else {
      throw new Error('Error: Failed to delete not found placard Id');
    }
  }
}
