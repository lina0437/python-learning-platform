from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Python Learning Platform"
    DEBUG: bool = True
    
    # Database
    # 支持 PostgreSQL 或 SQLite (开发模式)
    DATABASE_URL: str = ""
    
    # Redis (可选，开发模式可用内存替代)
    REDIS_URL: str = ""
    
    # Auth
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Judge0 (Code Execution)
    JUDGE0_API_URL: str = ""
    
    # 跳过代码执行 (开发模式)
    SKIP_CODE_EXECUTION: bool = False
    
    # Stripe/Payment (later)
    STRIPE_SECRET_KEY: str = ""
    
    class Config:
        env_file = ".env"
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        # 自动检测：如果 DATABASE_URL 为空，使用 SQLite
        if not self.DATABASE_URL:
            self.DATABASE_URL = "sqlite:///./python_learning.db"
        
        # 自动检测：如果 REDIS_URL 为空，使用内存
        if not self.REDIS_URL:
            self.REDIS_URL = "memory://"


settings = Settings()
