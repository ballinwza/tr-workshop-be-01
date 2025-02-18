import { IUser } from '@/user/interface/domain/user.domain';

export class UserSaveReqDto {
  fullName: string;
  profileImageUrl: string;
  username: string;

  public static toDomain({
    fullName,
    profileImageUrl,
    username,
  }: UserSaveReqDto): IUser {
    return {
      _id: undefined,
      fullName,
      profileImageUrl,
      username,
    };
  }
}
