from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Python Learning Platform"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/python_learning"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Auth
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Judge0 (Code Execution)
    JUDGE0_API_URL: str = "http://localhost:2358"
    
    # Stripe/Payment (later)
    STRIPE_SECRET_KEY: str = ""
    
    class Config:
        env_file = ".env"


settings = Settings()
