# ECS 一键修复脚本

## 问题诊断
根据 GitHub Actions 诊断，ECS 上没有容器在运行。

## 手动修复步骤

### 步骤 1: SSH 登录 ECS

```bash
ssh root@8.131.100.101
```

### 步骤 2: 进入项目目录

```bash
cd /opt/python-learning
```

### 步骤 3: 检查当前状态

```bash
# 查看容器状态
docker-compose ps

# 查看 .env 文件
cat .env
```

### 步骤 4: 重新部署

```bash
# 停止所有容器（如果有）
docker-compose down

# 重新构建并启动
docker-compose up -d --build

# 等待 30 秒
sleep 30

# 查看容器状态
docker-compose ps

# 查看后端日志
docker-compose logs backend
```

### 步骤 5: 验证服务

```bash
# 测试前端
curl http://localhost

# 测试后端 API
curl http://localhost:8000/api/health
```

---

## 预期输出

### 容器状态应该是：

```
NAME                        STATUS
python_learning_db          Up (healthy)
python_learning_redis       Up
python_learning_backend     Up
python_learning_frontend    Up
python_learning_nginx       Up
```

### 后端健康检查应该返回：

```json
{"status":"healthy"}
```

---

## 如果仍然失败

### 查看完整日志：

```bash
docker-compose logs > /tmp/deploy.log
```

然后把日志发给我分析。

### 常见问题：

**1. 数据库连接失败**
```bash
# 检查 .env 中的 DB_PASSWORD
cat .env

# 等待数据库启动
sleep 30
docker-compose restart backend
```

**2. 端口冲突**
```bash
# 检查端口占用
netstat -tlnp | grep :8000
```

**3. 镜像构建失败**
```bash
# 手动构建
docker-compose build backend
```

---

## 快速访问

- 前端：http://8.131.100.101
- 后端 API：http://8.131.100.101/api/health
- GitHub Actions: https://github.com/lina0437/python-learning-platform/actions
