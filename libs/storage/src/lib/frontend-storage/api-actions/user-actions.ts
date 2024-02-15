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
import { setResponseError } from '../user-process/user-process.slice';

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
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    const apiRoute = `${ApiRoute.User}${ApiRoute.Login}`;
    try {
      const res = await api.post<UserWithToken>(apiRoute, {
        email,
        password,
      });
      const { data } = res;

      saveToken(data.accessToken);
      dispatch(setResponseError(null));
      dispatch(redirectToRoute(AppRoute.Catalog));
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      dispatch(setResponseError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAction = createAsyncThunk<
  User,
  RegisterData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/register',
  async (
    { name, email, password },
    { dispatch, extra: api, rejectWithValue }
  ) => {
    const apiRoute = `${ApiRoute.User}${ApiRoute.Register}`;
    try {
      const { data } = await api.post<User>(apiRoute, {
        name,
        email,
        password,
      });
      dispatch(setResponseError(null));
      dispatch(redirectToRoute(AppRoute.Login));
      toast(
        `Registration successful! Email was sent to ${email}. Please login!`
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      dispatch(setResponseError(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
