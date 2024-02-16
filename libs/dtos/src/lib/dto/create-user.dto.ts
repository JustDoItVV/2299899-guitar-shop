import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { NameLength, PasswordLength, UserErrorMessage } from '@guitar-shop/consts';
import { getValidationErrorMessageWithLogging } from '@guitar-shop/helpers';

export class CreateUserDto {
  @MaxLength(NameLength.Max, {
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.NameMaxLength
    ),
  })
  @MinLength(NameLength.Min, {
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.NameMinLength
    ),
  })
  @IsString({
    message: getValidationErrorMessageWithLogging(UserErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.NameRequired
    ),
  })
  public name: string;

  @IsEmail(
    {},
    {
      message: getValidationErrorMessageWithLogging(
        UserErrorMessage.EmailNotValid
      ),
    }
  )
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.EmailRequired
    ),
  })
  public email: string;

  @MaxLength(PasswordLength.Max, {
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.PasswordMaxLength
    ),
  })
  @MinLength(PasswordLength.Min, {
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.PasswordMinLength
    ),
  })
  @IsString({
    message: getValidationErrorMessageWithLogging(UserErrorMessage.NotString),
  })
  @IsNotEmpty({
    message: getValidationErrorMessageWithLogging(
      UserErrorMessage.PasswordRequired
    ),
  })
  public password: string;
}
