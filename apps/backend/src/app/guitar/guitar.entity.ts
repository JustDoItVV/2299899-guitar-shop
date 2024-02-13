import { Entity } from '@guitar-shop/core';
import { CreateGuitarDto } from '@guitar-shop/dtos';
import { Guitar, GuitarType } from '@guitar-shop/types';

export class GuitarEntity implements Guitar, Entity<string, Guitar> {
  public id?: string;
  public title: string;
  public description: string;
  public photo: string;
  public type: GuitarType;
  public vendorCode: string;
  public guitarStrings: number;
  public price: number;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Guitar): GuitarEntity {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.description = data.description;
    this.photo = data.photo;
    this.type = data.type;
    this.vendorCode = data.vendorCode;
    this.guitarStrings = data.guitarStrings;
    this.price = data.price;
    this.userId = data.userId;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;

    return this;
  }

  public toPOJO(): Guitar {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      photo: this.photo,
      type: this.type,
      vendorCode: this.vendorCode,
      guitarStrings: this.guitarStrings,
      price: this.price,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Guitar): GuitarEntity {
    return new GuitarEntity().populate(data);
  }

  static fromDto(dto: CreateGuitarDto, userId: string, filePath: string): GuitarEntity {
    const entity = new GuitarEntity();
    entity.title = dto.title;
    entity.description = dto.description;
    entity.photo = filePath;
    entity.type = dto.type;
    entity.vendorCode = dto.vendorCode;
    entity.guitarStrings = dto.guitarStrings;
    entity.price = dto.price;
    entity.userId = userId;

    return entity;
  }
}
