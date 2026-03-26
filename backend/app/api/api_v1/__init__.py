"""
API v1 模块
"""
from fastapi import APIRouter

api_router = APIRouter()

# 导入所有 API 模块
from . import health, upload

# 注册路由
api_router.include_router(health.router, tags=["健康检查"])
api_router.include_router(upload.router, tags=["上传管理"])
