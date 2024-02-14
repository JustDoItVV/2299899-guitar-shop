import { AuthStatus, User } from '@guitar-shop/types';

export type UserProcess = {
  authStatus: AuthStatus;
  user: User | null;
};
