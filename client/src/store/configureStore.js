import authSlice from 'reducers/auth_slice';
import drawerSlice from 'reducers/drawer_slice';
import eventSlice from 'reducers/event_slice';
import moderatorSlice from 'reducers/moderator_slice';
import moderatorManagementSlice from 'reducers/moderator_management_slice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth: authSlice,
    drawer: drawerSlice,
    event: eventSlice,
    moderator: moderatorSlice,
    moderatorManagement: moderatorManagementSlice
  }
});
