import { compare, genSalt, hash } from 'bcrypt';

import { SALT_ROUNDS } from '@guitar-shop/consts';
import { Entity } from '@guitar-shop/core';
import { UserAuth } from '@guitar-shop/types';

export class UserEntity implements UserAuth, Entity<string, UserAuth> {
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;

  constructor(user: UserAuth) {
    this.populate(user);
  }

  public toPOJO(): UserAuth {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: UserAuth): void {
    this.id = data.id ?? undefined;
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: UserAuth): UserEntity {
    return new UserEntity(data);
  }
}
