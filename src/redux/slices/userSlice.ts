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
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

type UpdateProfilePayload =
  | User
  | {
      user: User;
      token?: string;
    };

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<UpdateProfilePayload>,
    ) => {
      if ('user' in action.payload) {
        state.user =
          action.payload.user;

        state.token =
          action.payload.token || null;

        return;
      }

      state.user =
        action.payload;
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
