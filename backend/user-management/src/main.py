from fastapi import FastAPI
from db import base, session
from core.config import settings
from routes import auth, patient, doctor, admin as admin_router
from fastapi.middleware.cors import CORSMiddleware

# Create tables
base.Base.metadata.create_all(bind=session.engine)

app = FastAPI()

origins = [
    "http://localhost:3000",         # Next.js dev server
    # Add your deployed frontend here
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(patient.router, prefix="/patient")
app.include_router(doctor.router, prefix="/doctor")
app.include_router(admin_router.router)

# Optional startup event to seed admin
@app.on_event("startup")
def create_initial_admin():
    db = session.SessionLocal()
    from models.user import User, UserRole
    from core.security import hash_password
    if not db.query(User).filter(User.role == UserRole.admin).first():
        admin = User(
            email="admin@hygieia.com",
            password_hash=hash_password("ChangeMe123!"),
            role=UserRole.admin,
            is_verified=True
        )
        db.add(admin)
        db.commit()
    db.close()