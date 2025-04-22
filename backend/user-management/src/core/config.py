from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "TEAMNIGHTFURY02HACKATHON"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "sqlite:///./hygieia.db"

    class Config:
        env_file = ".env"
    
settings = Settings()