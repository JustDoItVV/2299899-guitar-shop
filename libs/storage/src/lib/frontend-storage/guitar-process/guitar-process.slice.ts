import { GuitarWithPhoto, NameSpace, Pagination } from '@guitar-shop/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGuitarAction, fetchGuitarsAction } from '../api-actions';
import { GuitarProcess } from '../types/guitar-process.type';

const initialState: GuitarProcess = {
  guitars: null,
  guitar: null,
  isLoading: false,
  page: 1,
  query: '',
};

export const guitarProcess = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchGuitarsAction.fulfilled,
        (state, action: PayloadAction<Pagination<GuitarWithPhoto>>) => {
          state.guitars = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchGuitarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchGuitarAction.fulfilled,
        (state, action: PayloadAction<GuitarWithPhoto>) => {
          state.guitar = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchGuitarAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setQuery } = guitarProcess.actions;
