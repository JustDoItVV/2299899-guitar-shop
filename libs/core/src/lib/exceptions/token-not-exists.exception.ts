import { getTokenNotExistErrorMessage } from '@guitar-shop/helpers';
import { UnauthorizedException } from '@nestjs/common';

export class TokenNotExistsException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(getTokenNotExistErrorMessage(tokenId));
  }
}
