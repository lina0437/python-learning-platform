# 快速开始指南

## 🚀 5 分钟启动开发环境

### 前置要求

- Docker & Docker Compose
- Node.js 18+ (本地开发前端)
- Python 3.11+ (本地开发后端)

---

## 方式一：Docker Compose (推荐)

一键启动所有服务：

```bash
cd infrastructure
docker-compose up -d
```

启动后访问：
- **前端**: http://localhost:3000
- **后端 API**: http://localhost:8000
- **API 文档**: http://localhost:8000/docs

查看日志：
```bash
docker-compose logs -f
```

停止服务：
```bash
docker-compose down
```

---

## 方式二：本地开发

### 1. 启动基础设施

```bash
cd infrastructure
docker-compose up -d postgres redis judge0-server judge0-workers
```

### 2. 启动后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量文件
cp .env.example .env

# 运行数据库迁移
alembic upgrade head

# 启动服务器
uvicorn main:app --reload --port 8000
```

### 3. 启动前端

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

---

## 📝 初始化数据库

```bash
cd backend
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

---

## 🧪 测试 API

### 注册用户

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'
```

### 登录

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=test123"
```

### 执行代码

```bash
curl -X POST http://localhost:8000/api/sandbox/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello, Python!\")"}'
```

---

## 🛠️ 常见问题

### 端口被占用

修改 `docker-compose.yml` 中的端口映射，或停止占用端口的服务。

### 数据库连接失败

确保 PostgreSQL 容器正在运行：
```bash
docker-compose ps
```

### Judge0 无法执行代码

确保 Docker socket 已挂载：
```bash
ls -la /var/run/docker.sock
```

---

## 📚 下一步

1. 阅读 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解系统架构
2. 查看 [MVP.md](./MVP.md) 了解开发计划
3. 开始开发你的第一个功能！
