# 离线开发指南

## 🚨 网络受限情况下的开发方案

如果你无法访问 Docker 镜像服务（被墙/网络限制），使用本指南快速启动开发环境。

---

## 🎯 核心思路

**用 SQLite 临时替代 PostgreSQL + 纯本地开发**

- ✅ 不需要 Docker
- ✅ 不需要访问外网
- ✅ 代码不需要大改
- ✅ 后续可无缝切换到 PostgreSQL

---

## 📋 前置要求

### 必须安装

| 软件 | 版本 | 下载地址 |
|------|------|----------|
| Python | 3.11+ | https://www.python.org/downloads/ |
| Node.js | 18+ | https://nodejs.org/ |

### 可选安装

| 软件 | 用途 |
|------|------|
| Git | 版本控制 |
| VS Code | 代码编辑器 |

---

## 🚀 快速启动 (5 分钟)

### 步骤 1: 启动后端

```bash
cd backend

# Windows 双击运行
start_dev.bat

# 或者手动执行
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
uvicorn main:app --reload --port 8000
```

**验证**: 访问 http://localhost:8000/docs

---

### 步骤 2: 启动前端 (新开一个终端)

```bash
cd frontend

# Windows 双击运行
start_dev.bat

# 或者手动执行
npm install
npm run dev
```

**验证**: 访问 http://localhost:5173

---

## 📁 项目结构 (离线模式)

```
python-learning-platform/
├── backend/
│   ├── python_learning.db    # SQLite 数据库 (自动生成)
│   ├── .env.local            # 本地环境配置
│   ├── start_dev.bat         # 一键启动脚本
│   └── ...
├── frontend/
│   ├── node_modules/         # npm 依赖 (首次需要下载)
│   ├── start_dev.bat         # 一键启动脚本
│   └── ...
└── ...
```

---

## 🔧 常见问题

### Q1: pip install 失败 (网络问题)

**解决方案**: 使用国内镜像源

```bash
# 使用清华镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 或者配置永久镜像
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Q2: npm install 失败 (网络问题)

**解决方案**: 使用淘宝镜像

```bash
# 使用 npmmirror
npm install --registry=https://registry.npmmirror.com

# 或者配置永久镜像
npm config set registry https://registry.npmmirror.com
```

### Q3: Alembic 迁移失败

**解决方案**: 删除数据库重新创建

```bash
# 删除数据库文件
del python_learning.db

# 重新迁移
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### Q4: 端口被占用

**解决方案**: 修改端口

```bash
# 后端改端口
uvicorn main:app --reload --port 8001

# 前端改端口 (修改 vite.config.ts)
server: { port: 5174 }
```

---

## 📊 离线模式 vs Docker 模式

| 特性 | 离线模式 | Docker 模式 |
|------|----------|-------------|
| 数据库 | SQLite | PostgreSQL |
| 缓存 | 内存 | Redis |
| 代码执行 | 跳过 | Judge0 |
| 网络需求 | 仅首次下载依赖 | 持续需要 |
| 适用场景 | 开发/学习 | 生产/测试 |

---

## 🔄 后续切换到 PostgreSQL

当网络恢复或找到可用的 PostgreSQL 服务时：

### 方案 A: 使用云数据库 (推荐)

1. **注册 Supabase** (免费): https://supabase.com
2. **创建项目**,获取数据库连接字符串
3. **修改 `.env`**:
   ```
   DATABASE_URL=postgresql://postgres:password@host:5432/postgres
   ```
4. **重新运行迁移**:
   ```bash
   alembic upgrade head
   ```

### 方案 B: 本地安装 PostgreSQL

1. 下载 PostgreSQL: https://www.postgresql.org/download/
2. 安装并创建数据库
3. 修改 `.env` 配置连接
4. 运行迁移

---

## 🎯 离线模式开发流程

### 1. 启动后端
```bash
cd backend
start_dev.bat
```

### 2. 启动前端
```bash
cd frontend
start_dev.bat
```

### 3. 开发功能
- 前端：http://localhost:5173
- 后端 API: http://localhost:8000/docs
- 自动热重载

### 4. 测试功能
- 注册/登录
- 查看课程
- 学习页面 (代码执行功能暂时跳过)

### 5. 提交代码
```bash
git add .
git commit -m "feat: xxx"
git push
```

---

## 📝 注意事项

### 1. SQLite 限制

- 不支持并发写入 (开发够用)
- 不支持某些 PostgreSQL 特性
- **生产环境必须切换回 PostgreSQL**

### 2. 代码执行功能

离线模式下暂时跳过代码执行功能，后续可以：

- 方案 A: 本地安装 Python，用 subprocess 执行 (注意安全)
- 方案 B: 部署 Judge0 到可访问的服务器
- 方案 C: 使用在线代码执行 API

### 3. 数据持久化

SQLite 数据库文件：`backend/python_learning.db`

- 不要删除此文件 (除非要重置数据)
- 可以复制备份

---

## 🛠️ 开发工具推荐

### VS Code 扩展

- Python (Microsoft)
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag

### 终端工具

- Windows Terminal (Windows)
- PowerShell
- Git Bash

---

## 📞 下一步

1. ✅ 启动后端和前端
2. ✅ 测试基本功能 (注册/登录/查看课程)
3. 📝 创建示例课程数据
4. 🔧 实现学习进度追踪
5. 🎨 优化 UI/UX

---

## 💡 提示

**离线开发的优势**:

- ✅ 启动快 (无需等待 Docker 容器)
- ✅ 调试方便 (直接在本地运行)
- ✅ 资源占用少
- ✅ 适合快速迭代

**等网络恢复后**,再考虑切换到 Docker 模式或部署到云端。

---

**现在就开始吧！** 🚀

```bash
# 后端
cd backend
start_dev.bat

# 前端 (新终端)
cd frontend
start_dev.bat
```
