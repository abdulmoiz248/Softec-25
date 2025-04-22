from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies import get_current_user

from dependencies import get_db, require_role
from models.user import User

router = APIRouter(
    dependencies=[Depends(require_role(["patient"]))], prefix="", tags=["patient"]
)

@router.get("/home")
def patient_home(current_user: User = Depends(get_current_user)):
    return {"msg": f"Welcome patient {current_user.email}"}