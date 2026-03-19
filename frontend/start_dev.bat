@echo off
echo ========================================
echo Python Learning Platform - 前端开发服务器
echo ========================================
echo.

REM 检查 Node.js
echo [1/4] 检查 Node.js 环境...
node --version
if errorlevel 1 (
    echo ERROR: Node.js 未安装或未添加到 PATH
    echo 请安装 Node.js 18+ 并重启终端
    pause
    exit /b 1
)

REM 检查 npm
echo.
echo [2/4] 检查 npm...
npm --version

REM 安装依赖 (如果 node_modules 不存在)
echo.
echo [3/4] 检查依赖...
if not exist "node_modules" (
    echo 安装依赖中 (首次需要几分钟)...
    call npm install
    echo 依赖安装完成
) else (
    echo 依赖已安装
)

REM 启动开发服务器
echo.
echo [4/4] 启动开发服务器...
echo.
echo ========================================
echo 访问地址：http://localhost:5173
echo API 代理：http://localhost:8000
echo ========================================
echo.

call npm run dev

pause
