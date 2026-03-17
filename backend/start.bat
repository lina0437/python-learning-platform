@echo off
echo ========================================
echo   Python 编程学习平台 - 后端启动脚本
echo ========================================
echo.

REM 检查 Python 是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Python，请先安装 Python 3.10+
    pause
    exit /b 1
)

echo [1/3] 创建虚拟环境...
python -m venv venv

echo [2/3] 激活虚拟环境...
call venv\Scripts\activate.bat

echo [3/3] 安装依赖...
pip install -r requirements.txt

echo.
echo ========================================
echo   启动开发服务器...
echo   访问：http://localhost:8000
echo   API 文档：http://localhost:8000/docs
echo ========================================
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

pause
