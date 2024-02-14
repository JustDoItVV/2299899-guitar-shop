import { AxiosInstance } from 'axios';

import { ApiRoute } from '@guitar-shop/consts';
import { Guitar, Pagination } from '@guitar-shop/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from '../types/app-dispatch.type';
import { State } from '../types/state.type';

export const fetchGuitarsAction = createAsyncThunk<
  Pagination<Guitar>,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/fetchGuitars', async (_arg, { extra: api }) => {
  const { data } = await api.get<Pagination<Guitar>>(ApiRoute.Guitars);
  return data;
});
