import { BasePostgresRepository } from '@guitar-shop/core';
import { PrismaClientService } from '@guitar-shop/models';
import { User } from '@guitar-shop/types';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, User> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, UserEntity.fromObject);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.user.create({
      data: { ...pojoEntity },
    });
    entity.id = document.id;
    return entity;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({
      where: { id },
    });
    return this.createEntityFromDocument(document);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({ where: { email } });
    return this.createEntityFromDocument(document);
  }

  public async update(id: string, entity: UserEntity): Promise<UserEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedDocument = await this.client.user.update({
      where: { id },
      data: {
        name: pojoEntity.name,
        email: pojoEntity.email,
        passwordHash: pojoEntity.passwordHash,
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.user.delete({ where: { id } });
  }
}
