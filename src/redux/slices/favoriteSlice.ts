import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FavoriteState {
  favoritePlots: any[];
}

const initialState: FavoriteState = {
  favoritePlots: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',

  initialState,

  reducers: {
    addToFavorite: (
      state,
      action: PayloadAction<any>,
    ) => {
      const exists =
        state.favoritePlots.find(
          item =>
            (item._id || item.id) ===
            (action.payload._id ||
              action.payload.id),
        );

      if (!exists) {
        state.favoritePlots.push(
          action.payload,
        );
      }
    },

    removeFromFavorite: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.favoritePlots =
        state.favoritePlots.filter(
          item =>
            (item._id || item.id) !==
            action.payload,
        );
    },
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
