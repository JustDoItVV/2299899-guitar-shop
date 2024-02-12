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

  public async findById(): Promise<EntityType | null> {
    throw new Error('Not implemented');
  }

  public async save(): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async update(): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async deleteById(): Promise<void> {
    throw new Error('Not implemented');
  }
}
