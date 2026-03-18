# 项目目录结构

```
python-learning-platform/
│
├── 📄 README.md                    # 项目介绍
├── 📄 PRODUCT_ENGINE.md            # 产品矩阵引擎设计 (核心！)
├── 📄 ARCHITECTURE.md              # 系统架构设计
├── 📄 MVP.md                       # MVP 功能清单
├── 📄 TECH_STACK.md                # 技术选型
├── 📄 QUICKSTART.md                # 快速开始指南
├── 📄 LAUNCH_CHECKLIST.md          # 上线检查清单
├── 📄 NEXT_STEPS.md                # 下一步行动
├── 📄 PROJECT_STATUS.md            # 项目状态看板
├── 📄 PROJECT_STRUCTURE.md         # 本文件
│
├── 📁 frontend/                    # 前端应用 (React + TypeScript)
│   ├── 📄 package.json             # 前端依赖
│   ├── 📄 vite.config.ts           # Vite 配置
│   ├── 📄 tsconfig.json            # TypeScript 配置
│   ├── 📄 tailwind.config.js       # TailwindCSS 配置
│   ├── 📄 index.html               # HTML 入口
│   ├── 📄 Dockerfile               # 前端 Docker 镜像
│   ├── 📄 nginx.conf               # Nginx 配置
│   │
│   ├── 📁 src/
│   │   ├── 📄 main.tsx             # React 入口
│   │   ├── 📄 App.tsx              # 根组件
│   │   ├── 📄 index.css            # 全局样式
│   │   │
│   │   ├── 📁 components/          # 可复用组件
│   │   │   ├── 📄 Navbar.tsx       # 导航栏
│   │   │   └── ...                 # 其他组件
│   │   │
│   │   ├── 📁 pages/               # 页面组件
│   │   │   ├── 📄 HomePage.tsx     # 首页
│   │   │   ├── 📄 CourseListPage.tsx   # 课程列表
│   │   │   ├── 📄 CourseDetailPage.tsx # 课程详情
│   │   │   ├── 📄 LessonPage.tsx   # 课程学习 (含代码编辑器)
│   │   │   ├── 📄 LoginPage.tsx    # 登录
│   │   │   ├── 📄 RegisterPage.tsx # 注册
│   │   │   └── 📄 DashboardPage.tsx # 学习中心
│   │   │
│   │   ├── 📁 services/            # API 服务层 (待创建)
│   │   │   ├── 📄 api.ts           # API 客户端
│   │   │   └── 📄 auth.ts          # 认证服务
│   │   │
│   │   ├── 📁 hooks/               # 自定义 Hooks (待创建)
│   │   │   ├── 📄 useAuth.ts       # 认证 Hook
│   │   │   └── ...
│   │   │
│   │   └── 📁 stores/              # 状态管理 (待创建)
│   │       └── 📄 authStore.ts     # 认证状态
│   │
│   └── 📁 public/                  # 静态资源
│       └── 📄 vite.svg
│
├── 📁 backend/                     # 后端应用 (Python + FastAPI)
│   ├── 📄 main.py                  # FastAPI 入口
│   ├── 📄 requirements.txt         # Python 依赖
│   ├── 📄 .env.example             # 环境变量模板
│   ├── 📄 Dockerfile               # 后端 Docker 镜像
│   │
│   ├── 📁 app/
│   │   ├── 📄 __init__.py
│   │   │
│   │   ├── 📁 core/                # 核心配置
│   │   │   ├── 📄 config.py        # 应用配置
│   │   │   └── 📄 database.py      # 数据库连接
│   │   │
│   │   ├── 📁 models/              # 数据模型
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py          # 用户模型
│   │   │   └── 📄 course.py        # 课程/课时/进度模型
│   │   │
│   │   ├── 📁 schemas/             # Pydantic 模型 (数据验证)
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py          # 用户 Schema
│   │   │   └── 📄 course.py        # 课程 Schema
│   │   │
│   │   ├── 📁 api/                 # API 路由
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 auth.py          # 认证 API
│   │   │   ├── 📄 users.py         # 用户 API
│   │   │   ├── 📄 courses.py       # 课程 API
│   │   │   ├── 📄 lessons.py       # 课时 API
│   │   │   └── 📄 sandbox.py       # 代码沙箱 API
│   │   │
│   │   ├── 📁 services/            # 业务逻辑层 (待创建)
│   │   │   ├── 📄 auth_service.py
│   │   │   └── ...
│   │   │
│   │   └── 📁 utils/               # 工具函数
│   │       ├── 📄 __init__.py
│   │       └── 📄 auth.py          # 认证工具 (JWT、密码加密)
│   │
│   ├── 📁 alembic/                 # 数据库迁移
│   │   ├── 📄 env.py
│   │   ├── 📄 script.py.mako
│   │   └── 📁 versions/            # 迁移脚本 (待创建)
│   │
│   └── 📄 alembic.ini              # Alembic 配置
│
├── 📁 infrastructure/              # 基础设施配置
│   ├── 📄 docker-compose.yml       # Docker Compose 配置
│   ├── 📁 monitoring/              # 监控配置 (待创建)
│   │   ├── 📄 prometheus.yml
│   │   └── 📄 grafana-dashboard.json
│   └── 📁 k8s/                     # K8s 配置 (后期)
│       └── ...
│
├── 📁 docs/                        # 详细文档 (待创建)
│   ├── 📄 api.md                   # API 文档
│   ├── 📄 deployment.md            # 部署文档
│   └── 📄 development.md           # 开发文档
│
└── 📁 scripts/                     # 开发脚本 (待创建)
    ├── 📄 setup.sh                 # 环境初始化
    ├── 📄 deploy.sh                # 部署脚本
    └── 📄 seed_data.py             # 示例数据
```

