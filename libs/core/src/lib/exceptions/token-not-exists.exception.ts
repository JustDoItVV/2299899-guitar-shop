import { UnauthorizedException } from "@nestjs/common";

export class TokenNotExistsException extends UnauthorizedException {
  constructor(id: string) {
    super(`${id}: token with this id doen't exist`);
  }
}
