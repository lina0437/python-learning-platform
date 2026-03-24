# 核心经验教训清单

**目的:** 记住这次项目最关键的经验，在未来迭代和新项目中直接应用，避免重复犯错。

**更新日期:** 2026-03-24  
**适用范围:** 所有全栈项目（特别是 FastAPI + React + Docker 技术栈）

---

## 🔴 必须记住的 TOP 10 经验

### 1. 依赖必须显式声明

**教训:** `email-validator` 缺失导致后端启动失败

**记住:**
```bash
# ✅ 永远不要假设依赖已安装
# ❌ 错误：依赖传递依赖或环境已有包
# ✅ 正确：requirements.txt 显式声明所有依赖

# 即使是可选依赖也要写清楚
pydantic==2.5.3
email-validator==2.1.0  # ← Pydantic email 验证需要
```

**检查清单:**
- [ ] 所有 import 的包都在 requirements.txt 中
- [ ] 在干净 Docker 环境中测试过（`docker build --no-cache`）
- [ ] 可选依赖已展开写明

---

### 2. 部署脚本必须幂等

**教训:** 容器名称冲突导致重复部署失败

**记住:**
```bash
# ✅ 标准部署流程（永远按这个顺序）
docker-compose down || true    # 1. 先停旧服务
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

---

### 3. 国内部署必须配置镜像源

**教训:** Docker 构建超时、pip 下载慢

**记住:**
```dockerfile
# ✅ Dockerfile 标配
FROM python:3.11-slim

# 配置 pip 国内源（清华/阿里/中科大）
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

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

---

### 4. 基础设施版本要明确指定

**教训:** docker-compose v1.29.2 不兼容导致部署失败

**记住:**
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

---

### 5. YAML 配置要简单化

**教训:** 多次 YAML 语法错误（heredoc、变量传递）

**记住:**
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

---

### 6. 在干净环境测试依赖完整性

**教训:** 本地开发正常，生产环境缺少依赖

**记住:**
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

---

### 7. 先停后启是标准部署流程

**教训:** 容器名称冲突

**记住:**
```bash
# ✅ 永远按这个顺序
docker-compose down    # 停止并删除旧容器
docker-compose build   # 构建新镜像
docker-compose up -d   # 启动新容器

# ❌ 永远不要这样
docker-compose up -d   # 直接启动会冲突
```

---

### 8. 错误处理要容错

**教训:** 非关键错误阻塞整个部署流程

**记住:**
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

---

### 9. 变量作用域要明确

**教训:** GitHub Actions 变量传递失败

**记住:**
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

---

### 10. 部署后必须健康检查

**教训:** 部署"成功"但服务实际不可用

**记住:**
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

## 📚 推荐工具和资源

### 依赖管理
- `pip-tools` - 锁定依赖版本
- `poetry` - 现代化 Python 依赖管理
- `dependabot` - 自动更新依赖

### 代码质量
- `yamllint` - YAML 语法检查
- `black` - Python 代码格式化
- `prettier` - 前端代码格式化

### 监控告警
- `Sentry` - 错误追踪
- `Uptime Kuma` - 服务监控
- `Better Stack` - 日志管理

### 文档模板
- 部署检查清单模板
- 运维手册模板
- 故障诊断模板

---

## 💡 记忆口诀

**依赖管理:** 显式声明，干净测试  
**部署流程:** 先停后启，幂等设计  
**国内部署:** 镜像源配置，一个不能少  
**YAML 配置:** 简单为王，复杂外化  
**错误处理:** 关键停止，非关键继续  
**健康检查:** 部署最后一步，必须验证  

---

## 🎓 如何应用这些经验

### 每次开发前
1. 打开这个文档
2. 快速浏览 TOP 10 经验
3. 对照检查清单

### 每次部署前
1. 运行部署检查清单
2. 确认所有步骤已准备
3. 准备好回滚方案

### 每次遇到问题
1. 先查看"常见错误快速诊断"
2. 对照经验清单找根因
3. 解决后更新这个文档

### 每个新项目
1. 复制这个文档到新项目
2. 根据项目特点调整
3. 项目结束后更新经验

---

**最后提醒:** 经验的价值在于应用，不在于记录。每次开发前花 5 分钟回顾，可以避免几小时的调试时间！

---

**文档维护:** 每次遇到新问题或找到更好方法，立即更新这个文档。

**下次复盘时间:** 2026-04-24
