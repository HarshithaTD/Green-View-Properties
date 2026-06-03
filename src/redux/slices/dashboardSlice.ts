import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';



export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetch',
  async () => {
    const [
      statsRes,
      enquiryRes,
    ] = await Promise.all([
      api.get('/dashboard/stats'),
      api.get('/enquiries/recent'),
    ]);

    return {
      stats: statsRes.data,
      enquiries:
        enquiryRes.data?.data || [],
    };
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: {
    stats: {
      totalPlots: 0,
      availablePlots: 0,
      bookedPlots: 0,
      soldPlots: 0,
      totalEnquiries: 0,
      newEnquiries: 0,
    },

    enquiries: [],

    loading: false,
  },

  reducers: {},

  extraReducers: builder => {
    builder.addCase(
      fetchDashboardData.pending,
      state => {
        state.loading = true;
      },
    );

    builder.addCase(
      fetchDashboardData.fulfilled,
      (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats;

        state.enquiries =
          action.payload.enquiries;
      },
    );

    builder.addCase(
      fetchDashboardData.rejected,
      state => {
        state.loading = false;
      },
    );
  },
});

export default dashboardSlice.reducer;
