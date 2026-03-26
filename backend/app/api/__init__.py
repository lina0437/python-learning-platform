"""
API v1 路由器
"""
from fastapi import APIRouter

from .api_v1 import health, upload

api_router = APIRouter()

# 健康检查
api_router.include_router(health.router, prefix="/health", tags=["健康检查"])

# 上传管理
api_router.include_router(upload.router, prefix="/upload", tags=["上传管理"])
