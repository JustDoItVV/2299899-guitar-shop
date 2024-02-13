import { CreateGuitarDto, GuitarQuery, GuitarRdo } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Pagination } from '@guitar-shop/types';
import { Injectable } from '@nestjs/common';

import { GuitarEntity } from './guitar.entity';
import { GuitarRepository } from './guitar.repository';

@Injectable()
export class GuitarService {
  constructor(private readonly guitarRepository: GuitarRepository) {}

  public async getByQuery(query?: GuitarQuery): Promise<Pagination<GuitarRdo>> {
    const pagination = await this.guitarRepository.find(query);
    const paginatedResult = {
      ...pagination,
      entities: pagination.entities.map((entity) => fillDto(GuitarRdo, entity.toPOJO())),
    };
    return paginatedResult;
  }

  public async create(dto: CreateGuitarDto, userId: string): Promise<GuitarEntity> {
    const entity = GuitarEntity.fromDto(dto, userId);
    const document = await this.guitarRepository.save(entity);
    entity.id = document.id;
    return entity;
  }
}
