from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt
from .config import settings
from typing import Optional, Dict, Any

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = 'auto')

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hash: str) -> bool:
    return pwd_context.verify(plain, hash)

def create_access_token(data: dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt

def decode_jwt_token(token : str) -> Dict[str, Any]:
    payload = jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM]
    )
    return payload