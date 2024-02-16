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
import { getValidationErrorMessageWithLogging } from "@guitar-shop/helpers";
import { GuitarType } from "@guitar-shop/types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGuitarDto {
  @ApiProperty({ description: "Guitar title.", example: "Bass guitar" })
  @MaxLength(TitleLength.Max, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.TitleMaxLength
    ),
  })
  @MinLength(TitleLength.Min, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.TitleMinLength
    ),
  })
  @IsString({
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.TitleRequired
    ),
  })
  public title: string;

  @ApiProperty({
    description: "Guitar description.",
    example: "Good bass guitar",
  })
  @MaxLength(DescriptionLength.Max, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.DescriptionMaxLength
    ),
  })
  @MinLength(DescriptionLength.Min, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.DescriptionMinLength
    ),
  })
  @IsString({
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.DescriptionRequired
    ),
  })
  public description: string;

  @ApiProperty({
    description: "Guitar type.",
    enum: GuitarType,
    example: GuitarType.Accustic,
  })
  @IsEnum(GuitarType)
  @IsString({
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.TypeRequired
    ),
  })
  public type: GuitarType;

  @ApiProperty({ description: "Guitar vendor code.", example: "123456789" })
  @MaxLength(VendorCodelength.Max, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.VendorCodeMaxLength
    ),
  })
  @MinLength(VendorCodelength.Min, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.VendorCodeMinLength
    ),
  })
  @IsString({
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.VendorCodeRequired
    ),
  })
  public vendorCode: string;

  @ApiProperty({ description: "Guitar strings number.", example: 4 })
  @IsIn(GUITAR_STRINGS, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.WrongGuitarStrings
    ),
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.GuitarStringsRequired
    ),
  })
  public guitarStrings: number;

  @ApiProperty({ description: "Guitar price.", example: 500000 })
  @Max(Price.Max, {
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.PriceMax),
  })
  @Min(Price.Min, {
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.PriceMin),
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.PriceRequired
    ),
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
      message: getValidationErrorMessageWithLogging(
        GuitarErrorMessage.PublishdateInvalid
      ),
    }
  )
  @IsOptional()
  public publishDate?: string;
}
