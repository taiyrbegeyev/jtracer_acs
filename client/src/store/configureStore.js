import drawerSlice from 'reducers/drawerSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    drawer: drawerSlice
  }
});
