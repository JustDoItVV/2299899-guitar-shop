import dayjs from 'dayjs';

import { JwtConfig } from '@guitar-shop/config';
import { parseTime } from '@guitar-shop/helpers';
import { RefreshTokenPayload } from '@guitar-shop/types';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(JwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof JwtConfig>
  ) {}

  public async create(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      userId: payload.id,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async delete(tokenId: string) {
    await this.deleteExpired();
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(
      tokenId
    );
    return refreshToken !== null;
  }

  public async deleteExpired() {
    return this.refreshTokenRepository.deleteExpired();
  }
}
