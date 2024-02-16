import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ValidationArguments } from 'class-validator';

import { UserErrorMessage } from '@guitar-shop/consts';
import { BadRequestException, Logger } from '@nestjs/common';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = {
  value: number;
  unit: DateTimeUnit;
};

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN`);
  }

  return { value, unit };
}

export function getTokenNotExistErrorMessage(tokenId: string): string {
  return `${tokenId}: ${UserErrorMessage.TokenNotExist}`;
}

export function getUserAlreadyExist(email: string): string {
  return `${email}: ${UserErrorMessage.UserExists}`;
}

export function getValidationErrorMessageWithLogging(
  message: string
): (args: ValidationArguments) => string {
  return (args: ValidationArguments) => {
    const exception = new BadRequestException(`${args.value}: ${message}`);
    Logger.error(exception);
    return message;
  };
}
