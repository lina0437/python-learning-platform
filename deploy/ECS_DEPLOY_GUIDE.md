# ECS 部署完整指南

## 📋 服务器信息

| 项目 | 值 |
|------|-----|
| 服务商 | 阿里云 ECS |
| 地域 | 北京 |
| 配置 | 2 核 8G |
| 系统 | Ubuntu 22.04 64 位 |
| 公网 IP | (已保密) |

---

## 🚀 快速部署 (3 步)

### 步骤 1: 上传部署脚本到 ECS

```bash
# 方式 A: 使用 scp (从本地)
scp deploy/ecs-deploy.sh root@8.131.100.101:/root/

# 方式 B: 在 ECS 上直接下载 (如果有 GitHub)
wget https://raw.githubusercontent.com/your-username/python-learning-platform/main/deploy/ecs-deploy.sh
```

### 步骤 2: 执行部署脚本

SSH 登录 ECS:
```bash
ssh root@8.131.100.101
```

执行部署:
```bash
chmod +x ecs-deploy.sh
sudo bash ecs-deploy.sh
```

**执行时间**: 首次约 5-10 分钟 (下载 Docker 等)

### 步骤 3: 部署代码

```bash
# 方式 A: 从 GitHub 克隆 (推荐)
bash ecs-auto-deploy.sh https://github.com/your-username/python-learning-platform.git

# 方式 B: 手动上传代码
# 使用 scp 或 FTP 将代码上传到 /opt/python-learning 目录
```

---

## 🔧 手动部署 (详细步骤)

如果自动脚本有问题，可以手动执行：

### 1. 安装 Docker

```bash
# 更新包
apt-get update
apt-get upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 启动 Docker
systemctl start docker
systemctl enable docker
```

### 2. 安装 Docker Compose

```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 3. 创建应用目录

```bash
mkdir -p /opt/python-learning
cd /opt/python-learning
```

### 4. 上传代码

```bash
# 方式 A: Git 克隆
git clone https://github.com/your-username/python-learning-platform.git .

# 方式 B: 从本地上传
# 在本地执行：
# scp -r ./* root@8.131.100.101:/opt/python-learning/
```

### 5. 配置环境变量

```bash
cd /opt/python-learning

# 创建 .env 文件
cat > .env << EOF
DB_PASSWORD=$(openssl rand -hex 16)
SECRET_KEY=$(openssl rand -hex 32)
SERVER_IP=8.131.100.101
EOF

# 保存并记录密码！
cat .env
```

### 6. 启动服务

```bash
cd /opt/python-learning
docker-compose up -d
```

### 7. 数据库迁移

```bash
docker-compose exec backend alembic upgrade head
```

### 8. 验证部署

```bash
# 检查服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 测试 API
curl http://localhost:8000/health
```

---

## 🔐 阿里云安全组配置

**重要**: 必须在阿里云控制台开放端口！

### 操作步骤

1. 登录 [阿里云控制台](https://ecs.console.aliyun.com/)
2. 进入 **实例** → 找到你的 ECS
3. 点击 **更多** → **网络和安全组** → **安全组配置**
4. 添加以下规则：

| 端口范围 | 授权对象 | 描述 |
|----------|----------|------|
| 22/22 | 0.0.0.0/0 | SSH |
| 80/80 | 0.0.0.0/0 | HTTP |
| 443/443 | 0.0.0.0/0 | HTTPS (可选) |

---

## 🌐 域名配置 (可选)

### 1. 购买域名

在 [阿里云域名](https://wanwang.aliyun.com/domain/) 购买域名

### 2. 配置 DNS

添加 A 记录：
```
@    A    8.131.100.101
www  A    8.131.100.101
```

### 3. 修改 Nginx 配置

编辑 `/opt/python-learning/nginx.conf`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # ... 其他配置
}
```

### 4. 重启 Nginx

```bash
cd /opt/python-learning
docker-compose restart nginx
```

---

## 🔒 HTTPS 配置 (推荐)

### 使用 Let's Encrypt 免费证书

```bash
# 安装 Certbot
apt-get install -y certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自动续期
certbot renew --dry-run
```

---

## 📊 服务管理

### 查看状态

```bash
# 所有服务
docker-compose ps

# 特定服务
docker-compose ps backend
```

### 查看日志

```bash
# 所有服务日志
docker-compose logs -f

# 特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### 重启服务

```bash
# 重启所有
docker-compose restart

# 重启特定服务
docker-compose restart backend
```

### 停止服务

```bash
docker-compose down
```

### 更新部署

```bash
cd /opt/python-learning

# 拉取最新代码
git pull

# 重新构建并启动
docker-compose build
docker-compose up -d

# 数据库迁移
docker-compose exec backend alembic upgrade head
```

---

## 🛠️ 故障排查

### 问题 1: 无法访问网站

```bash
# 1. 检查服务状态
docker-compose ps

# 2. 检查端口监听
netstat -tlnp | grep :80

# 3. 检查防火墙
ufw status

# 4. 检查阿里云安全组 (控制台)
```

### 问题 2: 数据库连接失败

```bash
# 查看后端日志
docker-compose logs backend

# 检查数据库是否启动
docker-compose ps postgres

# 重启数据库
docker-compose restart postgres
```

### 问题 3: 磁盘空间不足

```bash
# 查看磁盘使用
df -h

# 清理 Docker 资源
docker system prune -a

# 查看日志大小
du -sh /var/lib/docker/containers/*
```

---

## 📈 性能优化

### 1. 配置 Swap (防止内存不足)

```bash
# 创建 4GB Swap
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# 永久生效
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 2. 配置 Docker 日志限制

编辑 `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

重启 Docker:
```bash
systemctl restart docker
```

### 3. 配置 Nginx 缓存

编辑 `nginx.conf`,添加缓存配置。

---

## 🔄 CI/CD 自动部署 (可选)

### 使用 GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to ECS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to ECS
        uses: appleboy/ssh-action@master
        with:
          host: 8.131.100.101
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/python-learning
            git pull
            docker-compose build
            docker-compose up -d
            docker-compose exec -T backend alembic upgrade head
```

---

## 📝 检查清单

部署完成后检查：

- [ ] 可以访问 http://8.131.100.101
- [ ] API 文档可访问 http://8.131.100.101/docs
- [ ] 健康检查通过 http://8.131.100.101/health
- [ ] 数据库正常连接
- [ ] 所有容器运行正常
- [ ] 日志无错误
- [ ] 阿里云安全组已配置
- [ ] 已保存数据库密码和 JWT 密钥
- [ ] 已配置域名 (可选)
- [ ] 已配置 HTTPS (可选)

---

## 🎯 下一步

部署成功后：

1. **测试功能** - 注册、登录、查看课程
2. **创建示例数据** - 添加 Python 入门课程
3. **监控配置** - 配置日志监控和告警
4. **备份策略** - 配置数据库自动备份

---

## 📞 需要帮助？

遇到问题时：

1. 查看日志：`docker-compose logs -f`
2. 检查服务状态：`docker-compose ps`
3. 重启服务：`docker-compose restart`

**祝部署顺利！** 🚀
