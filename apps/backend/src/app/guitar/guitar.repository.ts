import { BasePostgresRepository } from '@guitar-shop/core';
import { GuitarQuery } from '@guitar-shop/dtos';
import { PrismaClientService } from '@guitar-shop/models';
import { Guitar, GuitarType, Pagination, SortOption } from '@guitar-shop/types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { GuitarEntity } from './guitar.entity';

@Injectable()
export class GuitarRepository extends BasePostgresRepository<
  GuitarEntity,
  Guitar
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, GuitarEntity.fromObject);
  }

  private async getGuitarCount(
    where: Prisma.GuitarWhereInput
  ): Promise<number> {
    return this.client.guitar.count({ where });
  }

  private calculateGuitarPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: GuitarEntity): Promise<GuitarEntity> {
    const pojoEntity = entity.toPOJO();
    const document = await this.client.guitar.create({
      data: { ...pojoEntity },
    });
    entity.id = document.id;
    return entity;
  }

  public async find(query?: GuitarQuery): Promise<Pagination<GuitarEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.GuitarWhereInput = {};
    const orderBy: Prisma.GuitarOrderByWithRelationAndSearchRelevanceInput = {};

    if (query?.type) {
      if (Array.isArray(query.type)) {
        where.type = { in: query.type as GuitarType[] };
      } else {
        where.type = query.type as GuitarType;
      }
    }

    if (query?.guitarStrings) {
      if (Array.isArray(query.guitarStrings)) {
        where.guitarStrings = { in: query.guitarStrings as number[] };
      } else {
        where.guitarStrings = query.guitarStrings as number;
      }
    }

    if (query.sortOption === SortOption.CreatedAt) {
      orderBy.createdAt = query.sortDirection;
    } else if (query.sortOption === SortOption.Price) {
      orderBy.price = query.sortDirection;
    }

    const [documents, count] = await Promise.all([
      this.client.guitar.findMany({ where, orderBy, skip, take }),
      this.getGuitarCount(where),
    ]);

    return {
      entities: documents.map((document) =>
        this.createEntityFromDocument({
          ...document,
          type: document.type as GuitarType,
        })
      ),
      currentPage: query?.page,
      totalPages: this.calculateGuitarPage(count, take),
      itemsPerPage: take,
      totalItems: count,
    };
  }

  public async findById(id: string): Promise<GuitarEntity | null> {
    const document = await this.client.guitar.findFirst({ where: { id } });
    return document
      ? this.createEntityFromDocument({
          ...document,
          type: document.type as GuitarType,
        })
      : null;
  }

  public async update(id: string, entity: GuitarEntity): Promise<GuitarEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedDocument = await this.client.guitar.update({
      where: { id },
      data: {
        title: pojoEntity.title,
        description: pojoEntity.description,
        photo: pojoEntity.photo,
        type: pojoEntity.type,
        vendorCode: pojoEntity.vendorCode,
        guitarStrings: pojoEntity.guitarStrings,
        price: pojoEntity.price,
        userId: pojoEntity.userId,
        publishDate: pojoEntity.publishDate,
      },
    });

    return this.createEntityFromDocument({
      ...updatedDocument,
      type: updatedDocument.type as GuitarType,
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.guitar.delete({ where: { id } });
  }
}
