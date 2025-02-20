import { IPlacard } from '../domain/placard.domain';

export interface IPlacardRepository {
  save(data: IPlacard): Promise<{ id: string }>;
  getList(): Promise<IPlacard[]>;
  getListByUserId(userId: string): Promise<IPlacard[]>;
  getById(placardId: string): Promise<IPlacard>;
  delete(id: string): Promise<boolean>;
}
