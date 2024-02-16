import { Expose } from "class-transformer";

import { GuitarType } from "@guitar-shop/types";
import { ApiProperty } from "@nestjs/swagger";

export class GuitarRdo {
  @ApiProperty({
    description: "Unique guitar ID",
    example: "0d359ca0-386b-4a75-a6f9-8a46a8787bf4",
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: "Guitar title.",
    example: "Bass guitar",
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: "Guitar description.",
    example: "Good bass guitar",
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: "Guitar type.",
    enum: GuitarType,
    example: GuitarType.Accustic,
  })
  @Expose()
  public type: GuitarType;

  @ApiProperty({
    description: "Guitar photo file name.",
    example: "guitar.jpg",
  })
  @Expose()
  public photo: string;

  @ApiProperty({ description: "Guitar vendor code.", example: "123456789" })
  @Expose()
  public vendorCode: string;

  @ApiProperty({ description: "Guitar strings number.", example: 4 })
  @Expose()
  public guitarStrings: number;

  @ApiProperty({ description: "Guitar price.", example: 500000 })
  @Expose()
  public price: number;

  @ApiProperty({
    description: "Guitar publish date",
    example: "2024-02-16T00:00:00.000Z",
    required: false,
  })
  @Expose()
  public publishDate: Date;

  @ApiProperty({
    description: "Guitar creation date",
    example: "2024-02-16T00:00:00.000Z",
    required: false,
  })
  @Expose()
  public createdAt: Date;
}
