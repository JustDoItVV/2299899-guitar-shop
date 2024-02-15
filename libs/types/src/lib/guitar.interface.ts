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
  userId: string;
  publishDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
