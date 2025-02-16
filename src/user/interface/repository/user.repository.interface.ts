import { IUser } from '../domain/user.domain';

export interface IUserRepository {
  saveUser(data: IUser): Promise<IUser>;
}
