import { IUser } from '../domain/user.domain';

export interface IUserRepository {
  save(data: IUser): Promise<IUser>;
  getByUsername(data: string): Promise<IUser>;
}
