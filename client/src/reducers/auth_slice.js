import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isAuth: false,
    error: ''
  },
  reducers: {
    signInPending: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
    },
    signInFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const { signInPending, signInSuccess, signInFail } = authSlice.actions;

export default authSlice.reducer;
