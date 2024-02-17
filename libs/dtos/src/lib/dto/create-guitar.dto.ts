import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

import {
  DescriptionLength,
  GUITAR_STRINGS,
  GuitarErrorMessage,
  Price,
  TitleLength,
  VendorCodelength,
} from "@guitar-shop/consts";
import { TransformToInt } from "@guitar-shop/core";
import { GuitarType } from "@guitar-shop/types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGuitarDto {
  @ApiProperty({ description: "Guitar title.", example: "Bass guitar" })
  @MaxLength(TitleLength.Max, {
    message: GuitarErrorMessage.TitleMaxLength,
  })
  @MinLength(TitleLength.Min, {
    message: GuitarErrorMessage.TitleMinLength,
  })
  @IsString({
    message: GuitarErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: GuitarErrorMessage.TitleRequired,
  })
  public title: string;

  @ApiProperty({
    description: "Guitar description.",
    example: "Good bass guitar",
  })
  @MaxLength(DescriptionLength.Max, {
    message: GuitarErrorMessage.DescriptionMaxLength,
  })
  @MinLength(DescriptionLength.Min, {
    message: GuitarErrorMessage.DescriptionMinLength,
  })
  @IsString({
    message: GuitarErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: GuitarErrorMessage.DescriptionRequired,
  })
  public description: string;

  @ApiProperty({
    description: "Guitar type.",
    enum: GuitarType,
    example: GuitarType.Accustic,
  })
  @IsEnum(GuitarType)
  @IsString({
    message: GuitarErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: GuitarErrorMessage.TypeRequired,
  })
  public type: GuitarType;

  @ApiProperty({ description: "Guitar vendor code.", example: "123456789" })
  @MaxLength(VendorCodelength.Max, {
    message: GuitarErrorMessage.VendorCodeMaxLength,
  })
  @MinLength(VendorCodelength.Min, {
    message: GuitarErrorMessage.VendorCodeMinLength,
  })
  @IsString({
    message: GuitarErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: GuitarErrorMessage.VendorCodeRequired,
  })
  public vendorCode: string;

  @ApiProperty({ description: "Guitar strings number.", example: 4 })
  @IsIn(GUITAR_STRINGS, {
    message: GuitarErrorMessage.WrongGuitarStrings,
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({
    message: GuitarErrorMessage.GuitarStringsRequired,
  })
  public guitarStrings: number;

  @ApiProperty({ description: "Guitar price.", example: 500000 })
  @Max(Price.Max, {
    message: GuitarErrorMessage.PriceMax,
  })
  @Min(Price.Min, {
    message: GuitarErrorMessage.PriceMin,
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({
    message: GuitarErrorMessage.PriceRequired,
  })
  public price: number;

  @ApiProperty({
    description: "Guitar publish date",
    example: "2024-02-16T00:00:00.000Z",
    required: false,
  })
  @IsDateString(
    {},
    {
      message: GuitarErrorMessage.PublishdateInvalid,
    }
  )
  @IsOptional()
  public publishDate?: string;
}
