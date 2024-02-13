import { JwtAuthGuard } from '@guitar-shop/core';
import { CreateGuitarDto, GuitarPaginationRdo, GuitarQuery, GuitarRdo } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload } from '@guitar-shop/types';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';

import { GuitarService } from './guitar.service';

@Controller('guitars')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @Get('/')
  public async show(@Query() query: GuitarQuery) {
    const result = await this.guitarService.getByQuery(query);
    return fillDto(GuitarPaginationRdo, result);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public async create(@Body() dto: CreateGuitarDto, @Req() { user }: RequestWithTokenPayload ) {
    const newGuitar = await this.guitarService.create(dto, user.id);
    return fillDto(GuitarRdo, newGuitar.toPOJO());
  }
}
