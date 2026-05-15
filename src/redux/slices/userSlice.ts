// src/redux/slices/userSlice.ts

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface User {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<User>,
    ) => {
      state.user = action.payload;
    },

    logout: state => {
      state.user =  state.user;
    },
  },
});

export const {
  updateProfile
} = userSlice.actions;

export default userSlice.reducer;