import { IUserRepository } from '@/user/interface/repository/user.repository.interface';

import { UserEntityMapper } from './adapter/outbound/mapper/user.mapper';
import { IUser } from './interface/domain/user.domain';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async save(data: IUser): Promise<IUser> {
    const afterMapping = UserEntityMapper.saveUserEntity(data);
    return await this.userRepository.saveUser(afterMapping);
  }
}
