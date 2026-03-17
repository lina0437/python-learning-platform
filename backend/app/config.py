"""
应用配置
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # 应用配置
    APP_NAME: str = "Python 编程学习平台"
    DEBUG: bool = True
    
    # 数据库配置
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/python_learning"
    
    # Redis 配置
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT 配置
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS 配置
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    # 代码执行服务配置（Judge0）
    JUDGE0_URL: str = "http://localhost:2358"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局配置实例
settings = Settings()
