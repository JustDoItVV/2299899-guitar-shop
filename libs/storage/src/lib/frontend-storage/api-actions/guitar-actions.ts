import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { ApiRoute } from '@guitar-shop/consts';
import {
  AppRoute,
  GuitarWithPhoto,
  NameSpace,
  Pagination,
} from '@guitar-shop/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { redirectToRoute } from '../actions/redirect-to-route';
import { AppDispatch } from '../types/app-dispatch.type';
import { State } from '../types/state.type';

export const fetchGuitarsAction = createAsyncThunk<
  Pagination<GuitarWithPhoto>,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/fetchGuitars', async (queryString, { extra: api }) => {
  const apiRoute = `${ApiRoute.Guitars}${queryString}`;
  const { data } = await api.get<Pagination<GuitarWithPhoto>>(apiRoute);

  const guitars = await Promise.all(
    data.entities.map(async (guitar) => {
      const { data } = await api.get<string>(
        `${ApiRoute.Guitars}/${guitar.id}${ApiRoute.GuitarPhoto}`
      );
      guitar.photoUrl = data;
      return guitar;
    })
  );

  data.entities = guitars;
  return data;
});

export const fetchGuitarPhotoAction = createAsyncThunk<
  string,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/fetchGuitarPhoto', async (id, { extra: api }) => {
  const { data } = await api.get<string>(
    `${ApiRoute.Guitars}/${id}${ApiRoute.GuitarPhoto}`
  );
  return data;
});

export const deleteGuitarAction = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'guitar/deleteGuitarAction',
  async (id, { dispatch, getState, extra: api }) => {
    await api.delete(`${ApiRoute.Guitars}/${id}`);
    dispatch(fetchGuitarsAction(getState()[NameSpace.Guitar].query));
  }
);

export const fetchGuitarAction = createAsyncThunk<
  GuitarWithPhoto,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/fetchGuitar', async (id, { extra: api }) => {
  const { data } = await api.get<GuitarWithPhoto>(`${ApiRoute.Guitars}/${id}`);
  const { data: photoUrl } = await api.get<string>(
    `${ApiRoute.Guitars}/${id}${ApiRoute.GuitarPhoto}`
  );

  data.photoUrl = photoUrl;
  return data;
});

export const postGuitarAction = createAsyncThunk<
  GuitarWithPhoto,
  FormData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/postGuitar', async (formData, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<GuitarWithPhoto>(
      ApiRoute.Guitars,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    dispatch(redirectToRoute(AppRoute.Catalog));
    return data;
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      error.response.data.message.map((message: string) => toast(message));
    } else {
      toast(error.response.data.message);
    }
  }
});

export const patchGuitarAction = createAsyncThunk<
  GuitarWithPhoto,
  { formData: FormData; id: string },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/patchGuitar', async ({ formData, id }, { dispatch, extra: api }) => {
  const apiRoute = `${ApiRoute.Guitars}/${id}`;
  try {
    const { data } = await api.patch<GuitarWithPhoto>(apiRoute, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(redirectToRoute(AppRoute.Catalog));
    return data;
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      error.response.data.message.map((message: string) => toast(message));
    } else {
      toast(error.response.data.message);
    }
  }
});
