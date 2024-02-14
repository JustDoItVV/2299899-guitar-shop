import { Guitar, NameSpace, Pagination } from '@guitar-shop/types';

import { State } from '../types/state.type';

export const selectGuitars = (
  state: Pick<State, NameSpace.Guitar>
): Pagination<Guitar> => state[NameSpace.Guitar].guitars;
export const selectIsLoading = (state: Pick<State, NameSpace.Guitar>) =>
  state[NameSpace.Guitar].isLoading;
