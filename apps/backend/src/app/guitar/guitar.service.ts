import 'multer';

import { ensureDir } from 'fs-extra';
import * as crypto from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { BackendConfig } from '@guitar-shop/config';
import { GuitarErrorMessage } from '@guitar-shop/consts';
import { CreateGuitarDto, GuitarQuery, GuitarRdo, UpdateGuitarDto } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Pagination } from '@guitar-shop/types';
import {
    BadRequestException, Inject, Injectable, NotFoundException, StreamableFile
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { GuitarEntity } from './guitar.entity';
import { GuitarRepository } from './guitar.repository';

@Injectable()
export class GuitarService {
  constructor(
    private readonly guitarRepository: GuitarRepository,
    @Inject(BackendConfig.KEY) private readonly config: ConfigType<typeof BackendConfig>,
  ) {}

  public async getByQuery(query?: GuitarQuery): Promise<Pagination<GuitarRdo>> {
    const pagination = await this.guitarRepository.find(query);
    const paginatedResult = {
      ...pagination,
      entities: pagination.entities.map((entity) => fillDto(GuitarRdo, entity.toPOJO())),
    };
    return paginatedResult;
  }

  public async create(dto: CreateGuitarDto, userId: string, file: Express.Multer.File): Promise<GuitarEntity> {
    const filePath = await this.saveFile(file);
    const entity = GuitarEntity.fromDto(dto, userId, filePath);
    const document = await this.guitarRepository.save(entity);
    entity.id = document.id;
    return entity;
  }

  public async getById(id: string): Promise<GuitarEntity> {
    return await this.guitarRepository.findById(id);
  }

  public async update(id: string, dto: UpdateGuitarDto, file: Express.Multer.File | undefined): Promise<GuitarEntity> {
    const document = await this.guitarRepository.findById(id);

    if (!document) {
      throw new NotFoundException(GuitarErrorMessage.NotFound);
    }

    let hasChanges = false;

    if (file) {
      const filePath = await this.saveFile(file);
      document.photo = filePath;
      hasChanges = true;
    }

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
    if (!file) {
      throw new BadRequestException(GuitarErrorMessage.PhotoFileRequired);
    }

    const uploadDirectory = this.config.uploadDirectory;
    const filename = `${crypto.randomUUID()}-${file.originalname}`
    const uploadPath = join(uploadDirectory, 'guitar', filename);
    await ensureDir(uploadDirectory);
    await writeFile(uploadPath, file.buffer);

    return uploadPath;
  }

  public async getFile(id: string): Promise<StreamableFile> {
    const document = await this.getById(id);

    if (!existsSync(document.photo)) {
      throw new NotFoundException(GuitarErrorMessage.PhotoFileNotFound);
    }

    const file = createReadStream(document.photo);
    return new StreamableFile(file);
  }
}
