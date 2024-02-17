import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

import {
  DEFAULT_SORT_DIRECTION,
  DefaultPagination,
  GUITAR_STRINGS,
  GuitarErrorMessage,
  Price,
} from "@guitar-shop/consts";
import { TransformToInt } from "@guitar-shop/core";
import { GuitarType, SortDirection, SortOption } from "@guitar-shop/types";
import { ApiProperty } from "@nestjs/swagger";

export class GuitarQuery {
  @ApiProperty({
    description: "Change limit pagination elements count",
    required: false,
  })
  @Transform(({ value }) => +value || DefaultPagination.Limit)
  @IsNumber()
  @IsOptional()
  public limit: number = DefaultPagination.Limit;

  @ApiProperty({
    description: "Sort field option",
    required: false,
    enum: SortOption,
  })
  @IsIn(Object.values(SortOption))
  @IsOptional()
  public sortOption: SortOption = SortOption.CreatedAt;

  @ApiProperty({
    description: "Sort direction",
    required: false,
    enum: SortDirection,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({ description: "Pagination page", required: false })
  @Transform(({ value }) => +value || DefaultPagination.Page)
  @IsOptional()
  public page: number = DefaultPagination.Page;

  @ApiProperty({
    description: "Guitar type.",
    enum: GuitarType,
    required: false,
  })
  @IsEnum(GuitarType, { each: true })
  @IsString({
    message: GuitarErrorMessage.NotString,
    each: true,
  })
  @IsOptional()
  public type?: GuitarType | GuitarType[];

  @ApiProperty({
    description: "Guitar strings number.",
    type: [Number],
    required: false,
  })
  @IsIn(GUITAR_STRINGS, {
    each: true,
    message: GuitarErrorMessage.WrongGuitarStrings,
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public guitarStrings?: number | number[];

  @ApiProperty({
    description: "Guitar price.",
    example: 500000,
    required: false,
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public price: [number, number] = [Price.Min, Price.Max];
}