---

## 📊 代码统计

### 已完成文件

| 类别 | 文件数 | 代码行数 (约) |
|------|--------|---------------|
| 文档 | 10 | 2000+ |
| 前端 | 15 | 1500+ |
| 后端 | 15 | 1200+ |
| 基础设施 | 3 | 300+ |
| **总计** | **43** | **5000+** |

### 待创建文件

| 类别 | 文件数 | 优先级 |
|------|--------|--------|
| 前端服务层 | 3 | P0 |
| 前端状态管理 | 2 | P0 |
| 后端业务逻辑层 | 5 | P1 |
| 数据库迁移脚本 | 1 | P0 |
| 监控配置 | 3 | P1 |
| 测试文件 | 10 | P2 |

---

## 🎯 关键文件说明

### 必读文档

1. **PRODUCT_ENGINE.md** - 产品矩阵设计 (核心思想)
2. **ARCHITECTURE.md** - 系统架构
3. **QUICKSTART.md** - 快速启动
4. **NEXT_STEPS.md** - 下一步行动

### 核心代码

**前端**:
- `frontend/src/App.tsx` - 路由配置
- `frontend/src/pages/LessonPage.tsx` - 核心学习页面 (代码编辑器)
- `frontend/src/components/Navbar.tsx` - 导航组件

**后端**:
- `backend/main.py` - FastAPI 入口
- `backend/app/api/sandbox.py` - 代码执行 API (核心功能)
- `backend/app/api/auth.py` - 认证 API

**基础设施**:
- `infrastructure/docker-compose.yml` - 一键启动所有服务

---

## 🔄 文件更新频率

| 文件类型 | 更新频率 | 说明 |
|----------|----------|------|
| 代码文件 | 每天 | 开发阶段频繁修改 |
| 文档文件 | 每周 | 阶段性更新 |
| 配置文件 | 偶尔 | 稳定后少改动 |
| 依赖文件 | 偶尔 | 按需更新 |

---

## 📝 命名规范

### 前端 (TypeScript)

```typescript
// 组件：PascalCase
HomePage.tsx
CourseList.tsx

// 文件：camelCase
api.ts
authStore.ts

// 常量：UPPER_SNAKE_CASE
API_BASE_URL
MAX_CODE_LENGTH
```

### 后端 (Python)

```python
# 模块：snake_case
user_service.py
auth_service.py

# 类：PascalCase
class User(Base)
class Course(Base)

# 常量：UPPER_SNAKE_CASE
DATABASE_URL
SECRET_KEY
```

---

## 🚀 下一步

1. **熟悉目录结构** - 了解每个文件的作用
2. **启动开发环境** - 参考 QUICKSTART.md
3. **开始开发** - 参考 NEXT_STEPS.md

有任何问题随时问我！💪
