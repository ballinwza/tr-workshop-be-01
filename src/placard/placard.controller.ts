import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacardSaveReqDto } from './adapter/inbound/dto/placard.req.dto';
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

  @Post('/create')
  @ApiResponse({ status: 200, description: 'Found placard.', type: IPlacard })
  async createPlacard(@Body() body: PlacardSaveReqDto): Promise<IPlacard> {
    return await this.placardService.save(PlacardSaveReqDto.toDomain(body));
  }
}
