import authSlice from 'reducers/auth_slice';
import drawerSlice from 'reducers/drawer_slice';
import locationSlice from 'reducers/location_slice';
import moderatorSlice from 'reducers/moderator_slice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth: authSlice,
    drawer: drawerSlice,
    location: locationSlice,
    moderator: moderatorSlice
  }
});
