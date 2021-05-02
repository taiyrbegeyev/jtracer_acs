import { createSlice } from '@reduxjs/toolkit';

export const moderatorManagementSlice = createSlice({
  name: 'moderatorManagement',
  initialState: {
    isLoading: false,
    moderators: [],
    error: ''
  },
  reducers: {
    getModeratorsPending: (state) => {
      state.isLoading = true;
    },
    getModeratorsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.moderators = payload;
      state.error = '';
    },
    getModeratorsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const {
  getModeratorsPending,
  getModeratorsSuccess,
  getModeratorsFail
} = moderatorManagementSlice.actions;

export default moderatorManagementSlice.reducer;
