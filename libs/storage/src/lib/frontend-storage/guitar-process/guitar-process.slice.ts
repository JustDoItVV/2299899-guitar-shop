import { Guitar, NameSpace, Pagination } from '@guitar-shop/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGuitarsAction } from '../api-actions';
import { GuitarProcess } from '../types/guitar-process.type';

const initialState: GuitarProcess = {
  guitars: null,
  isLoading: false,
};

export const guitarProcess = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchGuitarsAction.fulfilled,
        (state, action: PayloadAction<Pagination<Guitar>>) => {
          state.isLoading = false;
          state.guitars = action.payload;
        }
      )
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { } = userProcess.actions;
