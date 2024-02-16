import { UserErrorMessage } from '@guitar-shop/consts';
import { Injectable, Logger, PipeTransform } from '@nestjs/common';

import { OnlyAnonymousException } from '../exceptions/only-anonymous.exception';

@Injectable()
export class AnonymousValidationPipe
  implements PipeTransform<Record<string, unknown>, Record<string, unknown>>
{
  transform(value: Record<string, unknown>): Record<string, unknown> {
    if (Object.keys(value).length !== 0) {
      Logger.error(UserErrorMessage.OnlyAnonymous);
      throw new OnlyAnonymousException();
    }

    return value;
  }
}
