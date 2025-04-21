from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base import Base

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    full_name =  Column(String, nullable=False)
    age =  Column(String, nullable=False)
    gender =  Column(String, nullable=False)
    blood_type =  Column(String, nullable=False)

    user = relationship("User", back_populates="patient")

