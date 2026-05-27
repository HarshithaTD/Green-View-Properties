import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  getEnquiriesAPI,
  addEnquiryAPI,
  updateEnquiryStatusAPI,
  deleteEnquiryAPI,
} from '../../services/enquiryService';

// ================= TYPES =================

export interface Enquiry {
  _id: string;

  name: string;

  mobile: string;

  email?: string;

  message?: string;

  plotTitle: string;

  plotLocation: string;

  plotPrice: string;

  status:
    | 'New'
    | 'Contacted'
    | 'Closed';

  createdAt: string;

  updatedAt?: string;

  avatar?: string;
}

interface FetchEnquiryParams {
  search?: string;

  status?: string;
}

interface EnquiryState {
  enquiries: Enquiry[];

  loading: boolean;

  refreshing: boolean;

  error: string | null;
}

// ================= INITIAL STATE =================

const initialState: EnquiryState = {
  enquiries: [],

  loading: false,

  refreshing: false,

  error: null,
};

// ================= FETCH ENQUIRIES =================

export const fetchEnquiries =
  createAsyncThunk(
    'enquiries/fetch',

    async (
      {
        search = '',
        status = 'All',
      }: FetchEnquiryParams,
      thunkAPI,
    ) => {
      try {
        const response =
          await getEnquiriesAPI(
            search,
            status,
          );

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to fetch enquiries',
        );
      }
    },
  );

// ================= CREATE ENQUIRY =================

export const createEnquiry =
  createAsyncThunk(
    'enquiries/create',

    async (
      enquiryData: Omit<
        Enquiry,
        | '_id'
        | 'createdAt'
        | 'updatedAt'
      >,
      thunkAPI,
    ) => {
      try {
        const response =
          await addEnquiryAPI(
            enquiryData,
          );

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to create enquiry',
        );
      }
    },
  );

// ================= UPDATE STATUS =================

export const updateEnquiryStatus =
  createAsyncThunk(
    'enquiries/updateStatus',

    async (
      {
        id,
        status,
      }: {
        id: string;

        status:
          | 'New'
          | 'Contacted'
          | 'Closed';
      },
      thunkAPI,
    ) => {
      try {
        const response =
          await updateEnquiryStatusAPI(
            id,
            status,
          );

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to update enquiry status',
        );
      }
    },
  );

// ================= DELETE ENQUIRY =================

export const deleteEnquiry =
  createAsyncThunk(
    'enquiries/delete',

    async (
      id: string,
      thunkAPI,
    ) => {
      try {
        await deleteEnquiryAPI(id);

        return id;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to delete enquiry',
        );
      }
    },
  );

// ================= SLICE =================

const enquirySlice = createSlice({
  name: 'enquiries',

  initialState,

  reducers: {
    clearEnquiryError: state => {
      state.error = null;
    },

    setRefreshing: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.refreshing =
        action.payload;
    },
  },

  extraReducers: builder => {
    // ================= FETCH =================

    builder.addCase(
      fetchEnquiries.pending,
      state => {
        state.loading = true;

        state.error = null;
      },
    );

    builder.addCase(
      fetchEnquiries.fulfilled,
      (
        state,
        action: PayloadAction<
          Enquiry[]
        >,
      ) => {
        state.loading = false;

        state.refreshing = false;

        state.enquiries =
          action.payload;
      },
    );

    builder.addCase(
      fetchEnquiries.rejected,
      (state, action: any) => {
        state.loading = false;

        state.refreshing = false;

        state.error =
          action.payload;
      },
    );

    // ================= CREATE =================

    builder.addCase(
      createEnquiry.pending,
      state => {
        state.loading = true;
      },
    );

    builder.addCase(
      createEnquiry.fulfilled,
      (
        state,
        action: PayloadAction<Enquiry>,
      ) => {
        state.loading = false;

        state.enquiries.unshift(
          action.payload,
        );
      },
    );

    builder.addCase(
      createEnquiry.rejected,
      (state, action: any) => {
        state.loading = false;

        state.error =
          action.payload;
      },
    );

    // ================= UPDATE STATUS =================

    builder.addCase(
      updateEnquiryStatus.fulfilled,
      (
        state,
        action: PayloadAction<Enquiry>,
      ) => {
        const index =
          state.enquiries.findIndex(
            enquiry =>
              enquiry._id ===
              action.payload._id,
          );

        if (index !== -1) {
          state.enquiries[index] =
            action.payload;
        }
      },
    );

    // ================= DELETE =================

    builder.addCase(
      deleteEnquiry.fulfilled,
      (
        state,
        action: PayloadAction<string>,
      ) => {
        state.enquiries =
          state.enquiries.filter(
            enquiry =>
              enquiry._id !==
              action.payload,
          );
      },
    );
  },
});

// ================= EXPORTS =================

export const {
  clearEnquiryError,
  setRefreshing,
} = enquirySlice.actions;

export default enquirySlice.reducer;
