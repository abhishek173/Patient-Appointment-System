import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    addAppointment: (state, action) => {
      const { patientId, appointment } = action.payload;
      const patient = state.patients.find(p => p.id === patientId);
      if (patient) {
        if (!patient.appointments) {
          patient.appointments = [];
        }
        patient.appointments.push(appointment);
      }
    },
  },
});

export const { addPatient, addAppointment } = patientsSlice.actions;

export default patientsSlice.reducer;
