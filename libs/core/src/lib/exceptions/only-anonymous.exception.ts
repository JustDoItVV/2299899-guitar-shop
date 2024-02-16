import { UserErrorMessage } from '@guitar-shop/consts';
import { ForbiddenException } from '@nestjs/common';

export class OnlyAnonymousException extends ForbiddenException {
  constructor() {
    super(UserErrorMessage.OnlyAnonymous);
  }
}
