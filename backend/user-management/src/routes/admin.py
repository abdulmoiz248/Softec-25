from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dependencies import get_db, require_role
from models.doctor import Doctor
from models.user import User

router = APIRouter(
    dependencies=[Depends(require_role(["admin"]))], prefix="/admin", tags=["admin"]
)

@router.post("/approve-doctor/{doctor_id}")
def approve_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    doctor.is_approved = True
    db.commit()
    return {"msg": f"Doctor {doctor_id} approved"}