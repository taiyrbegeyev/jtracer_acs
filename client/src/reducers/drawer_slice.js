import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    selectedIndex: 0
  },
  reducers: {
    handleSelectedIndex(state, action) {
      return {
        ...state,
        selectedIndex: action.payload
      };
    }
  }
});

export const { handleSelectedIndex } = drawerSlice.actions;

export default drawerSlice.reducer;
