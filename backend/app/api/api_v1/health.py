"""
健康检查 API
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health_check():
    """健康检查"""
    return {"status": "healthy", "message": "API v1 运行正常"}

@router.get("/ping")
def ping():
    """Ping 测试"""
    return {"message": "pong"}
