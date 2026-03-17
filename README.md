# 🐍 Python 编程学习平台

> 一个专注于 Python 教学的在线学习平台

## 项目状态

- [ ] 环境搭建
- [ ] 后端开发
- [ ] 前端开发
- [ ] 测试
- [ ] 上线

## 技术栈

### 后端
- Python 3.10+
- FastAPI（Web 框架）
- PostgreSQL（数据库）
- Redis（缓存）
- Docker（容器化）

### 前端
- React + TypeScript
- Monaco Editor（代码编辑器）
- TailwindCSS（样式）
- Vite（构建工具）

### 部署
- Docker Compose
- Nginx（反向代理）
- Let's Encrypt（SSL 证书）

## 快速开始

### 开发环境

```bash
# 后端
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# 前端
cd frontend
npm install
npm run dev
```

### 生产环境

```bash
docker-compose up -d
```

## 项目结构

```
python-learning-platform/
├── backend/           # 后端代码
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── api/
│   │   └── services/
│   └── requirements.txt
├── frontend/          # 前端代码
│   ├── src/
│   ├── public/
│   └── package.json
├── docker/            # Docker 配置
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
└── docs/              # 文档
    ├── api.md
    └── deploy.md
```

## 开发日志

### 2026-03-17
- [x] 项目初始化
- [ ] 环境搭建
- [ ] 数据库设计

---

**开发者**: [你的名字]  
**开始日期**: 2026-03-17  
**目标上线**: 2026-06-17
