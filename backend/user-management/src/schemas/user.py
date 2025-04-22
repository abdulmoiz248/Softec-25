from pydantic import BaseModel, EmailStr
from typing import Optional
from models.user import UserRole

class UserRead(BaseModel):
    id: int
    email: EmailStr
    role: UserRole
    is_verified: bool

    class Config:
        from_attributes = True

class PatientRead(UserRead):
    full_name: Optional[str]
    age: Optional[int]
    gender: Optional[str]
    blood_type: Optional[str]

class DoctorRead(UserRead):
    specialization: Optional[str]
    license_no: Optional[str]
    is_approved: bool