# 技术选型决策

## 选型原则

1. **用户体验优先** - 性能 > 成本，选择成熟稳定的方案
2. **可扩展性** - 支持 1000 人并发，后续可水平扩展
3. **快速迭代** - 开发效率高，便于后续产品复用
4. **商业化-ready** - 从第一天就按生产环境标准

## 最终技术栈

### 前端
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| TailwindCSS | 3.x | 样式 |
| Monaco Editor | latest | 代码编辑器 |
| React Query | 5.x | 数据获取 |
| React Router | 6.x | 路由 |

### 后端
| 技术 | 版本 | 用途 |
|------|------|------|
| Python | 3.11+ | 运行时 |
| FastAPI | 0.109+ | Web 框架 |
| SQLAlchemy | 2.x | ORM |
| Pydantic | 2.x | 数据验证 |
| Alembic | latest | 数据库迁移 |
| Celery | 5.x | 异步任务 |

### 基础设施 (生产级配置)
| 服务 | 方案 | 用途 | 配置 |
|------|------|------|------|
| 数据库 | Supabase Pro | 主数据库 | Pro 计划 ($25/月)，支持 10K+ DAU |
| 缓存 | Redis Cloud | Session/缓存 | 30MB+ 内存 |
| CDN | Cloudflare | 全球加速 + DDoS 防护 | 免费计划 |
| 对象存储 | Cloudflare R2 | 静态资源 | 10GB+ |
| 代码沙箱 | Judge0 (自托管) | 代码执行 | 独立服务器，4 核 8G |
| 部署 | Railway Pro / AWS | 应用托管 | 自动扩缩容 |
| 域名 | Cloudflare | DNS + CDN | 自定义域名 |
| 监控 | Better Stack / DataDog | 日志 + 监控 + 告警 | 实时告警 |
| 错误追踪 | Sentry | 前端/后端错误监控 | 免费版起步 |

### 开发工具
| 工具 | 用途 |
|------|------|
| Git + GitHub | 版本控制 |
| Docker | 本地开发环境 |
| pnpm | 前端包管理 |
| uv/pip | 后端包管理 |
| VS Code | 开发编辑器 |

---

## 成本估算 (支持 1000 人并发)

| 服务 | 配置 | 月成本 |
|------|------|--------|
| Supabase Pro | 10K+ DAU, 8GB 数据库 | $25 |
| Railway Pro / AWS | 自动扩缩容 (2-4 实例) | $50-100 |
| Redis Cloud | 30MB+ 内存 | $15 |
| Cloudflare R2 | 50GB 存储 + CDN | $5-10 |
| Judge0 服务器 | 4 核 8G (独立) | $40 |
| Sentry | 错误监控 | $0-26 |
| 域名 + SSL | 自定义域名 | $15/年 |

**生产环境月成本**: ~$150-200/月

**说明**: 这个配置可以支持 1000 人同时在线，用户体验流畅。后续用户增长可水平扩展。

---

## 项目结构

```
python-learning-platform/
├── frontend/                 # React 前端
│   ├── src/
│   │   ├── components/       # 可复用组件
│   │   ├── pages/            # 页面组件
│   │   ├── hooks/            # 自定义 hooks
│   │   ├── services/         # API 调用
│   │   └── stores/           # 状态管理
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Python 后端
│   ├── app/
│   │   ├── api/              # API 路由
│   │   ├── core/             # 核心配置
│   │   ├── models/           # 数据模型
│   │   ├── schemas/          # Pydantic 模型
│   │   ├── services/         # 业务逻辑
│   │   └── utils/            # 工具函数
│   ├── alembic/              # 数据库迁移
│   ├── requirements.txt
│   └── main.py
│
├── infrastructure/           # 基础设施配置
│   ├── docker/               # Docker 配置
│   ├── k8s/                  # K8s 配置 (后期)
│   └── terraform/            # IaC (后期)
│
├── docs/                     # 文档
└── scripts/                  # 开发脚本
```

---

## 决策记录

| 日期 | 决策 | 替代方案 | 理由 |
|------|------|----------|------|
| 2026-03-18 | FastAPI | Django | 更轻量，异步支持好 |
| 2026-03-18 | Supabase | 自建 PG | 免费额度够，自带 Auth |
| 2026-03-18 | Railway | 阿里云 | 部署简单，适合 MVP |
| 2026-03-18 | Judge0 | 自研沙箱 | 成熟方案，节省时间 |
