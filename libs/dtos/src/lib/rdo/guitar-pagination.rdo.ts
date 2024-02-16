import { Expose } from "class-transformer";

import { ApiProperty } from "@nestjs/swagger";

import { GuitarRdo } from "./guitar.rdo";

export class GuitarPaginationRdo {
  @ApiProperty({
    description: "Guitars list.",
    type: [GuitarRdo],
  })
  @Expose()
  public entities: GuitarRdo[];

  @ApiProperty({
    description: "Pagination total pages.",
    example: 1,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: "Pagination total items.",
    example: 1,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: "Pagination current page.",
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: "Pagination items per page.",
    example: 7,
  })
  @Expose()
  public itemsPerPage: number;
}
