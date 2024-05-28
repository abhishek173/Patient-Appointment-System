import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentForm = ({ patientId }) => {
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/appointments/', {
        notes,
        patient_id: patientId,
      });
      setNotes('');
      setMessage('Appointment created successfully!');
      // Redirect to the checkout session URL
      window.location.href = 'http://localhost:8000/create-checkout-session';
    } catch (error) {
      setMessage(`Error creating appointment: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="mt-4">
      {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="notes">Add Appointment</label>
          <textarea
            id="notes"
            className="form-control"
            placeholder="Enter appointment notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;