import { JwtAuthGuard } from '@guitar-shop/core';
import {
    CreateGuitarDto, GuitarPaginationRdo, GuitarQuery, GuitarRdo, UpdateGuitarDto
} from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload } from '@guitar-shop/types';
import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards
} from '@nestjs/common';

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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async showById(@Param('id') id: string) {
    return await this.guitarService.getById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body() dto: UpdateGuitarDto) {
    const updatedGuitar = await this.guitarService.update(id, dto);
    return fillDto(GuitarRdo, updatedGuitar.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: string) {
    await this.guitarService.delete(id);
  }
}
