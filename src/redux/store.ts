// src/redux/store.ts

import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import favoriteReducer from './slices/favoriteSlice';
import plotReducer from './slices/plotSlice';
import dashboardReducer from './slices/dashboardSlice';
import enquiryReducer from './slices/enquirySlice'
import { apiSlice } from '../services/apiSlice';
import { bookingApi } from '../services/bookingApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoriteReducer,
    plots: plotReducer,
     dashboard: dashboardReducer,
     enquiries: enquiryReducer,
     [apiSlice.reducerPath]: apiSlice.reducer,

      [bookingApi.reducerPath]:
      bookingApi.reducer,
  },

    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
       bookingApi.middleware,
    ),
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;