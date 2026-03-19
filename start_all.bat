@echo off
echo ========================================
echo Python 学习平台 - 一键启动 (离线模式)
echo ========================================
echo.
echo 这将启动:
echo   1. 后端服务器 (http://localhost:8000)
echo   2. 前端开发服务器 (http://localhost:5173)
echo.
echo 按 Ctrl+C 停止所有服务
echo ========================================
echo.

REM 启动后端 (后台运行)
echo [1/2] 启动后端服务器...
start "Python 后端" cmd /k "cd backend && start_dev.bat"

REM 等待 5 秒让后端启动
echo 等待后端启动...
timeout /t 5 /nobreak >nul

REM 启动前端
echo.
echo [2/2] 启动前端服务器...
start "Python 前端" cmd /k "cd frontend && start_dev.bat"

echo.
echo ========================================
echo 所有服务已启动!
echo.
echo 后端 API: http://localhost:8000
echo API 文档：http://localhost:8000/docs
echo 前端页面：http://localhost:5173
echo.
echo 按任意键关闭此窗口 (不会影响运行的服务)
echo 停止服务：关闭对应的命令行窗口
echo ========================================

pause >nul
