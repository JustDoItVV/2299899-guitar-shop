import 'multer';

import { ensureDir } from 'fs-extra';
import * as crypto from 'node:crypto';
import { existsSync, unlink } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { BackendConfig } from '@guitar-shop/config';
import { GuitarErrorMessage, UPLOAD_GUITARS_SUBDIRECTORY } from '@guitar-shop/consts';
import { CreateGuitarDto, GuitarQuery, GuitarRdo, UpdateGuitarDto } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Pagination } from '@guitar-shop/types';
import {
    BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { GuitarEntity } from './guitar.entity';
import { GuitarRepository } from './guitar.repository';

@Injectable()
export class GuitarService {
  constructor(
    private readonly guitarRepository: GuitarRepository,
    @Inject(BackendConfig.KEY)
    private readonly config: ConfigType<typeof BackendConfig>
  ) {}

  private async getUploadPath(filename: string): Promise<string> {
    const uploadDirectory = this.config.uploadDirectory;
    await ensureDir(uploadDirectory);
    const uploadPath = join(
      uploadDirectory,
      UPLOAD_GUITARS_SUBDIRECTORY,
      filename
    );
    return uploadPath;
  }

  public async getByQuery(query?: GuitarQuery): Promise<Pagination<GuitarRdo>> {
    const pagination = await this.guitarRepository.find(query);
    const paginatedResult = {
      ...pagination,
      entities: pagination.entities.map((entity) =>
        fillDto(GuitarRdo, entity.toPOJO())
      ),
    };
    return paginatedResult;
  }

  public async create(
    dto: CreateGuitarDto,
    userId: string,
    file: Express.Multer.File
  ): Promise<GuitarEntity> {
    const filename = await this.saveFile(file);
    const entity = GuitarEntity.fromDto(dto, userId, filename);
    const document = await this.guitarRepository.save(entity);
    entity.id = document.id;
    return entity;
  }

  public async getById(id: string): Promise<GuitarEntity> {
    const document = await this.guitarRepository.findById(id);

    if (!document) {
      const error = new NotFoundException(GuitarErrorMessage.NotFound);
      Logger.error(error);
      throw error;
    }

    return document;
  }

  public async update(
    id: string,
    dto: UpdateGuitarDto,
    file: Express.Multer.File | undefined
  ): Promise<GuitarEntity> {
    const document = await this.guitarRepository.findById(id);

    if (!document) {
      const error = new NotFoundException(GuitarErrorMessage.NotFound);
      Logger.error(error);
      throw error;
    }

    let hasChanges = false;

    if (file) {
      await this.deleteFile(document.photo);
      const filename = await this.saveFile(file);
      document.photo = filename;
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
      const document = await this.getById(id);
      await this.deleteFile(document.photo);
      await this.guitarRepository.deleteById(id);
    } catch {
      const error = new NotFoundException(GuitarErrorMessage.NotFound);
      Logger.error(error);
      throw error;
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      const error = new BadRequestException(
        GuitarErrorMessage.PhotoFileRequired
      );
      Logger.error(error);
      throw error;
    }

    const filename = `${crypto.randomUUID()}-${file.originalname}`;
    const uploadPath = await this.getUploadPath(filename);
    await writeFile(uploadPath, file.buffer);

    return filename;
  }

  public async getFile(id: string): Promise<string> {
    const document = await this.getById(id);
    const filePath = await this.getUploadPath(document.photo);

    if (!existsSync(filePath)) {
      Logger.error(GuitarErrorMessage.PhotoFileNotFound);
      return 'notFound';
    }

    const file = await readFile(filePath);
    return `data:image/png;base64,${file.toString('base64')}`;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = await this.getUploadPath(filename);

    if (existsSync(filePath)) {
      unlink(filePath, (error) => {
        if (error) {
          const exception = new InternalServerErrorException(error);
          Logger.error(exception);
          throw exception;
        }
      });
    }
  }
}
