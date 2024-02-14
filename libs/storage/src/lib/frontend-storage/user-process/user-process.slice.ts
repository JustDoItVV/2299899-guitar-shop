import { AuthStatus, NameSpace, User } from '@guitar-shop/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { checkAuthAction, loginAction } from '../api-actions/user-actions';
import { UserProcess } from '../types/user-process.type';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});

export const { setUser } = userProcess.actions;
