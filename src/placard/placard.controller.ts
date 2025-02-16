import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacardDeleteReqDto } from './adapter/inbound/dto/deletePlacard.req.dto';
import { PlacardSaveReqDto } from './adapter/inbound/dto/savePlacard.req.dto';
import { IPlacard } from './interface/domain/placard.domain';
import { PlacardRepository } from './placard.repository';
import { PlacardService } from './placard.service';

@ApiTags('Placard')
@Controller('placard')
export class PlacardController {
  private placardService: PlacardService;

  constructor(private readonly placardRepository: PlacardRepository) {
    this.placardService = new PlacardService(this.placardRepository);
  }

  @Post('/save')
  @ApiResponse({ status: 200, description: 'Found placard.', type: IPlacard })
  async placardSave(@Body() body: PlacardSaveReqDto): Promise<{ id: string }> {
    return await this.placardService.save(PlacardSaveReqDto.toDomain(body));
  }

  @Get('/find-all')
  @ApiResponse({
    status: 200,
    description: 'Found placard.',
    type: [IPlacard],
  })
  async placards(): Promise<IPlacard[]> {
    return await this.placardService.find();
  }

  @Get('/find/:userId')
  @ApiResponse({ status: 200, description: 'Found placard.', type: [IPlacard] })
  async placardsByUserId(@Param('userId') userId: string): Promise<IPlacard[]> {
    return await this.placardService.find(userId);
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
