# Python 学习平台 - 核心经验法则

**创建日期:** 2026-03-25  
**更新日期:** 2026-03-25 09:45 (补充产品矩阵战略)  
**来源:** 项目复盘报告 (POST_MORTEM.md) + 经验教训清单 (LESSONS_LEARNED.md) + 记忆文件  
**重要性:** ⭐⭐⭐⭐⭐ 必须严格遵守

---

## 🎯 核心经验 TOP 10

### 0️⃣ 产品矩阵战略（最高优先级）⭐

**来源:** 用户核心战略要求

**规则:**
```
🎯 产品矩阵思维 - 这是第一个原型产品，用于验证"产品矩阵加速器"引擎

核心架构：
┌─────────────────────────────────────────┐
│           产品层                        │
│  Python 学习网 | 未来产品 2 | 未来产品 3  │
├─────────────────────────────────────────┤
│           引擎层（可复用模块）           │
│  用户中心 | 支付中心 | 内容 CMS | 数据中心 │
├─────────────────────────────────────────┤
│           基础设施层                     │
│  PostgreSQL | Redis | S3 | K8s | CDN    │
└─────────────────────────────────────────┘
```

**检查清单:**
- [ ] 所有功能模块设计时考虑复用性
- [ ] 用户中心、支付中心等核心模块独立封装
- [ ] 代码结构清晰，便于后续产品复制
- [ ] 文档完整，后续团队可快速上手
- [ ] 第一个产品验证引擎，后续产品开发时间缩短 70-85%

**未来项目应用:**
- 开发每个功能时问："这个能在其他产品复用吗？"
- 通用模块抽象到引擎层
- 产品特定逻辑放在产品层
- 第二个产品开发目标：7-10 天完成

---

### 1️⃣ 依赖必须显式声明

**教训来源:** `email-validator` 缺失导致后端启动失败

**规则:**
```bash
# ❌ 错误：假设依赖已安装或传递依赖
# ✅ 正确：requirements.txt 显式声明所有依赖

# 即使是可选依赖也要展开写清楚
pydantic==2.5.3
email-validator==2.1.0  # ← Pydantic email 验证需要，必须显式声明
```

**检查清单:**
- [ ] 所有 import 的包都在 requirements.txt 中
- [ ] 在干净 Docker 环境中测试过（`docker build --no-cache`）
- [ ] 可选依赖已展开写明（如 `pydantic[email]` → `email-validator`）

**未来项目应用:**
- 新增依赖后立即更新 requirements.txt
- 每月至少一次 `docker build --no-cache` 验证
- 代码审查时检查依赖变更

---

### 2️⃣ 部署脚本必须幂等

**教训来源:** 容器名称冲突导致重复部署失败

**规则:**
```bash
# ✅ 标准部署流程（永远按这个顺序）
docker-compose down || true    # 1. 先停旧服务（容错）
docker-compose build           # 2. 构建新镜像
docker-compose up -d           # 3. 启动新服务
sleep 30                       # 4. 等待服务就绪
curl -f http://localhost/health # 5. 健康检查
```

**检查清单:**
- [ ] 脚本可以重复执行不报错
- [ ] 关键步骤有 `|| true` 容错
- [ ] 部署后有健康检查
- [ ] 有回滚方案

**未来项目应用:**
- 所有部署脚本支持重复执行
- 关键步骤添加回滚机制
- 部署后自动健康检查

---

### 3️⃣ 国内部署必须配置镜像源

**教训来源:** Docker 构建超时、pip 下载慢、Git 推送失败

**规则:**
```dockerfile
# ✅ Dockerfile 标配（国内部署）
FROM python:3.11-slim

# 配置 pip 国内源（清华/阿里/中科大）
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn

# 配置 npm 国内源（如需要）
RUN npm config set registry https://registry.npmmirror.com
```

```yaml
# ✅ GitHub Actions 标配
- name: Configure Docker mirrors
  run: |
    sudo tee /etc/docker/daemon.json <<-'EOF'
    {
      "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1panel.live"
      ]
    }
    EOF
```

**镜像源清单:**
- PyPI: https://pypi.tuna.tsinghua.edu.cn/simple
- npm: https://registry.npmmirror.com
- Docker: docker.m.daocloud.io, docker.1panel.live
- GitHub: ghproxy.com (代理)

