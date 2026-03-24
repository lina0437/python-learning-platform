# 手动部署到 ECS - 快速指南

## 前提条件
- 你能 SSH 连接到 ECS 服务器
- ECS 已安装 Docker 和 Docker Compose

## 部署步骤

### 步骤 1: 打包代码

```bash
cd C:\Users\28917\.easyclaw\workspace\python-learning-platform

# 创建压缩包
Compress-Archive -Path * -DestinationPath ../python-learning-platform-deploy.zip -Force
```

### 步骤 2: 上传到 ECS

**方式 A: 使用 SCP**
```bash
scp -i ~/.ssh/id_ed25519 ../python-learning-platform-deploy.zip root@8.131.100.101:/opt/
```

**方式 B: 使用 FTP/SFTP 工具**
- FileZilla
- WinSCP
- Xftp

上传到：`/opt/python-learning-platform/`

### 步骤 3: SSH 登录 ECS 并部署

```bash
# SSH 登录
ssh root@8.131.100.101

# 进入目录
cd /opt/python-learning-platform

# 解压代码（如果是压缩包）
unzip ../python-learning-platform-deploy.zip -d .

# 配置环境变量
cp .env.example .env
# 编辑 .env 修改密码

# 构建并启动
docker compose -f docker-compose.prod.yml up -d --build

# 查看日志
docker compose -f docker-compose.prod.yml logs -f

# 验证服务
curl http://localhost
```

---

## 快速部署脚本（在 ECS 上执行）

```bash
#!/bin/bash
set -e

echo "=== 开始部署 ==="

cd /opt/python-learning-platform

# 拉取最新代码（如果已配置 git）
git pull origin main || true

# 配置环境变量
if [ ! -f ".env" ]; then
    DB_PASS=$(openssl rand -hex 16)
    SECRET=$(openssl rand -hex 32)
    cat > .env <<EOF
DB_PASSWORD=${DB_PASS}
SECRET_KEY=${SECRET}
SERVER_IP=8.131.100.101
EOF
fi

# 构建并启动
docker compose -f docker-compose.prod.yml up -d --build

# 等待服务启动
sleep 10

# 运行迁移
docker compose exec -T backend alembic upgrade head || true

# 创建示例数据
docker compose exec -T backend python scripts/seed_courses.py || true

echo "=== 部署完成 ==="
echo "访问：http://8.131.100.101"
```

---

## 验证部署

```bash
# 检查容器状态
docker compose -f docker-compose.prod.yml ps

# 应该看到所有容器都是 Up 状态

# 测试前端
curl http://localhost

# 测试后端 API
curl http://localhost/api/health
```

---

## 遇到问题？

### 问题 1: Docker 构建失败
```bash
# 检查 Docker 镜像源
docker compose -f docker-compose.prod.yml config

# 查看构建日志
docker compose -f docker-compose.prod.yml build --progress=plain
```

### 问题 2: 容器无法启动
```bash
# 查看错误日志
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs postgres
```

### 问题 3: 数据库连接失败
```bash
# 等待数据库健康检查
docker compose -f docker-compose.prod.yml ps

# 检查环境变量
docker compose -f docker-compose.prod.yml config
```
