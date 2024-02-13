import { TokenPayload, User } from '@guitar-shop/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