**未来项目应用:**
- 所有外部依赖配置备用源
- 网络问题快速诊断脚本
- 建立国内部署镜像配置模板

---

### 4️⃣ 基础设施版本要明确指定

**教训来源:** docker-compose v1.29.2 不兼容导致部署失败

**规则:**
```yaml
# ✅ 部署脚本中明确版本
- name: Install docker-compose v2
  run: |
    sudo curl -SL "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64" \
      -o ~/.docker/cli-plugins/docker-compose
    sudo chmod +x ~/.docker/cli-plugins/docker-compose
```

**版本检查清单:**
- [ ] Docker 版本 ≥ 20.10
- [ ] Docker Compose 版本 ≥ 2.20
- [ ] Python 版本与 requirements.txt 一致
- [ ] Node.js 版本与 package.json 一致

**未来项目应用:**
- 所有工具版本写入文档
- 部署脚本自动检查版本
- 建立基础设施版本矩阵

---

### 5️⃣ YAML 配置要简单化

**教训来源:** 多次 YAML 语法错误（heredoc、变量传递）

**规则:**
```yaml
# ❌ 复杂嵌套（容易出错）
script: |
  echo "config" <<-'EOF'
  {...}
  EOF

# ✅ 简单直接（不易出错）
script: |
  echo "Step 1: Configure..."
  echo "Step 2: Build..."
  echo "Step 3: Deploy..."

# ✅ 或者外部化脚本
- name: Deploy
  run: bash ./deploy.sh  # 复杂逻辑写到独立脚本
```

**YAML 检查清单:**
- [ ] 避免复杂 heredoc 嵌套
- [ ] 变量传递用最简单方式
- [ ] 复杂逻辑外部化为脚本文件
- [ ] 用 yamllint 验证语法

**未来项目应用:**
- 使用 YAML 验证工具（yamllint）
- 复杂逻辑外部化
- 变量传递用最简单方式

---

### 6️⃣ 先停后启是标准部署流程

**教训来源:** 容器名称冲突

**规则:**
```bash
# ✅ 永远按这个顺序
docker-compose down    # 停止并删除旧容器
docker-compose build   # 构建新镜像
docker-compose up -d   # 启动新容器

# ❌ 永远不要这样
docker-compose up -d   # 直接启动会冲突
```

**检查清单:**
- [ ] 部署前先 `docker-compose down`
- [ ] 构建新镜像 `docker-compose build`
- [ ] 启动新服务 `docker-compose up -d`
- [ ] 等待服务就绪 `sleep 30`
- [ ] 健康检查 `curl -f http://localhost/health`

**未来项目应用:**
- 所有部署流程标准化
- 写入部署文档
- 自动化脚本中强制执行

---

### 7️⃣ 错误处理要容错

**教训来源:** 非关键错误阻塞整个部署流程

**规则:**
```bash
# ✅ 关键步骤（失败要停止）
set -e
docker-compose build    # 构建失败要停止

# ✅ 非关键步骤（失败继续）
docker-compose down || true    # 没有旧容器也继续
alembic upgrade head || true   # 迁移失败也继续（可能已最新）
```

**错误处理清单:**
- [ ] 关键步骤用 `set -e`
- [ ] 非关键步骤加 `|| true`
- [ ] 每个步骤有清晰日志
- [ ] 最终有健康检查

**未来项目应用:**
- 区分关键和非关键步骤
- 错误日志清晰可读
- 部署最终状态明确

---

### 8️⃣ 变量作用域要明确

**教训来源:** GitHub Actions 变量传递失败（REPO_URL 为空）

**规则:**
```yaml
# ✅ 在 script 内直接定义（最可靠）
script: |
  REPO_URL="lina0437/python-learning-platform"
  ECS_HOST="${{ secrets.ECS_HOST }}"
  echo "REPO_URL: ${REPO_URL}"

# ❌ 不要依赖复杂的变量传递
env:
  REPO_URL: ${{ github.repository }}  # 可能不生效
```

**变量检查清单:**
- [ ] 每个关键变量都 echo 验证
- [ ] 区分 GitHub Actions 变量和 shell 变量
- [ ] 简单场景直接硬编码

**未来项目应用:**
- 变量传递用最简单方式
- 关键变量打印验证
- 避免复杂的作用域嵌套

---

