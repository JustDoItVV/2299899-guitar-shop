/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClientService } from '@guitar-shop/models';

import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<EntityType extends Entity<EntityIdType, DocumentType>, DocumentType = DefaultPojoType> implements Repository<EntityType, DocumentType> {
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document);
  }

  public async findById(_id: EntityType['id']): Promise<EntityType | null> {
    throw new Error('Not implemented');
  }

  public async save(_entity: EntityType): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async update(_id: EntityType['id'], _entity: EntityType): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async deleteById(_id: EntityType['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
