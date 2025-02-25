import { IPlacard } from '@/placard/interface/placard.interface';
import { PlacardEntity } from '../schema/placard.schema';

export class PlacardEntityMapper {
  public static saveDomainToEntity({
    _id,
    description,
    userId,
    commentId,
    community,
    title,
  }: IPlacard): PlacardEntity {
    return {
      _id,
      userId,
      commentId,
      community,
      title,
      description,
    };
  }

  public static toDomain({
    _id,
    description,
    userId,
    commentId,
    community,
    title,
  }: PlacardEntity): IPlacard {
    return {
      _id,
      userId,
      commentId,
      community,
      title,
      description,
    };
  }

  public static mappingListToDomain(entities: PlacardEntity[]): IPlacard[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}
