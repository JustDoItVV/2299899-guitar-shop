import { AppRoute } from '@guitar-shop/types';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
