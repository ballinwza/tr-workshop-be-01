import { IUser } from '@/user/interface/domain/user.domain';
import { UserEntity } from '../schema/user.schema';

export class UserEntityMapper {
  public static saveUserEntity({
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

  public static mappingToDomain({
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
