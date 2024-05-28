import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
  
        <h1 className='text-center'> Welcome to bookmyAppointment</h1>

        
        <div className="container">
        <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/add-patient" element={<PatientForm />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
        </Routes>
        </div>

  
      </Router>
    </Provider>
  );
};

export default App;
