import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GuitarDataTrasformationPipe implements PipeTransform<Record<string, string>, Record<string, unknown>> {
  transform(value: Record<string, string>): Record<string, unknown> {
    const guitarStrings = parseInt(value.guitarStrings, 10);
    const price = parseInt(value.price, 10);

    if (!guitarStrings) {
      throw new BadRequestException('GuitarStrings must be an integer');
    }

    if (!price) {
      throw new BadRequestException('Price must be an integer');
    }

    return { ...value, guitarStrings, price };
  }
}
