import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import {
    DEFAULT_SORT_DIRECTION, DefaultPagination, GUITAR_STRINGS, GuitarErrorMessage
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

  @IsEnum(GuitarType)
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsOptional()
  public type?: GuitarType;

  @IsIn(GUITAR_STRINGS, { message: GuitarErrorMessage.WrongGuitarStrings })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public guitarStrings?: number;
}
