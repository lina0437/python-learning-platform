"""
Python 编程学习平台 - 后端主入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.api_v1 import api_router

# 创建 FastAPI 应用
app = FastAPI(
    title="Python 编程学习平台 API",
    description="一个专注于 Python 教学的在线学习平台",
    version="0.1.0"
)

# 配置 CORS（允许前端访问）
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 根路径
@app.get("/")
def read_root():
    return {
        "message": "欢迎使用 Python 编程学习平台 API",
        "version": "0.1.0",
        "status": "running"
    }

# 包含 API v1 路由
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
