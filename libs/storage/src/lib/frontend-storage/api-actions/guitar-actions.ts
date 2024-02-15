import { AxiosInstance } from 'axios';

import { ApiRoute } from '@guitar-shop/consts';
import { GuitarWithPhoto, Pagination } from '@guitar-shop/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from '../types/app-dispatch.type';
import { State } from '../types/state.type';

export const fetchGuitarsAction = createAsyncThunk<
  Pagination<GuitarWithPhoto>,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/fetchGuitars', async (_arg, { extra: api }) => {
  const { data } = await api.get<Pagination<GuitarWithPhoto>>(ApiRoute.Guitars);

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
>('guitar/deleteGuitarAction', async (id, { extra: api }) => {
  await api.delete(`${ApiRoute.Guitars}/${id}`);
});

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
>('guitar/postGuitar', async (formData, { extra: api }) => {
  const { data } = await api.post<GuitarWithPhoto>(ApiRoute.Guitars, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
});

export const patchGuitarAction = createAsyncThunk<
  GuitarWithPhoto,
  { formData: FormData; id: string },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('guitar/patchGuitar', async ({ formData, id }, { extra: api }) => {
  const apiRoute = `${ApiRoute.Guitars}/${id}`;
  const { data } = await api.patch<GuitarWithPhoto>(apiRoute, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
});
