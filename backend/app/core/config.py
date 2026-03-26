"""
应用配置
"""
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

class Settings:
    """应用设置"""
    
    # 应用配置
    APP_NAME: str = "Python 编程学习平台"
    DEBUG: bool = True
    
    # API 配置
    API_V1_PREFIX: str = "/api/v1"
    
    # CORS 配置
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    # OSS 配置
    OSS_ENDPOINT: str = os.getenv("OSS_ENDPOINT", "oss-cn-beijing.aliyuncs.com")
    OSS_BUCKET: str = os.getenv("OSS_BUCKET", "python-learning-platform")
    OSS_ACCESS_KEY_ID: str = os.getenv("OSS_ACCESS_KEY_ID", "")
    OSS_ACCESS_KEY_SECRET: str = os.getenv("OSS_ACCESS_KEY_SECRET", "")
    
    # 数据库配置
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./python_learning_platform.db")

settings = Settings()
