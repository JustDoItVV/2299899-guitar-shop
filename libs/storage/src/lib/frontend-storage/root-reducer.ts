import { NameSpace } from '@guitar-shop/types';
import { combineReducers } from '@reduxjs/toolkit';

import { userProcess } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
});
