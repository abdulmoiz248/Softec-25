from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from schemas import auth as auth_schemas, user as user_schemas
from models.user import User, UserRole
from models.patient import Patient
from models.doctor import Doctor
from typing import List
from core.security import hash_password, verify_password, create_access_token
from dependencies import get_db
from fastapi import Response

router = APIRouter()

@router.post("/signup", response_model=user_schemas.UserRead)
def signup(data: auth_schemas.SignupBase, db:Session = Depends(get_db)):
    # Check email
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    #Create user
    user = User(
        email = data.email,
        password_hash=hash_password(data.password),
        role=UserRole(data.role)
    )
    db.add(user)
    db.flush() # get user.id

    if user.role == UserRole.patient:
        patient = Patient(user_id=user.id, full_name=data.full_name, age=data.age, gender=data.gender, blood_type=data.blood_type or "")
        db.add(patient)
    else:
        doctor = Doctor(
            user_id=user.id,
            full_name = data.full_name,
            specialization=data.specialization,
            license_no=data.license_no or "",
            is_approved=False
        )
        db.add(doctor)
    
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=auth_schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": user.email, "role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout", status_code=204)
def logout(response: Response):
    """
    A no-op logout endpoint: client should simply drop its token.
    Returns 204 No Content.
    """
    return Response(status_code=204)

@router.get("/doctors", response_model=List[user_schemas.DoctorRead])
def list_doctors(db: Session = Depends(get_db)):
    docs = db.query(Doctor).all()
    # we assume Doctor.user relationship exists
    return [
        user_schemas.DoctorRead(
            id=doc.user.id,
            email=doc.user.email,
            role=doc.user.role,
            is_verified=doc.user.is_verified,
            specialization=doc.specialization,
            license_no=doc.license_no,
            is_approved=doc.is_approved
        )
        for doc in docs
    ]