import { configureStore } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import timerReducer from '../features/timer/timerSlice';
export default configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    timer: timerReducer,
  },
});
