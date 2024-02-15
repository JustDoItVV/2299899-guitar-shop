import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  NameLength,
  PasswordLength,
  UserErrorMessage,
} from '@guitar-shop/consts';

export class CreateUserDto {
  @MaxLength(NameLength.Max, { message: UserErrorMessage.NameMaxLength })
  @MinLength(NameLength.Min, { message: UserErrorMessage.NameMinLength })
  @IsString({ message: UserErrorMessage.NotString })
  @IsNotEmpty({ message: UserErrorMessage.NameRequired })
  public name: string;

  @IsEmail({}, { message: UserErrorMessage.EmailNotValid })
  @IsNotEmpty({ message: UserErrorMessage.EmailRequired })
  public email: string;

  @MaxLength(PasswordLength.Max, {
    message: UserErrorMessage.PasswordMaxLength,
  })
  @MinLength(PasswordLength.Min, {
    message: UserErrorMessage.PasswordMinLength,
  })
  @IsString({ message: UserErrorMessage.NotString })
  @IsNotEmpty({ message: UserErrorMessage.PasswordRequired })
  public password: string;
}
