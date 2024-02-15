import { Expose } from 'class-transformer';

import { GuitarType } from '@guitar-shop/types';

export class GuitarRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public type: GuitarType;

  @Expose()
  public photo: string;

  @Expose()
  public vendorCode: string;

  @Expose()
  public guitarStrings: number;

  @Expose()
  public price: number;

  @Expose()
  public publishDate: Date;

  @Expose()
  public createdAt: Date;
}