### 9️⃣ 部署后必须健康检查

**教训来源:** 部署"成功"但服务实际不可用

**规则:**
```yaml
# ✅ 部署流程最后一步
- name: Health Check
  run: |
    sleep 30  # 等待服务启动
    curl -f http://localhost/health || exit 1
    curl -f http://localhost/ || exit 1
```

**健康检查清单:**
- [ ] API 健康端点返回 200
- [ ] 前端页面可访问
- [ ] 数据库连接正常
- [ ] 关键功能测试通过

**未来项目应用:**
- 所有部署流程包含健康检查
- 健康检查失败自动回滚
- 健康检查指标明确

---

### 🔟 在干净环境测试依赖完整性

**教训来源:** 本地开发正常，生产环境缺少依赖

**规则:**
```bash
# ✅ 定期在干净环境测试
docker build --no-cache -t test-backend .
docker run --rm test-backend python -c "import app; print('OK')"

# 或者
docker-compose -f docker-compose.test.yml up --build
```

**测试清单:**
- [ ] 每月至少一次 `docker build --no-cache`
- [ ] 新增依赖后立即测试
- [ ] 代码审查时检查依赖变更

**未来项目应用:**
- 建立依赖审查流程
- 使用 pip-tools 或 poetry 管理依赖
- 文档化所有可选依赖

---

## 🏗️ 产品矩阵架构设计

### 三层架构

**产品层（Product Layer）**
- Python 学习平台（当前）
- 未来产品 2（待定义）
- 未来产品 3（待定义）

**引擎层（Engine Layer）** - 🔴 **高复用性模块**
- 用户中心（注册/登录/权限）
- 支付中心（订单/优惠券/发票）
- 内容 CMS（课程/文章/媒体）
- 数据中心（统计/分析/报表）
- 消息中心（邮件/短信/推送）

**基础设施层（Infrastructure Layer）**
- PostgreSQL（数据库）
- Redis（缓存）
- S3（对象存储）
- K8s（容器编排）
- CDN（内容分发）

### 复用性设计原则

```
✅ 正确做法：
- 用户认证模块 → 独立包，其他产品直接引用
- 支付流程 → 配置化，支持不同产品定价策略
- 内容管理 → 通用 schema，支持课程/文章/视频
- 数据看板 → 可配置指标，适配不同业务

❌ 错误做法：
- 硬编码产品名称
- 耦合特定业务逻辑
- 缺少配置化设计
- 文档不完整
```

### 引擎层模块开发优先级

| 模块 | 优先级 | 复用度 | 开发阶段 |
|------|--------|--------|----------|
| 用户中心 | 🔴 高 | 100% | 阶段 1 |
| 支付中心 | 🔴 高 | 100% | 阶段 4 |
| 内容 CMS | 🟡 中 | 80% | 阶段 2 |
| 数据中心 | 🟡 中 | 90% | 阶段 2 |
| 消息中心 | 🟢 低 | 70% | 阶段 3 |

---

## 📋 快速检查清单

### 开发阶段
```bash
# 依赖检查
- [ ] requirements.txt 包含所有 import 的包
- [ ] 在干净 Docker 环境测试过
- [ ] 可选依赖已展开写明

# 代码审查
- [ ] 依赖变更已记录
- [ ] 环境变量已文档化
- [ ] 数据库迁移已测试
```

### 部署阶段
```bash
# 部署前
- [ ] 所有测试通过
- [ ] 依赖已锁定版本
- [ ] 环境变量已配置
- [ ] 回滚方案已准备

# 部署中
- [ ] docker-compose down
- [ ] docker-compose build
- [ ] docker-compose up -d
- [ ] sleep 30
- [ ] curl -f http://localhost/health

# 部署后
- [ ] API 健康检查通过
- [ ] 前端页面可访问
- [ ] 日志无严重错误
```

### 运维阶段
```bash
# 日常检查
- [ ] 容器状态正常 (docker-compose ps)
- [ ] 磁盘使用率 < 80%
- [ ] 日志无异常错误

# 定期维护
- [ ] 每周 docker system prune
- [ ] 每月更新依赖
- [ ] 每季度安全审计
```

---

## 🎯 新项目启动清单

### 技术选型阶段
- [ ] 确认所有技术在国内可访问
- [ ] 配置国内镜像源
- [ ] 明确所有工具版本要求

