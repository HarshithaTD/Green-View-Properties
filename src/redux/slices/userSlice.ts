// src/redux/slices/userSlice.ts

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface User {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface UserState {
  user: User | null;
  token: string | null;   // <-- Add this
}

const initialState: UserState = {
  user: null,
  token: null,            // <-- Add this
};

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>,
    ) => {
      state.user =
        action.payload.user;

      state.token =
        action.payload.token;
    },

    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  updateProfile,
  logout,
} = userSlice.actions;

export default userSlice.reducer;