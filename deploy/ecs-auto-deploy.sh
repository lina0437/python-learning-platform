#!/bin/bash
# ========================================
# Python 学习平台 - ECS 自动部署脚本
# ========================================
# 从 GitHub 拉取代码并自动部署
# 用法：bash ecs-auto-deploy.sh <github-repo-url>
# ========================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查参数
if [ -z "$1" ]; then
    log_error "请提供 GitHub 仓库地址"
    log_error "用法：bash ecs-auto-deploy.sh https://github.com/username/repo.git"
    exit 1
fi

REPO_URL=$1
APP_DIR="/opt/python-learning"

log_info "开始自动部署..."
log_info "仓库地址：$REPO_URL"

# ========================================
# 1. 检查 Git
# ========================================
if ! command -v git &> /dev/null; then
    log_info "安装 Git..."
    apt-get install -y git
fi

# ========================================
# 2. 克隆或更新代码
# ========================================
if [ -d "$APP_DIR/.git" ]; then
    log_info "更新现有代码..."
    cd $APP_DIR
    git pull
else
    log_info "克隆代码..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# ========================================
# 3. 加载环境变量
# ========================================
if [ -f "$APP_DIR/.env" ]; then
    log_info "加载环境变量..."
    source $APP_DIR/.env
else
    log_error "未找到 .env 文件，请先运行 ecs-deploy.sh"
    exit 1
fi

# ========================================
# 4. 构建并启动
# ========================================
log_info "构建 Docker 镜像 (首次需要几分钟)..."
docker-compose build

log_info "启动服务..."
docker-compose up -d

# ========================================
# 5. 等待服务就绪
# ========================================
log_info "等待服务启动..."
sleep 10

# 检查后端健康
if curl -s http://localhost:8000/health > /dev/null; then
    log_info "后端服务正常"
else
    log_warn "后端服务可能未完全启动，请稍后检查"
fi

# ========================================
# 6. 数据库迁移
# ========================================
log_info "执行数据库迁移..."
docker-compose exec -T backend alembic upgrade head

# ========================================
# 7. 完成
# ========================================
log_info "========================================"
log_info "部署完成！"
log_info "========================================"
log_info ""
log_info "访问地址："
log_info "  前端：http://8.131.100.101"
log_info "  API 文档：http://8.131.100.101/docs"
log_info ""
log_info "管理命令："
log_info "  查看日志：docker-compose logs -f"
log_info "  重启服务：docker-compose restart"
log_info "  停止服务：docker-compose down"
log_info "  更新部署：bash ecs-auto-deploy.sh <repo-url>"
log_info ""
log_info "========================================"
