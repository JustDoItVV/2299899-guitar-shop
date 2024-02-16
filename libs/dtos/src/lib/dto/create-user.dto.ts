import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import {
  NameLength,
  PasswordLength,
  UserErrorMessage,
} from "@guitar-shop/consts";
import { getValidationErrorMessageWithLogging } from "@guitar-shop/helpers";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "User's name.", example: "John" })
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

  @ApiProperty({
    description: "Unique user's email.",
    example: "user@user.com",
  })
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

  @ApiProperty({ description: "User's password.", example: "123456" })
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
