import { createSlice } from '@reduxjs/toolkit';

export const moderatorSlice = createSlice({
  name: 'moderator',
  initialState: {
    moderator: {},
    isLoading: false,
    error: ''
  },
  reducers: {
    getModeratorPending: (state) => {
      state.isLoading = true;
    },
    getModeratorSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.moderator = payload;
      state.error = '';
    },
    getModeratorFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const {
  getModeratorPending,
  getModeratorSuccess,
  getModeratorFail
} = moderatorSlice.actions;

export default moderatorSlice.reducer;
