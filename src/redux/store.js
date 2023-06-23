import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './features/teamSlice';
import usersReducer  from './features/usersSlice'

const store = configureStore({
  reducer: {
    team: teamReducer,
    users:usersReducer
  },
});

export default store;
