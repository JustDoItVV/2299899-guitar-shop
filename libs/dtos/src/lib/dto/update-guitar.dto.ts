import {
    IsDateString, IsEnum, IsIn, IsOptional, IsString, Max, MaxLength, Min, MinLength
} from 'class-validator';

import {
    DescriptionLength, GUITAR_STRINGS, GuitarErrorMessage, Price, TitleLength, VendorCodelength
} from '@guitar-shop/consts';
import { TransformToInt } from '@guitar-shop/core';
import { getValidationErrorMessageWithLogging } from '@guitar-shop/helpers';
import { GuitarType } from '@guitar-shop/types';

export class UpdateGuitarDto {
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
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsOptional()
  public title?: string;

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
  @IsOptional()
  public description?: string;

  @IsEnum(GuitarType)
  @IsString({
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.NotString),
  })
  @IsOptional()
  public type?: GuitarType;

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
  @IsOptional()
  public vendorCode?: string;

  @IsIn(GUITAR_STRINGS, {
    message: getValidationErrorMessageWithLogging(
      GuitarErrorMessage.WrongGuitarStrings
    ),
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public guitarStrings?: number;

  @Max(Price.Max, {
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.PriceMax),
  })
  @Min(Price.Min, {
    message: getValidationErrorMessageWithLogging(GuitarErrorMessage.PriceMin),
  })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsOptional()
  public price?: number;

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
