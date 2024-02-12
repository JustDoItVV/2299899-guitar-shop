import { GuitarType } from './guitar-type.enum';

export interface Guitar {
  id?: string;
  title: string;
  description: string;
  photo: string;
  type: GuitarType;
  vendorCode: string;
  guitarStrings: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
