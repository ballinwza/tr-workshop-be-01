import { IUser } from '@/user/interface/domain/user.domain';
import { UserEntity } from '../schema/user.schema';

export class UserEntityMapper {
  public static saveToEntity({
    _id,
    profileImageUrl,
    fullName,
    username,
  }: UserEntity): IUser {
    return {
      _id,
      profileImageUrl,
      fullName,
      username,
    };
  }

  public static toDomain({
    _id,
    profileImageUrl,
    fullName,
    username,
  }: UserEntity): IUser {
    return {
      _id,
      profileImageUrl,
      fullName,
      username,
    };
  }
}
