from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base import Base

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    full_name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    license_no = Column(String, nullable=False)
    is_approved = Column(Boolean, default=False)

    user = relationship("User", back_populates="doctor")
