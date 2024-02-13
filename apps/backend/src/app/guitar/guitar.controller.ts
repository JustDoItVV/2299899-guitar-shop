import { GuitarPaginationRdo, GuitarQuery } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Controller, Get, Query } from '@nestjs/common';

import { GuitarService } from './guitar.service';

@Controller('guitars')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @Get('/')
  public async show(@Query() query: GuitarQuery) {
    const result = await this.guitarService.getByQuery(query);
    return fillDto(GuitarPaginationRdo, result);
  }
}
