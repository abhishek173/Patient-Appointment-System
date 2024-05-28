import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '../features/patients/patientsSlice';

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});
