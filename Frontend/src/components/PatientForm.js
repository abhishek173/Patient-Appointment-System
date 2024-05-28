import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      mobile_no: mobile.trim(),
    };
    console.log('Sending payload:', payload);
    try {
      const response = await axios.post('http://localhost:8000/patients/', payload);
      console.log('Patient created:', response.data);
      setName('');
      setMobile('');
      setEmail('');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error creating patient:', error.response.data);
      } else if (error.request) {
        // No response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            pattern="\d{10}"
            title="Mobile number should be 10 digits"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
