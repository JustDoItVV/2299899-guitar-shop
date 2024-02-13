import { CreateUserDto } from '@guitar-shop/dtos';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { UserErrorMessage } from './user.const';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const user = { name, email, passwordHash: ''};
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserErrorMessage.UserExists);
    }

    const entity = await new UserEntity(user).setPassword(password);
    return this.userRepository.save(entity);
  }
}
