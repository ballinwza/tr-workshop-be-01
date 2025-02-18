import { PlacardEntityMapper } from './adapter/outbound/mapper/placard.mapper';
import { IPlacard } from './interface/domain/placard.domain';
import { IPlacardRepository } from './interface/repository/placard.repository.interface';

export class PlacardService {
  constructor(private readonly placardRepository: IPlacardRepository) {}

  async save(data: IPlacard): Promise<{ id: string }> {
    const afterMapping = PlacardEntityMapper.saveDomainToEntity(data);
    return await this.placardRepository.save(afterMapping);
  }

  async find(userId?: string): Promise<IPlacard[]> {
    if (userId) {
      return await this.placardRepository.getListByUserId(userId);
    }
    return await this.placardRepository.getList();
  }
  async findById(placardId: string): Promise<IPlacard> {
    return await this.placardRepository.getById(placardId);
  }

  async delete(id: string): Promise<boolean> {
    return await this.placardRepository.delete(id);
  }
}
