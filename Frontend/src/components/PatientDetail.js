import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/patients/${id}`);
        setPatient(response.data.patient);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div className="container mt-5"><div className="alert alert-danger">Patient not found</div></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{patient.name}</h2>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Mobile:</strong> {patient.mobile_no}</p>
          <p className="card-text"><strong>Email:</strong> {patient.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3>Appointments</h3>
        <ul className="list-group">
          {appointments.map((appt, index) => (
            <li key={index} className="list-group-item">{appt.notes}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <AppointmentForm patientId={patient.id} />
      </div>
    </div>
  );
};

export default PatientDetail;
