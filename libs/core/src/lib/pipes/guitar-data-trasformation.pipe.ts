import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GuitarDataTrasformationPipe
  implements PipeTransform<Record<string, string>, Record<string, unknown>>
{
  transform(value: Record<string, string>): Record<string, unknown> {
    const guitarStrings = parseInt(value.guitarStrings, 10);
    const price = parseInt(value.price, 10);

    return {
      ...value,
      guitarStrings: guitarStrings ? guitarStrings : value.guitarStrings,
      price: price ? price : value.price,
    };
  }
}
