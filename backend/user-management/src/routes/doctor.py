from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db, require_approved_doctor
from models.user import User

router = APIRouter(
    dependencies=[Depends(require_approved_doctor)], prefix="", tags=["doctor"]
)

@router.get("/home")
def doctor_home(current_user: User = Depends(get_db)):
    return {"msg": f"Welcome Dr. {current_user.email}"}