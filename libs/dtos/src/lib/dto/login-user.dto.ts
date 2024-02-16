import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { UserErrorMessage } from "@guitar-shop/consts";
import { getValidationErrorMessageWithLogging } from "@guitar-shop/helpers";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "Unique user's email.",
    example: "admin@local.local",
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

  @ApiProperty({ description: "User's password.", example: "admin" })
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
