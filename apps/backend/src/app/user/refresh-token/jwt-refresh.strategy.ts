import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtConfig } from '@guitar-shop/config';
import { TokenNotExistsException } from '@guitar-shop/core';
import { getTokenNotExistErrorMessage } from '@guitar-shop/helpers';
import { RefreshTokenPayload } from '@guitar-shop/types';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../user.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    private readonly authService: UserService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      Logger.error(getTokenNotExistErrorMessage(payload.tokenId));
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.delete(payload.tokenId);

    return this.authService.getUserByEmail(payload.email);
  }
}
