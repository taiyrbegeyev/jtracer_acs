import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    isLoading: false,
    locations: [],
    error: ''
  },
  reducers: {
    getLocationsPending: (state) => {
      state.isLoading = true;
    },
    getLocationsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.locations = payload;
      state.error = '';
    },
    getLocationsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const {
  getLocationsPending,
  getLocationsSuccess,
  getLocationsFail
} = locationSlice.actions;

export default locationSlice.reducer;
