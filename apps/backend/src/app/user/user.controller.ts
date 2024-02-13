import { AnonymousValidationPipe, JwtAuthGuard, UserParam } from '@guitar-shop/core';
import { CreateUserDto, LoggedUserRdo, LoginUserDto, UserRdo } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload, TokenPayload } from '@guitar-shop/types';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  public async create(@UserParam(new AnonymousValidationPipe()) _user: TokenPayload, @Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  public async login(@UserParam(new AnonymousValidationPipe()) _user: TokenPayload, @Body() dto: LoginUserDto) {
    const userEntity = await this.userService.getUserByEmail(dto.email);
    const userToken = await this.userService.createUserToken(userEntity);
    return fillDto(LoggedUserRdo, {  ...userEntity.toPOJO(), ...userToken });
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
