# ECS 服务器部署准备指南

## 📋 服务器要求

### 最低配置
- **CPU**: 2 核
- **内存**: 4GB
- **硬盘**: 40GB SSD
- **系统**: Ubuntu 22.04 LTS 或 Alibaba Cloud Linux 3

### 推荐配置
- **CPU**: 4 核
- **内存**: 8GB
- **硬盘**: 80GB SSD
- **系统**: Ubuntu 22.04 LTS

---

## 🔧 服务器初始化步骤

### 1. 连接到 ECS

```bash
# SSH 登录 (替换为你的 ECS 公网 IP)
ssh root@8.131.100.101

# 或使用密钥对
ssh -i ~/.ssh/your-key.pem root@8.131.100.101
```

### 2. 安装 Docker

```bash
# 更新系统包
apt update && apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com | bash -s docker

# 启动 Docker
systemctl enable docker
systemctl start docker

# 验证 Docker
docker --version
```

### 3. 安装 Docker Compose

```bash
# Docker Compose v2 已包含在 Docker Desktop 中
# 如需要单独安装：
apt install docker-compose-plugin -y

# 验证
docker compose version
```

### 4. 配置防火墙（安全组）

在阿里云控制台配置安全组规则：

| 端口 | 协议 | 来源 | 说明 |
|------|------|------|------|
| 22 | TCP | 0.0.0.0/0 | SSH |
| 80 | TCP | 0.0.0.0/0 | HTTP |
| 443 | TCP | 0.0.0.0/0 | HTTPS (可选) |

---

## 📦 部署方式

### 方式 A: 使用 GitHub Actions 自动部署（推荐）

1. 配置 GitHub Secrets
2. Push 代码到 main 分支
3. 自动构建并部署

### 方式 B: 手动部署

```bash
# 1. 在 ECS 上克隆代码
cd /opt
git clone https://github.com/your-username/python-learning-platform.git
cd python-learning-platform

# 2. 复制环境配置文件
cp .env.example .env
# 编辑 .env 文件，修改密码和密钥

# 3. 构建并启动
docker compose -f docker-compose.prod.yml up -d --build

# 4. 查看日志
docker compose -f docker-compose.prod.yml logs -f

# 5. 验证服务
curl http://localhost
```

---

## 🔍 验证部署

### 检查容器状态

```bash
docker compose -f docker-compose.prod.yml ps
```

期望输出：
```
NAME                        STATUS         PORTS
python_learning_db          Up (healthy)   5432/tcp
python_learning_redis       Up             6379/tcp
python_learning_backend     Up             8000/tcp
python_learning_frontend    Up             80/tcp
python_learning_nginx       Up             0.0.0.0:80->80/tcp
```

### 检查服务日志

```bash
# 查看所有服务日志
docker compose -f docker-compose.prod.yml logs

# 查看特定服务日志
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs nginx
```

### 测试 API

```bash
# 测试后端健康检查
curl http://localhost/api/health

# 测试前端
curl http://localhost
```

---

## 🛠️ 常见问题排查

### 问题 1: 容器无法启动

```bash
# 查看详细错误
docker compose -f docker-compose.prod.yml logs backend

# 检查数据库是否就绪
docker compose -f docker-compose.prod.yml logs postgres
```

### 问题 2: 无法访问网站

```bash
# 检查防火墙
ufw status

# 检查端口监听
netstat -tlnp | grep :80

# 检查 Docker 网络
docker network ls
```

### 问题 3: 数据库连接失败

```bash
# 等待数据库健康检查通过
docker compose -f docker-compose.prod.yml ps

# 检查数据库密码是否正确
docker compose -f docker-compose.prod.yml config
```

---

## 📊 监控与维护

### 查看资源使用

```bash
# Docker 容器资源使用
docker stats

# 系统资源
htop
df -h
free -h
```

### 日志管理

```bash
# 查看最近 100 行日志
docker compose -f docker-compose.prod.yml logs --tail=100

# 实时日志
docker compose -f docker-compose.prod.yml logs -f
```

### 备份数据库

```bash
# 导出数据库
docker exec python_learning_db pg_dump -U postgres python_learning > backup.sql

# 导入数据库
docker exec -i python_learning_db psql -U postgres python_learning < backup.sql
```

---

## 🚀 下一步

1. ✅ 完成本指南的服务器准备
2. ⏭️ 配置 GitHub Secrets（任务 6）
3. ⏭️ 执行首次部署（任务 7）
4. ⏭️ 验证部署成功（任务 8）

---

**当前状态**: 本地 Docker 构建已成功验证，可以开始准备 ECS 服务器

**下一步**: 如果你已有 ECS 服务器，我可以帮你配置 GitHub Secrets；如果没有，我可以指导你创建
