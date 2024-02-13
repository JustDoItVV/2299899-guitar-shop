import * as crypto from 'node:crypto';

import { JwtConfig } from '@guitar-shop/config';
import { CreateUserDto } from '@guitar-shop/dtos';
import { createJWTPayload } from '@guitar-shop/helpers';
import { Token } from '@guitar-shop/types';
import {
    ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { UserErrorMessage } from './user.const';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY) private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  public async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const user = { name, email, passwordHash: ''};
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserErrorMessage.UserExists);
    }

    const entity = await new UserEntity(user).setPassword(password);
    return this.userRepository.save(entity);
  }

  public async createUserToken(user: UserEntity): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user.toPOJO());
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.create(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      });
      return { accessToken, refreshToken };

    } catch (error) {
      this.logger.error(`[${UserErrorMessage.TokenCreationError}]: ${error.message}`);
      throw new HttpException(UserErrorMessage.TokenCreationError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return user;
  }
}
