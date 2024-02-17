import { API_REFRESH_HEADER, ApiUserMessage } from '@guitar-shop/consts';
import {
  AnonymousValidationPipe,
  JwtAuthGuard,
  JwtRefreshGuard,
  UserParam,
} from '@guitar-shop/core';
import {
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto,
  TokenPayloadRdo,
  UserRdo,
} from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { TokenPayload } from '@guitar-shop/types';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@ApiSecurity('basic')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiUserMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ApiUserMessage.UserAlreadyExists,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiUserMessage.UserCreationValidationError,
  })
  @Post('register')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  public async create(
    @UserParam(new AnonymousValidationPipe()) _user: TokenPayload,
    @Body() dto: CreateUserDto
  ) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiUserMessage.LoginSuccess,
    type: UserRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiUserMessage.LoginNotFound,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ApiUserMessage.LoginValidationError,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiUserMessage.LoginWrongPassword,
  })
  @Post('login')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  public async login(
    @UserParam(new AnonymousValidationPipe()) _user: TokenPayload,
    @Body() dto: LoginUserDto
  ) {
    const userEntity = await this.userService.verifyUser(dto);
    const userToken = await this.userService.createUserToken(userEntity);
    return fillDto(LoggedUserRdo, { ...userEntity.toPOJO(), ...userToken });
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiUserMessage.CheckUser,
    type: TokenPayloadRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiUserMessage.Unauthorized,
  })
  @Post('check')
  @UseGuards(JwtAuthGuard)
  public async checkToken(@UserParam() payload: TokenPayload) {
    return payload;
  }

  @ApiBearerAuth()
  @ApiHeader(API_REFRESH_HEADER)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiUserMessage.RefreshTokenSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiUserMessage.Unauthorized,
  })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@UserParam() user: UserEntity) {
    return this.userService.createUserToken(user);
  }
}
