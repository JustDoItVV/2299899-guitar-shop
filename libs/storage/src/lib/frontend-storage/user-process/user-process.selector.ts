import { AuthStatus, NameSpace, User } from '@guitar-shop/types';

import { State } from '../types/state.type';

export const selectAuthStatus = (
  state: Pick<State, NameSpace.User>
): AuthStatus => state[NameSpace.User].authStatus;
export const selectUser = (state: Pick<State, NameSpace.User>): User | null =>
  state[NameSpace.User].user;
