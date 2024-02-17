import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { UserErrorMessage } from "@guitar-shop/consts";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "Unique user's email.",
    example: "admin@local.local",
  })
  @IsEmail(
    {},
    {
      message: UserErrorMessage.EmailNotValid,
    }
  )
  @IsNotEmpty({
    message: UserErrorMessage.EmailRequired,
  })
  public email: string;

  @ApiProperty({ description: "User's password.", example: "admin" })
  @IsString({
    message: UserErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: UserErrorMessage.PasswordRequired,
  })
  public password: string;
}
