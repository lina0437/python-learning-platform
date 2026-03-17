@echo off
chcp 65001 >nul
echo ========================================
echo   Python 编程学习平台 - 环境检查工具
echo ========================================
echo.
echo 正在检查你的电脑环境...
echo.

REM 检查 Python
echo [1/6] 检查 Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo   ❌ Python: 未安装
) else (
    python --version
    echo   ✅ Python: 已安装
)
echo.

REM 检查 Node.js
echo [2/6] 检查 Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo   ❌ Node.js: 未安装
) else (
    node --version
    echo   ✅ Node.js: 已安装
)
echo.

REM 检查 npm
echo [3/6] 检查 npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo   ❌ npm: 未安装
) else (
    npm --version
    echo   ✅ npm: 已安装
)
echo.

REM 检查 Docker
echo [4/6] 检查 Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo   ❌ Docker: 未安装
) else (
    docker --version
    echo   ✅ Docker: 已安装
)
echo.

REM 检查 Git
echo [5/6] 检查 Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo   ❌ Git: 未安装
) else (
    git --version
    echo   ✅ Git: 已安装
)
echo.

REM 检查 VS Code
echo [6/6] 检查 VS Code...
where code >nul 2>&1
if errorlevel 1 (
    echo   ❌ VS Code: 未安装（或没有添加到 PATH）
) else (
    code --version
    echo   ✅ VS Code: 已安装
)
echo.

REM 检查磁盘空间
echo [额外] 检查 C 盘可用空间...
wmic logicaldisk where "DeviceID='C:'" get FreeSpace,Size >nul 2>&1
for /f "skip=1 tokens=1,2" %%a in ('wmic logicaldisk where "DeviceID='C:'" get FreeSpace,Size') do (
    set /a freeGB=%%a/1024/1024/1024
    set /a totalGB=%%b/1024/1024/1024
    echo   C 盘可用空间：约 !freeGB! GB (总 !totalGB! GB)
)
echo.

echo ========================================
echo 检查完成！
echo ========================================
echo.
echo 请将以上结果复制发送给 AI 助手
echo.
pause
