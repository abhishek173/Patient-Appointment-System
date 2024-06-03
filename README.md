# Patient-Appointment-System
A system where patients can be added and appointments can be scheduled with notes.

- **TechStack**
    - Frontend: React
    - Backend: FastAPI
    - Database: SQlite
    - Payment: Stripe

- **Functionality**
    - **Create Patient:** User should be able to create a patient with basic info like name, mobile no, email etc.
    - **List Patients:** User should see a dashboard with the list of patients.
    - **Search Functionality**: The dashboard should be searchable by patient name
    - **View Patient:** Patient detail view for each patient
    - **Create appointment:**  User should be able to create appointments for a patient.
    - **Stripe Integration:** A payment link should be generated for each appointment.

# steps to setup Backend Application
1) install Python latest version
2) Move to Backend directory
  $ cd Backend
3) Run the below command to install all the package required for to run the application
  $ pip install requirements.txt
4) Run the below command to start the Application
  $ uvicorn main:app --reload
-> Application will start running on port "http://localhost:8000"

# Steps to setup Frontend Application
1) Install node latest version
2) Move to Frontend directory
   $ cd Frontend
3) Run the below command to All the dependent packages
   $ npm install
4) Run the below command to start the Application
   $ npm start
  -> Application will start running on port "http://localhost:3000"
