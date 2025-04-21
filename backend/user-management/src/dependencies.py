from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError

from .db.session import SessionLocal
from .core.security import decode_access_token
from .models.user import User
from typing import List

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW_Authenticate": "Bearer"}
    )
    try:
        payload = decode_access_token(token)
        email : str = payload.get("sub")
        role = payload.get("role")
        if email is None or role is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise credentials_exception
    return user

def require_role(allowed_roles : List[str]):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role.value not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access forbidden")
        return current_user
    return role_checker

def require_approved_doctor(
    current_user: User = Depends(require_role(["doctor"])),
    db:Session = Depends(get_db)
):
    if not current_user.doctor or not current_user.doctor.is_approved:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Doctor not approved yet")
    return current_user
