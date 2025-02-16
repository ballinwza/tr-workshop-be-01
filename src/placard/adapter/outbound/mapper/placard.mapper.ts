import { IPlacard } from '@/placard/interface/domain/placard.domain';
import { Builder } from 'builder-pattern';
import { PlacardEntity } from '../schema/placard.schema';

export class PlacardEntityMapper {
  public static savePlacardEntity({
    _id,
    description,
    userId,
    commentId,
    community,
    title,
  }: IPlacard): PlacardEntity {
    return Builder(PlacardEntity)
      ._id(_id)
      .userId(userId)
      .commentId(commentId)
      .community(community)
      .title(title)
      .description(description)
      .build();
  }

  public static mappingToDomain({
    _id,
    description,
    userId,
    commentId,
    community,
    title,
  }: PlacardEntity): IPlacard {
    return Builder(IPlacard)
      ._id(_id)
      .userId(userId)
      .commentId(commentId)
      .community(community)
      .title(title)
      .description(description)
      .build();
  }

  public static mappingListToDomain(entities: PlacardEntity[]): IPlacard[] {
    return entities.map((entity) => this.mappingToDomain(entity));
  }
}
