import { BasePostgresRepository } from '@guitar-shop/core';
import { PrismaClientService } from '@guitar-shop/models';
import { RefreshToken } from '@guitar-shop/types';
import { Injectable } from '@nestjs/common';

import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, RefreshToken> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, RefreshTokenEntity.fromObject);
  }

  public async save(entity: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.refreshToken.create({
      data: { ...pojoEntity },
    });
    entity.id = document.id;
    return entity;
  }

  public async findById(id: string): Promise<RefreshTokenEntity | null> {
    const document = await this.client.refreshToken.findFirst({
      where: { id },
    });
    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.refreshToken.delete({ where: { id } });
  }

  public async deleteExpired() {
    return this.client.refreshToken.deleteMany({ where: { expiresIn: { lt: new Date() } } });
  }
}
