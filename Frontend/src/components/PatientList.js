// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const PatientList = () => {
//   const [patients, setPatients] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/patients/', {
//           params: { name: search }
//         });
//         setPatients(response.data);  
//       } catch (error) {
//         console.error('Error fetching patients:', error);
//       }
//     };

//     fetchPatients();
//   }, [search]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <ul>
//         {patients.map(patient => (
//           <li key={patient.id}>
//             <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PatientList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/patients/', {
          params: { name: search }
        });
        setPatients(response.data);  
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [search]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Patient List</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ul className="list-group">
                {patients.map(patient => (
                  <li key={patient.id} className="list-group-item">
                    <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
