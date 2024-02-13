import 'multer';

import { GuitarErrorMessage } from '@guitar-shop/consts';
import { CreateGuitarDto, GuitarQuery, GuitarRdo, UpdateGuitarDto } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Pagination } from '@guitar-shop/types';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  public async create(dto: CreateGuitarDto, userId: string, filePath: string): Promise<GuitarEntity> {
    const entity = GuitarEntity.fromDto(dto, userId, filePath);
    const document = await this.guitarRepository.save(entity);
    entity.id = document.id;
    return entity;
  }

  public async getById(id: string): Promise<GuitarEntity> {
    return await this.guitarRepository.findById(id);
  }

  public async update(id: string, dto: UpdateGuitarDto): Promise<GuitarEntity> {
    const document = await this.guitarRepository.findById(id);

    if (!document) {
      throw new NotFoundException(GuitarErrorMessage.NotFound);
    }

    let hasChanges = false;
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && document[key] !== value) {
        document[key] = value;
        hasChanges = true;
      }

      if (key === 'publishDate') {
        document[key] = new Date(value);
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return document;
    }

    return this.guitarRepository.update(id, document);
  }

  public async delete(id: string) {
    try {
      await this.guitarRepository.deleteById(id);
    } catch {
      throw new NotFoundException(GuitarErrorMessage.NotFound);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    console.log(file);
    return '';
  }
}
