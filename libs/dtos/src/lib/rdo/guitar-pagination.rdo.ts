import { Expose } from 'class-transformer';

import { GuitarRdo } from './guitar.rdo';

export class GuitarPaginationRdo {
  @Expose()
  public entities: GuitarRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
