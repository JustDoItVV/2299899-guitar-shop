import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { ApiRoute } from '@guitar-shop/consts';
import { saveToken } from '@guitar-shop/services';
import {
  AppRoute,
  AuthData,
  RegisterData,
  User,
  UserWithToken,
} from '@guitar-shop/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { redirectToRoute } from '../actions/common';
import { AppDispatch } from '../types/app-dispatch.type';
import { State } from '../types/state.type';

export const checkAuthAction = createAsyncThunk<
  UserWithToken,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const apiRoute = `${ApiRoute.User}${ApiRoute.Check}`;
  const { data } = await api.post<UserWithToken>(apiRoute);
  return data;
});

export const loginAction = createAsyncThunk<
  UserWithToken,
  AuthData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const apiRoute = `${ApiRoute.User}${ApiRoute.Login}`;
  const { data } = await api.post<UserWithToken>(apiRoute, {
    email,
    password,
  });
  saveToken(data.accessToken);
  dispatch(redirectToRoute(AppRoute.Catalog));
  return data;
});

export const registerAction = createAsyncThunk<
  User,
  RegisterData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/register',
  async ({ name, email, password }, { dispatch, extra: api }) => {
    const apiRoute = `${ApiRoute.User}${ApiRoute.Register}`;
    const { data } = await api.post<User>(apiRoute, {
      name,
      email,
      password,
    });
    dispatch(redirectToRoute(AppRoute.Login));
    toast(`Registration successful! Email was sent to ${email}. Please login!`);
    return data;
  }
);
