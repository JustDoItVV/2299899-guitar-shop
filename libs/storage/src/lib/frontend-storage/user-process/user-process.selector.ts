import { AuthStatus, NameSpace, User } from '@guitar-shop/types';

import { State } from '../types/state.type';
import { ResponseError } from '../types/user-process.type';

export const selectAuthStatus = (
  state: Pick<State, NameSpace.User>
): AuthStatus => state[NameSpace.User].authStatus;
export const selectUser = (state: Pick<State, NameSpace.User>): User | null =>
  state[NameSpace.User].user;
export const selectResponseError = (
  state: Pick<State, NameSpace.User>
): ResponseError | null => state[NameSpace.User].responseError;
