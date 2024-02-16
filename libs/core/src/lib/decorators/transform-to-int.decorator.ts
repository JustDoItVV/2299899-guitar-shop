import { Transform } from 'class-transformer';

import { BadRequestException, Logger } from '@nestjs/common';

export function TransformToInt(message: string) {
  const parseValue = (value: string) => {
    const parsedValue = parseInt(value, 10);

    if (!parsedValue) {
      const error = new BadRequestException(`${value} ${message}`);
      Logger.error(error);
      throw error;
    }

    return parsedValue;
  };

  return Transform((data) => {
    if (Array.isArray(data.value)) {
      return data.value.map((value) => parseValue(value));
    }

    return parseValue(data.value);
  });
}
