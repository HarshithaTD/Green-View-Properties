// redux/slices/userEnquirySlice.ts

import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { getUserEnquiriesAPI } from '../../services/enquiryService';

import { UserEnquiry } from '../../types/userEnquiryTypes';

interface State {
  enquiries: UserEnquiry[];

  loading: boolean;

  count: number;

  error: string | null;
}

const initialState: State = {
  enquiries: [],

  loading: false,

  count: 0,

  error: null,
};

export const fetchUserEnquiries =
  createAsyncThunk(
    'userEnquiries/fetch',

    async (
      userId: string,
      thunkAPI,
    ) => {
      try {
        return await getUserEnquiriesAPI(
          userId,
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message,
        );
      }
    },
  );

const userEnquirySlice =
  createSlice({
    name: 'userEnquiries',

    initialState,

    reducers: {},

    extraReducers: builder => {
      builder.addCase(
        fetchUserEnquiries.pending,
        state => {
          state.loading = true;
        },
      );

      builder.addCase(
        fetchUserEnquiries.fulfilled,
        (
          state,
          action: any,
        ) => {
          state.loading = false;

          state.enquiries =
            action.payload
              .enquiries || [];

          state.count =
            action.payload
              .count || 0;
        },
      );

      builder.addCase(
        fetchUserEnquiries.rejected,
        (
          state,
          action: any,
        ) => {
          state.loading = false;

          state.error =
            action.payload;
        },
      );
    },
  });

export default userEnquirySlice.reducer;