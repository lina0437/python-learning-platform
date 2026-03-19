@echo off
echo ========================================
echo Python 学习平台 - 一键推送代码到 GitHub
echo ========================================
echo.

REM 检查 Git 是否安装
echo [1/4] 检查 Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git 未安装
    echo 请安装 Git: https://git-scm.com/
    pause
    exit /b 1
)
echo Git 已安装

REM 配置 Git 用户信息 (如果还没有)
echo.
echo [2/4] 配置 Git 用户信息...
git config user.name >nul 2>&1
if errorlevel 1 (
    echo 请输入你的 GitHub 用户名:
    set /p GIT_USER=
    git config user.name "%GIT_USER%"
)

git config user.email >nul 2>&1
if errorlevel 1 (
    echo 请输入你的 GitHub 邮箱:
    set /p GIT_EMAIL=
    git config user.email "%GIT_EMAIL%"
)
echo Git 用户信息已配置

REM 添加远程仓库 (如果还没有)
echo.
echo [3/4] 配置远程仓库...
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 请输入 GitHub 仓库地址:
    echo 例如：https://github.com/lina0437/python-learning-platform.git
    set /p REPO_URL=
    git remote add origin %REPO_URL%
) else (
    echo 远程仓库已配置
)

REM 推送代码
echo.
echo [4/4] 推送代码到 GitHub...
echo.

REM 检查是否有更改
git status --porcelain > temp_status.txt
findstr /r "." temp_status.txt >nul
if errorlevel 1 (
    echo 没有检测到更改，是否仍然推送？(Y/N)
    set /p CONFIRM=
    if /i "%CONFIRM%"=="Y" (
        git push -u origin main
    ) else (
        echo 已取消推送
        del temp_status.txt
        pause
        exit /b 0
    )
) else (
    echo 检测到以下更改:
    type temp_status.txt
    echo.
    echo 请输入提交信息:
    set /p COMMIT_MSG=
    
    git add .
    git commit -m "%COMMIT_MSG%"
    git push -u origin main
)

del temp_status.txt

echo.
echo ========================================
echo 推送完成！
echo ========================================
echo.
echo 下一步:
echo 1. 访问 GitHub 查看代码：https://github.com/lina0437/python-learning-platform
echo 2. GitHub Actions 会自动部署到 ECS
echo 3. 大约 5-10 分钟后访问：http://8.131.100.101
echo.

pause
