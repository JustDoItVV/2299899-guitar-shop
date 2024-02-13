import 'multer';

import { AllowedPhotoFormat, GuitarErrorMessage } from '@guitar-shop/consts';
import { GuitarDataTrasformationPipe, JwtAuthGuard, PhotoValidationPipe } from '@guitar-shop/core';
import {
    CreateGuitarDto, GuitarPaginationRdo, GuitarQuery, GuitarRdo, UpdateGuitarDto
} from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload } from '@guitar-shop/types';
import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req,
    UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GuitarService } from './guitar.service';

@Controller('guitars')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async show(@Query() query: GuitarQuery) {
    const result = await this.guitarService.getByQuery(query);
    return fillDto(GuitarPaginationRdo, result);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public async create(@Body(new GuitarDataTrasformationPipe()) dto: CreateGuitarDto, @Req() { user }: RequestWithTokenPayload, @UploadedFile(new PhotoValidationPipe(AllowedPhotoFormat, GuitarErrorMessage.PhotoWrongFormat)) file: Express.Multer.File) {
    const filePath = await this.guitarService.saveFile(file);
    const newGuitar = await this.guitarService.create(dto, user.id, filePath);
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
