import { GuitarType } from '@guitar-shop/types';

export class CreateGuitarDto {
  public title: string;

  public description: string;

  public type: GuitarType;

  public vendorCode: string;

  public guitarStrings: number;

  public price: number;
}
