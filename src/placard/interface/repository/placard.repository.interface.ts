import { IPlacard } from '../domain/placard.domain';

export interface IPlacardRepository {
  savePlacard(data: IPlacard): Promise<IPlacard>;
}
