@echo off
echo ========================================
echo Python Learning Platform - 本地开发模式
echo ========================================
echo.

REM 检查 Python 版本
echo [1/5] 检查 Python 环境...
python --version
if errorlevel 1 (
    echo ERROR: Python 未安装或未添加到 PATH
    echo 请安装 Python 3.11+ 并重启终端
    pause
    exit /b 1
)

REM 创建虚拟环境 (如果不存在)
echo.
echo [2/5] 检查虚拟环境...
if not exist "venv" (
    echo 创建虚拟环境...
    python -m venv venv
    echo 虚拟环境创建完成
) else (
    echo 虚拟环境已存在
)

REM 激活虚拟环境
echo.
echo [3/5] 激活虚拟环境...
call venv\Scripts\activate.bat

REM 安装依赖
echo.
echo [4/5] 安装 Python 依赖...
pip install -r requirements.txt -q
echo 依赖安装完成

REM 初始化数据库
echo.
echo [5/5] 初始化数据库...
if not exist "python_learning.db" (
    echo 创建数据库迁移...
    alembic revision --autogenerate -m "Initial migration"
    alembic upgrade head
    echo 数据库初始化完成
) else (
    echo 数据库已存在
)

REM 启动服务器
echo.
echo ========================================
echo 启动 FastAPI 服务器...
echo API 文档：http://localhost:8000/docs
echo ========================================
echo.

uvicorn main:app --reload --port 8000

pause
