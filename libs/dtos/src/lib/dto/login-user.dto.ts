import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserErrorMessage } from '@guitar-shop/consts';
import { getValidationErrorMessageWithLogging } from '@guitar-shop/helpers';

export class LoginUserDto {
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
