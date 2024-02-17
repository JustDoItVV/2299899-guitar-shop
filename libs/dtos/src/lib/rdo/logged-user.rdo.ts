import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: "Unique user's ID",
    example: '0d359ca0-386b-4a75-a6f9-8a46a8787bf4',
  })
  @Expose()
  public id: string;

  @ApiProperty({ description: "User's name.", example: 'John' })
  @Expose()
  public name: string;

  @ApiProperty({
    description: "Unique user's email.",
    example: 'user@user.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({ description: 'Access token' })
  @Expose()
  public accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  @Expose()
  public refreshToken: string;
}
