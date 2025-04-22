from pydantic import BaseModel, EmailStr, constr
from models.user import UserRole
from typing import Literal, Optional, Annotated

class SignupBase(BaseModel):
    email: EmailStr
    password: Annotated[str, constr(min_length=8)]
    role: Literal['patient', 'doctor']
    full_name: str
    #Optional - only for doctor
    specialization: Optional[str]
    license_no: Optional[str]
    age: Optional[str]
    gender: Optional[str]
    blood_type: Optional[str]

class Login(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    sub: str
    role: UserRole

class ResetPasswordRequest(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    token: str
    new_password: Annotated[str, constr(min_length=8)]