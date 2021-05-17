import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    isLoading: false,
    events: [],
    error: ''
  },
  reducers: {
    getEventsPending: (state) => {
      state.isLoading = true;
    },
    getEventsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.events = payload;
      state.error = '';
    },
    getEventsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const {
  getEventsPending,
  getEventsSuccess,
  getEventsFail
} = eventSlice.actions;

export default eventSlice.reducer;
