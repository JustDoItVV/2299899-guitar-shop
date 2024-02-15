import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  DEFAULT_SORT_DIRECTION,
  DefaultPagination,
  GUITAR_STRINGS,
  GuitarErrorMessage,
  Price,
} from '@guitar-shop/consts';
import { TransformToInt } from '@guitar-shop/core';
import { GuitarType, SortDirection, SortOption } from '@guitar-shop/types';

export class GuitarQuery {
  @Transform(({ value }) => +value || DefaultPagination.Limit)
  @IsNumber()
  @IsOptional()
  public limit: number = DefaultPagination.Limit;

  @IsIn(Object.values(SortOption))
  @IsOptional()
  public sortOption: SortOption = SortOption.CreatedAt;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DefaultPagination.Page)
  @IsOptional()
  public page: number = DefaultPagination.Page;

  @IsEnum(GuitarType, { each: true })
  @IsString({ message: GuitarErrorMessage.NotString, each: true })
  @IsOptional()
  public type?: GuitarType | GuitarType[];

  @IsIn(GUITAR_STRINGS, {
    each: true,
    message: GuitarErrorMessage.WrongGuitarStrings,
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public guitarStrings?: number | number[];

  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public price: [number, number] = [Price.Min, Price.Max];
}
