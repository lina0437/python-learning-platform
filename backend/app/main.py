"""
Python 编程学习平台 - 后端主入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

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

# 健康检查接口
@app.get("/")
def read_root():
    return {
        "message": "欢迎使用 Python 编程学习平台 API",
        "version": "0.1.0",
        "status": "running"
    }

# 健康检查
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# TODO: 后续会添加的接口
# - 用户注册/登录
# - 课程管理
# - 代码执行
# - 打卡系统

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
