import * as crypto from 'node:crypto';

import { JwtConfig } from '@guitar-shop/config';
import { UserErrorMessage } from '@guitar-shop/consts';
import { CreateUserDto, LoginUserDto } from '@guitar-shop/dtos';
import { createJWTPayload } from '@guitar-shop/helpers';
import { Token } from '@guitar-shop/types';
import {
    ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { MailService } from '../mail/mail.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
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
    private readonly mailService: MailService,
  ) {}

  public async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const user = { name, email, passwordHash: ''};
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserErrorMessage.UserExists);
    }

    const entity = await new UserEntity(user).setPassword(password);
    const document = await this.userRepository.save(entity);
    await this.mailService.sendRegisterSuccessMail({ ...dto })
    return document;
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
      throw new NotFoundException(UserErrorMessage.NotFound);
    }

    return user;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const document = await this.userRepository.findByEmail(email);

    if (!document) {
      throw new NotFoundException(UserErrorMessage.NotFound);
    }

    if (!await document.comparePassword(password)) {
      throw new UnauthorizedException(UserErrorMessage.PasswordWrong);
    }

    return document;
  }
}
