import { GuitarWithPhoto, NameSpace, Pagination } from '@guitar-shop/types';

import { State } from '../types/state.type';

export const selectGuitars = (
  state: Pick<State, NameSpace.Guitar>
): Pagination<GuitarWithPhoto> => state[NameSpace.Guitar].guitars;
export const selectGuitar = (state: Pick<State, NameSpace.Guitar>) =>
  state[NameSpace.Guitar].guitar;
export const selectIsLoading = (state: Pick<State, NameSpace.Guitar>) =>
  state[NameSpace.Guitar].isLoading;
export const selectPage = (state: Pick<State, NameSpace.Guitar>) =>
  state[NameSpace.Guitar].page;
export const selectQuery = (state: Pick<State, NameSpace.Guitar>) =>
  state[NameSpace.Guitar].query;
