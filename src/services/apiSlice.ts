import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {API_BASE_URL} from './apiConfig';

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),

  tagTypes: ['Cart'],

  endpoints: () => ({}),
});