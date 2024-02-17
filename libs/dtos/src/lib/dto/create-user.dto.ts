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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "User's name.", example: 'John' })
  @MaxLength(NameLength.Max, {
    message: UserErrorMessage.NameMaxLength,
  })
  @MinLength(NameLength.Min, {
    message: UserErrorMessage.NameMinLength,
  })
  @IsString({
    message: UserErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: UserErrorMessage.NameRequired,
  })
  public name: string;

  @ApiProperty({
    description: "Unique user's email.",
    example: 'user@user.com',
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

  @ApiProperty({ description: "User's password.", example: '123456' })
  @MaxLength(PasswordLength.Max, {
    message: UserErrorMessage.PasswordMaxLength,
  })
  @MinLength(PasswordLength.Min, {
    message: UserErrorMessage.PasswordMinLength,
  })
  @IsString({
    message: UserErrorMessage.NotString,
  })
  @IsNotEmpty({
    message: UserErrorMessage.PasswordRequired,
  })
  public password: string;
}
