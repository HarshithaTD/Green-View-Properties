import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  addPlotAPI,
  getPlotsAPI,
  deletePlotAPI,
  updatePlotAPI,
  updatePlotStatusAPI,
  getSinglePlotAPI,
} from '../../services/plotService';

/* ================================
   TYPES
================================ */

export interface Plot {
  _id?: string;

  title: string;

  location: string;

  sector: string;

  size: string;

  price: string;

  status:
    | 'Available'
    | 'Booked'
    | 'Sold';

  image?: string;
}

interface PlotState {
  plots: Plot[];

  singlePlot: Plot | null;

  loading: boolean;

  error: string | null;
}

/* ================================
   INITIAL STATE
================================ */

const initialState: PlotState = {
  plots: [],

  singlePlot: null,

  loading: false,

  error: null,
};

/* ================================
   FETCH ALL PLOTS
================================ */

export const fetchPlots =
  createAsyncThunk<
    Plot[],
    void,
    { rejectValue: string }
  >(
    'plots/fetch',
    async (_, thunkAPI) => {
      try {
        const response =
          await getPlotsAPI();

        console.log(
          'PLOTS RESPONSE:',
          response,
        );

        return response.plots;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to fetch plots',
        );
      }
    },
  );

/* ================================
   FETCH SINGLE PLOT
================================ */

export const fetchSinglePlot =
  createAsyncThunk<
    Plot,
    string,
    { rejectValue: string }
  >(
    'plots/fetchSingle',
    async (id, thunkAPI) => {
      try {
        const response =
          await getSinglePlotAPI(
            id,
          );

        return response.plot;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to fetch plot',
        );
      }
    },
  );

/* ================================
   ADD PLOT
================================ */

export const addPlot =
  createAsyncThunk<
    Plot,
    FormData,
    { rejectValue: string }
  >(
    'plots/add',
    async (data, thunkAPI) => {
      try {
        const response =
          await addPlotAPI(data);

        return response.plot;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to add plot',
        );
      }
    },
  );

/* ================================
   UPDATE PLOT
================================ */

export const updatePlot =
  createAsyncThunk<
    Plot,
    {
      id: string;

      data: Partial<Plot>;
    },
    { rejectValue: string }
  >(
    'plots/update',
    async (
      { id, data },
      thunkAPI,
    ) => {
      try {
        const response =
          await updatePlotAPI(
            id,
            data as any,
          );

        return response.plot;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to update plot',
        );
      }
    },
  );

/* ================================
   UPDATE STATUS
================================ */

export const updatePlotStatus =
  createAsyncThunk<
    Plot,
    {
      id: string;

      status:
        | 'Available'
        | 'Booked'
        | 'Sold';
    },
    { rejectValue: string }
  >(
    'plots/updateStatus',
    async (
      { id, status },
      thunkAPI,
    ) => {
      try {
        const response =
          await updatePlotStatusAPI(
            id,
            status,
          );

        return response.plot;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to update status',
        );
      }
    },
  );

/* ================================
   DELETE PLOT
================================ */

export const deletePlot =
  createAsyncThunk<
    string,
    string,
    { rejectValue: string }
  >(
    'plots/delete',
    async (id, thunkAPI) => {
      try {
        await deletePlotAPI(id);

        return id;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            'Failed to delete plot',
        );
      }
    },
  );

/* ================================
   SLICE
================================ */

const plotSlice = createSlice({
  name: 'plots',

  initialState,

  reducers: {
    clearSinglePlot: state => {
      state.singlePlot = null;
    },
  },

  extraReducers: builder => {
    builder

      /* FETCH ALL */

      .addCase(
        fetchPlots.pending,
        state => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        fetchPlots.fulfilled,
        (
          state,
          action: PayloadAction<
            Plot[]
          >,
        ) => {
          state.loading = false;

          state.plots =
            action.payload;
        },
      )

      .addCase(
        fetchPlots.rejected,
        (
          state,
          action,
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            'Something went wrong';
        },
      )

      /* FETCH SINGLE */

      .addCase(
        fetchSinglePlot.fulfilled,
        (
          state,
          action: PayloadAction<Plot>,
        ) => {
          state.singlePlot =
            action.payload;
        },
      )

      /* ADD */

      .addCase(
        addPlot.fulfilled,
        (
          state,
          action: PayloadAction<Plot>,
        ) => {
          state.plots.unshift(
            action.payload,
          );
        },
      )

      /* UPDATE */

      .addCase(
        updatePlot.fulfilled,
        (
          state,
          action: PayloadAction<Plot>,
        ) => {
          const index =
            state.plots.findIndex(
              item =>
                item._id ===
                action.payload._id,
            );

          if (index !== -1) {
            state.plots[index] =
              action.payload;
          }
        },
      )

      /* UPDATE STATUS */

      .addCase(
        updatePlotStatus.fulfilled,
        (
          state,
          action: PayloadAction<Plot>,
        ) => {
          const index =
            state.plots.findIndex(
              item =>
                item._id ===
                action.payload._id,
            );

          if (index !== -1) {
            state.plots[index] =
              action.payload;
          }
        },
      )

      /* DELETE */

      .addCase(
        deletePlot.fulfilled,
        (
          state,
          action: PayloadAction<string>,
        ) => {
          state.plots =
            state.plots.filter(
              item =>
                item._id !==
                action.payload,
            );
        },
      );
  },
});

export const {
  clearSinglePlot,
} = plotSlice.actions;

export default plotSlice.reducer;
