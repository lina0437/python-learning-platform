#!/bin/bash
# ========================================
# Python 学习平台 - ECS 一键部署脚本
# ========================================
# 适用：Ubuntu 22.04
# 用法：bash ecs-deploy.sh
# ========================================

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ========================================
# 1. 检查是否以 root 运行
# ========================================
if [ "$EUID" -ne 0 ]; then 
    log_error "请使用 sudo 运行：sudo bash ecs-deploy.sh"
    exit 1
fi

log_info "开始部署 Python 学习平台..."

# ========================================
# 2. 更新系统包
# ========================================
log_info "更新系统包..."
apt-get update -y
apt-get upgrade -y

# ========================================
# 3. 安装 Docker
# ========================================
log_info "安装 Docker..."

# 检查 Docker 是否已安装
if command -v docker &> /dev/null; then
    log_warn "Docker 已安装，跳过..."
else
    # 安装 Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 启动 Docker
systemctl start docker
systemctl enable docker

log_info "Docker 安装完成"

# ========================================
# 4. 安装 Docker Compose
# ========================================
log_info "安装 Docker Compose..."

if command -v docker-compose &> /dev/null; then
    log_warn "Docker Compose 已安装，跳过..."
else
    # 安装 Docker Compose
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

log_info "Docker Compose 安装完成"

# ========================================
# 5. 安装 Nginx
# ========================================
log_info "安装 Nginx..."

if command -v nginx &> /dev/null; then
    log_warn "Nginx 已安装，跳过..."
else
    apt-get install -y nginx
fi

systemctl start nginx
systemctl enable nginx

log_info "Nginx 安装完成"

# ========================================
# 6. 创建应用目录
# ========================================
log_info "创建应用目录..."

APP_DIR="/opt/python-learning"
mkdir -p $APP_DIR

# ========================================
# 7. 创建 Docker Compose 配置
# ========================================
log_info "创建 Docker Compose 配置..."

cat > $APP_DIR/docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: python_learning_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-python123}
      POSTGRES_DB: python_learning
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: python_learning_redis
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build: ../backend
    container_name: python_learning_backend
    restart: always
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD:-python123}@postgres:5432/python_learning
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=${SECRET_KEY:-prod-secret-key-change-this}
      - CORS_ORIGINS=["http://8.131.100.101","http://yourdomain.com"]
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - app-network
    volumes:
      - ./backend:/app

  # Frontend
  frontend:
    build: ../frontend
    container_name: python_learning_frontend
    restart: always
    depends_on:
      - backend
    networks:
      - app-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: python_learning_nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
EOF

# ========================================
# 8. 创建 Nginx 配置
# ========================================
log_info "创建 Nginx 配置..."

cat > $APP_DIR/nginx.conf << 'EOF'
server {
    listen 80;
    server_name _;
    
    # 前端
    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket 支持 (如果需要)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # 后端 API
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # API 文档
    location /docs {
        proxy_pass http://backend:8000/docs;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 健康检查
    location /health {
        proxy_pass http://backend:8000/health;
        access_log off;
    }
}
EOF

# ========================================
# 9. 创建环境变量文件
# ========================================
log_info "创建环境变量配置..."

# 生成随机密钥
SECRET_KEY=$(openssl rand -hex 32)
DB_PASSWORD=$(openssl rand -hex 16)

cat > $APP_DIR/.env << EOF
# 数据库密码
DB_PASSWORD=${DB_PASSWORD}

# JWT 密钥 (重要！请保存好)
SECRET_KEY=${SECRET_KEY}

# 服务器 IP
SERVER_IP=8.131.100.101
EOF

# 设置权限
chmod 600 $APP_DIR/.env

log_warn "请保存好以下信息："
log_warn "数据库密码：${DB_PASSWORD}"
log_warn "JWT 密钥：${SECRET_KEY}"

# ========================================
# 10. 创建启动脚本
# ========================================
log_info "创建启动脚本..."

cat > $APP_DIR/start.sh << 'EOF'
#!/bin/bash
cd /opt/python-learning
docker-compose up -d
echo "服务已启动！"
echo "访问地址：http://8.131.100.101"
echo "API 文档：http://8.131.100.101/docs"
EOF

chmod +x $APP_DIR/start.sh

# ========================================
# 11. 创建停止脚本
# ========================================
cat > $APP_DIR/stop.sh << 'EOF'
#!/bin/bash
cd /opt/python-loading
docker-compose down
echo "服务已停止"
EOF

chmod +x $APP_DIR/stop.sh

# ========================================
# 12. 创建日志查看脚本
# ========================================
cat > $APP_DIR/logs.sh << 'EOF'
#!/bin/bash
cd /opt/python-learning
docker-compose logs -f $1
EOF

chmod +x $APP_DIR/logs.sh

# ========================================
# 13. 防火墙配置
# ========================================
log_info "配置防火墙..."

# 检查 UFW 状态
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    log_warn "防火墙已配置，请确保阿里云安全组也开放了 80/443 端口"
else
    log_warn "未检测到 UFW，请手动配置防火墙和阿里云安全组"
fi

# ========================================
# 14. 部署代码
# ========================================
log_info "准备部署代码..."

# 这里需要从 Git 克隆代码
# 暂时跳过，手动执行

# ========================================
# 15. 完成
# ========================================
log_info "========================================"
log_info "部署准备完成！"
log_info "========================================"
log_info ""
log_info "下一步："
log_info "1. 将代码上传到 /opt/python-learning 目录"
log_info "2. 运行：cd /opt/python-learning && ./start.sh"
log_info "3. 访问：http://8.131.100.101"
log_info ""
log_info "管理命令："
log_info "  启动：./start.sh"
log_info "  停止：./stop.sh"
log_info "  日志：./logs.sh [服务名]"
log_info "  重启：docker-compose restart"
log_info ""
log_warn "重要：请保存好 .env 文件中的密码和密钥！"
log_info "========================================"
