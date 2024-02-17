import 'multer';

import {
  AllowedPhotoFormat,
  ApiGuitarMessage,
  FILE_PARAMETER,
  GuitarErrorMessage,
} from '@guitar-shop/consts';
import {
  GuitarDataTrasformationPipe,
  JwtAuthGuard,
  PhotoValidationPipe,
} from '@guitar-shop/core';
import {
  CreateGuitarDto,
  GuitarPaginationRdo,
  GuitarQuery,
  GuitarRdo,
  UpdateGuitarDto,
} from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload } from '@guitar-shop/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { GuitarService } from './guitar.service';

@ApiSecurity('basic')
@ApiTags('guitars')
@Controller('guitars')
export class GuitarController {
  constructor(private readonly guitarService: GuitarService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiGuitarMessage.GuitarShow,
    type: GuitarPaginationRdo,
  })
  @Get('/')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )
  public async show(@Query() query: GuitarQuery) {
    const result = await this.guitarService.getByQuery(query);
    return fillDto(GuitarPaginationRdo, result);
  }

  @ApiBearerAuth()
  @ApiParam(FILE_PARAMETER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'New guitar data', type: CreateGuitarDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiGuitarMessage.GuitarCreated,
    type: GuitarRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiGuitarMessage.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiGuitarMessage.ValidationFailed,
  })
  @ApiResponse({
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    description: ApiGuitarMessage.PhotoUnsupportedType,
  })
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public async create(
    @Req() { user }: RequestWithTokenPayload,
    @Body(new GuitarDataTrasformationPipe()) dto: CreateGuitarDto,
    @UploadedFile(
      new PhotoValidationPipe(
        AllowedPhotoFormat,
        GuitarErrorMessage.PhotoWrongFormat
      )
    )
    file: Express.Multer.File
  ) {
    const newGuitar = await this.guitarService.create(dto, user.id, file);
    return fillDto(GuitarRdo, newGuitar.toPOJO());
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiGuitarMessage.GuitarRead,
    type: GuitarRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiGuitarMessage.GuitarNotFound,
  })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async showById(@Param('id') id: string) {
    const guitar = await this.guitarService.getById(id);
    return fillDto(GuitarRdo, guitar.toPOJO());
  }

  @ApiBearerAuth()
  @ApiParam({ ...FILE_PARAMETER, required: false })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({ description: 'New guitar data', type: UpdateGuitarDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiGuitarMessage.GuitarUpdate,
    type: GuitarRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiGuitarMessage.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiGuitarMessage.ValidationFailed,
  })
  @ApiResponse({
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    description: ApiGuitarMessage.PhotoUnsupportedType,
  })
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id') id: string,
    @Body(new GuitarDataTrasformationPipe()) dto: UpdateGuitarDto,
    @UploadedFile(
      new PhotoValidationPipe(
        AllowedPhotoFormat,
        GuitarErrorMessage.PhotoWrongFormat
      )
    )
    file: Express.Multer.File
  ) {
    const updatedGuitar = await this.guitarService.update(id, dto, file);
    return fillDto(GuitarRdo, updatedGuitar.toPOJO());
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ApiGuitarMessage.GuitarDelete,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiGuitarMessage.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiGuitarMessage.GuitarNotFound,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: string) {
    await this.guitarService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiGuitarMessage.PhotoRead,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiGuitarMessage.PhotoNotFound,
  })
  @Get('/:id/photo')
  public async getPhoto(@Param('id') id: string) {
    const photoUrl = await this.guitarService.getFile(id);
    return photoUrl;
  }
}
