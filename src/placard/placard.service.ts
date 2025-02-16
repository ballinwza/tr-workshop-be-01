import { PlacardEntityMapper } from './adapter/outbound/mapper/placard.mapper';
import { IPlacard } from './interface/domain/placard.domain';
import { IPlacardRepository } from './interface/repository/placard.repository.interface';

export class PlacardService {
  constructor(private readonly placardRepository: IPlacardRepository) {}

  async save(data: IPlacard): Promise<IPlacard> {
    const afterMapping = PlacardEntityMapper.savePlacardEntity(data);
    return await this.placardRepository.savePlacard(afterMapping);
  }
}
