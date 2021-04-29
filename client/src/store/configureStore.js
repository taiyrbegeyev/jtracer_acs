import drawerSlice from 'reducers/drawer_slice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    drawer: drawerSlice
  }
});