### 项目初始化
- [ ] 创建 requirements.txt（包含所有依赖）
- [ ] 配置 Docker 国内镜像源
- [ ] 编写标准部署脚本（幂等）
- [ ] 配置 GitHub Actions（简单 YAML）

### 首次部署前
- [ ] 在干净环境测试依赖
- [ ] 本地运行完整部署流程
- [ ] 准备回滚方案
- [ ] 配置监控告警

---

## 🚨 常见错误快速诊断

### 后端启动失败
```bash
# 1. 查看日志
docker-compose logs backend

# 2. 常见错误
ImportError: xxx is not installed  → 添加依赖到 requirements.txt
KeyError: 'ContainerConfig'       → 升级 docker-compose 到 v2
Connection refused                → 检查端口和防火墙
```

### 部署失败
```bash
# 1. 查看 GitHub Actions 日志
https://github.com/xxx/xxx/actions

# 2. 常见错误
Container name already in use     → 先 docker-compose down
YAML syntax error                 → 简化 YAML，外部化脚本
Variable is empty                 → 在 script 内直接定义
```

### 网络问题
```bash
# 1. 测试连接
curl -I https://github.com
curl -I https://pypi.org

# 2. 配置镜像
git config --global url."https://ghproxy.com/".insteadOf "https://github.com/"
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

---

## 💡 记忆口诀

> **产品矩阵:** 引擎复用，快速复制  
> **依赖管理:** 显式声明，干净测试  
> **部署流程:** 先停后启，幂等设计  
> **国内部署:** 镜像源配置，一个不能少  
> **YAML 配置:** 简单为王，复杂外化  
> **错误处理:** 关键停止，非关键继续  
> **健康检查:** 部署最后一步，必须验证  
> **变量传递:** 直接定义，简单可靠  
> **版本管理:** 明确指定，自动检查  

---

## 📊 问题统计（本次项目）

### 按严重级别
| 级别 | 数量 | 占比 |
|------|------|------|
| 🔴 高 | 6 | 75% |
| 🟡 中 | 2 | 25% |
| 🟢 低 | 0 | 0% |

### 按问题类型
| 类型 | 数量 | 占比 |
|------|------|------|
| 依赖管理 | 2 | 25% |
| 部署配置 | 3 | 37.5% |
| 基础设施 | 2 | 25% |
| 网络问题 | 1 | 12.5% |

### 根因归类
| 原因 | 占比 |
|------|------|
| 知识盲区 | 40% |
| 流程缺失 | 35% |
| 配置不当 | 25% |

---

## 🎓 如何应用这些经验

### 每次开发前
1. 打开 GOLDEN_RULES.md
2. 快速浏览 TOP 10
3. 对照检查清单

### 每次部署前
1. 运行部署检查清单
2. 确认所有步骤已准备
3. 准备好回滚方案

### 每次遇到问题
1. 先查看"常见错误快速诊断"
2. 对照经验找根因
3. 解决后更新这个文档

### 每个新项目
1. 复制这个文档到新项目
2. 根据项目特点调整
3. 项目结束后更新经验

---

## 📚 相关文档

- **POST_MORTEM.md** - 详细复盘报告（834 行）
- **LESSONS_LEARNED.md** - 经验教训清单（428 行）
- **GOLDEN_RULES.md** - 核心经验法则（本文档）
- **IMPLEMENTATION_PLAN.md** - 实施计划
- **DESIGN_PROPOSAL.md** - 设计方案

---

## ✅ 承诺

**我承诺：**

1. ✅ 每次开发前自动回顾这个清单
2. ✅ 遇到新问题时先对照清单
3. ✅ 解决新问题后立即更新清单
4. ✅ 新项目启动时复制这份清单

**监督方式：**
- 下次犯类似错误时，直接问："你看过 GOLDEN_RULES.md 吗？"
- 每次部署前让我对照检查清单
- 新项目启动时让我先读这份文档

---

**最后提醒:** 经验的价值在于应用，不在于记录。每次开发前花 5 分钟回顾，可以避免几小时的调试时间！

---

**文档维护:** 每次遇到新问题或找到更好方法，立即更新这个文档。

**下次复盘时间:** 2026-04-24

**创建时间:** 2026-03-25 09:43  
**状态:** 🟢 生效中
