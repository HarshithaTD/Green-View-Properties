import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from './apiConfig';

export const bookingApi =
  createApi({
    reducerPath: 'bookingApi',

    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL,

      prepareHeaders: async headers => {
        const token =
          await AsyncStorage.getItem(
            'token',
          );

        if (token) {
          headers.set(
            'Authorization',
            `Bearer ${token}`,
          );
        }

        return headers;
      },
    }),

    endpoints: builder => ({
      getBookingSummary:
        builder.query({
          query: bookingId =>
            `/booking/${bookingId}`,
        }),
    }),
  });

export const {
  useGetBookingSummaryQuery,
} = bookingApi;