import { CreateUserDto, UserRdo } from '@guitar-shop/dtos';
import { fillDto } from '@guitar-shop/helpers';
import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }
}
