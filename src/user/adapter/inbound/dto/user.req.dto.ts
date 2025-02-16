import { IUser } from '@/user/interface/domain/user.domain';
import { Builder } from 'builder-pattern';

export class UserSaveReqDto {
  fullName: string;
  profileImageUrl: string;
  email: string;

  public static toDomain({
    fullName,
    profileImageUrl,
    email,
  }: UserSaveReqDto): IUser {
    return Builder(IUser)
      .fullName(fullName)
      .profileImageUrl(profileImageUrl)
      .email(email)
      .build();
  }
}
