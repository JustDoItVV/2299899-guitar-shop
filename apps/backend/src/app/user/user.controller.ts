import { JwtAuthGuard } from '@guitar-shop/core';
import { CreateUserDto, LoggedUserRdo, LoginUserDto, UserRdo } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { RequestWithTokenPayload } from '@guitar-shop/types';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const userToken = await this.userService.createUserToken(user);
    return fillDto(LoggedUserRdo, {  ...user.toPOJO(), ...userToken });
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
