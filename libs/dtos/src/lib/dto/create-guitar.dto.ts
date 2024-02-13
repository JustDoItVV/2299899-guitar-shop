import {
    IsEnum, IsIn, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength
} from 'class-validator';

import {
    DescriptionLength, GUITAR_STRINGS, GuitarErrorMessage, Price, TitleLength, VendorCodelength
} from '@guitar-shop/consts';
import { TransformToInt } from '@guitar-shop/core';
import { GuitarType } from '@guitar-shop/types';

export class CreateGuitarDto {
  @MaxLength(TitleLength.Max, { message: GuitarErrorMessage.TitleMaxLength })
  @MinLength(TitleLength.Min, { message: GuitarErrorMessage.TitleMinLength })
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsNotEmpty({ message: GuitarErrorMessage.TitleRequired })
  public title: string;

  @MaxLength(DescriptionLength.Max, { message: GuitarErrorMessage.DescriptionMaxLength })
  @MinLength(DescriptionLength.Min, { message: GuitarErrorMessage.DescriptionMinLength })
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsNotEmpty({ message: GuitarErrorMessage.DescriptionRequired })
  public description: string;

  @IsEnum(GuitarType)
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsNotEmpty({ message: GuitarErrorMessage.TypeRequired })
  public type: GuitarType;

  @MaxLength(VendorCodelength.Max, { message: GuitarErrorMessage.VendorCodeMaxLength })
  @MinLength(VendorCodelength.Min, { message: GuitarErrorMessage.VendorCodeMinLength })
  @IsString({ message: GuitarErrorMessage.NotString })
  @IsNotEmpty({ message: GuitarErrorMessage.VendorCodeRequired })
  public vendorCode: string;

  @IsIn(GUITAR_STRINGS, { message: GuitarErrorMessage.WrongGuitarStrings })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({ message: GuitarErrorMessage.GuitarStringsRequired })
  public guitarStrings: number;

  @Max(Price.Max, { message: GuitarErrorMessage.PriceMax })
  @Min(Price.Min, { message: GuitarErrorMessage.PriceMin })
  @TransformToInt(GuitarErrorMessage.Nan)
  @IsNotEmpty({ message: GuitarErrorMessage.PriceRequired })
  public price: number;
}
