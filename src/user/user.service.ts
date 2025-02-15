import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<string> {
    return this.userRepository.getHello();
  }
}
