import { IUser } from '@/user/interface/domain/user.domain';
import { Builder } from 'builder-pattern';
import { UserEntity } from '../schema/user.schema';

export class UserEntityMapper {
  public static saveUserEntity({
    profileImageUrl,
    fullName,
    email,
  }: UserEntity): IUser {
    return Builder(IUser)
      .profileImageUrl(profileImageUrl)
      .fullName(fullName)
      .email(email)
      .build();
  }

  public static mappingToDomain({
    _id,
    profileImageUrl,
    fullName,
    email,
  }: UserEntity): IUser {
    return Builder(IUser)
      ._id(_id)
      .profileImageUrl(profileImageUrl)
      .fullName(fullName)
      .email(email)
      .build();
  }
}
