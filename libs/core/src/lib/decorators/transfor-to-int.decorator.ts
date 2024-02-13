import { Transform } from 'class-transformer';

import { BadRequestException } from '@nestjs/common';

export function TransformToInt(message: string) {
  return Transform((data) => {
    const parsedValue = parseInt(data.value, 10);

    if (!parsedValue) {
      throw new BadRequestException(`${data.key} ${message}`);
    }

    return parsedValue;
  });
}
