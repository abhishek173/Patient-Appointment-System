from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import relationship, sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse,HTMLResponse
import stripe


app = FastAPI()

stripe.api_key = 'sk_test_51PKniQSDYrtUW3Cb04grYigV4YLjQCcoIiCTfj7CUlQ9qG5NFc6wxNPhRHX8ZVTPEuaG9CXcRjTXB42GtP5aHWaX00wOyB1Y0m'


@app.get("/create-checkout-session")
async def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            billing_address_collection = 'auto',
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {

                        'name': 'Booking charge',
                    },
                    'unit_amount': 2000,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:8000/cancel',
        )
        return RedirectResponse(session.url, status_code=303)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/success")
async def success(session_id: str):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return HTMLResponse(content=f"<html><body><h1>Payment successful!</h1><p>Session ID: {session.id}</p></body></html>")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/cancel")
async def cancel():
    return HTMLResponse(content="<html><body><h1>Payment canceled!</h1><p>You have canceled the payment process.</p></body></html>")



origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)


# Database setup
Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    mobile_no = Column(String, unique=True, index=True)

    appointments = relationship("Appointment", back_populates="patient")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    notes = Column(String, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))

    patient = relationship("Patient", back_populates="appointments")

engine = create_engine(
    "sqlite:///./test.db", connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def index():
    return {"title":"Welcome to bookmyAppointment"}

class PatientCreate(BaseModel):
    name: str
    email: EmailStr
    mobile_no: str

# CRUD operations for patients and appointments\
@app.post("/patients/")
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = Patient(name=patient.name, email=patient.email, mobile_no=patient.mobile_no)
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.get("/patients/")
def read_patients(name: Optional[str] = None, db: Session = Depends(get_db)):
    if name:
        patients = db.query(Patient).filter(Patient.name.contains(name)).all()
    else:
        patients = db.query(Patient).all()
    return patients

@app.get("/patients/{patient_id}")
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).get(patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    appointments = db.query(Appointment).filter(Appointment.patient_id == patient_id).all()
    return {"patient": patient, "appointments": appointments}



class AppointmentCreate(BaseModel):
    notes: str
    patient_id: int



@app.post("/appointments/")
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(notes=appointment.notes, patient_id=appointment.patient_id)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

