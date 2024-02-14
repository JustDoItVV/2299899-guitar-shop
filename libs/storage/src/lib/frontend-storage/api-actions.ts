import { AxiosInstance } from 'axios';

import { ApiRoute } from '@guitar-shop/consts';
import { User } from '@guitar-shop/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from './types/app-dispatch.type';
import { State } from './types/state.type';

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<User>(ApiRoute.UserCheck);
  return data;
});
