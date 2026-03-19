# 自动化部署完整指南

## 🎯 方案概述

**使用 GitHub Actions 实现全自动部署**

```
你写代码 → git push → GitHub Actions → 自动部署 → ECS
                                    ↓
                              Secrets 中的凭证
                              (加密存储，安全)
```

---

## 📋 前提条件

- [x] 已撤销旧的 GitHub Token
- [x] 已更改 ECS 密码
- [ ] 已配置 GitHub Secrets (下一步)
- [ ] 已添加 SSH 公钥到 ECS

---

## 步骤 1: 配置 GitHub Secrets (5 分钟)

### 1.1 访问 Secrets 设置

打开链接：
```
https://github.com/lina0437/python-learning-platform/settings/secrets/actions
```

### 1.2 添加 ECS_HOST

1. 点击 **"New repository secret"**
2. 填写：
   ```
   Name: ECS_HOST
   Value: 8.131.100.101
   ```
3. 点击 **"Add secret"**

### 1.3 添加 ECS_USER

1. 点击 **"New repository secret"**
2. 填写：
   ```
   Name: ECS_USER
   Value: ecs-user
   ```
3. 点击 **"Add secret"**

### 1.4 添加 ECS_SSH_KEY

**首先需要获取 SSH 私钥内容**:

```bash
# 在本地查看私钥 (Windows)
type C:\Users\你的用户名\.ssh\id_ed25519

# 或者使用 Git Bash
cat ~/.ssh/id_ed25519
```

**然后添加到 GitHub**:

1. 点击 **"New repository secret"**
2. 填写：
   ```
   Name: ECS_SSH_KEY
   Value: (粘贴整个私钥内容，包括 BEGIN 和 END)
   ```
3. 点击 **"Add secret"**

**私钥格式示例**:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACB+ZwK... (很长的一串)
-----END OPENSSH PRIVATE KEY-----
```

⚠️ **重要**: 必须包含 `-----BEGIN...` 和 `-----END...` 行

---

## 步骤 2: 配置 ECS 允许 SSH 登录 (10 分钟)

### 2.1 确保 ECS 安全组已配置

1. 登录 [阿里云 ECS 控制台](https://ecs.console.aliyun.com/)
2. 找到你的实例 (北京区域)
3. 点击 **更多** → **网络和安全组** → **安全组配置**
4. 确保有以下规则：

| 端口范围 | 授权对象 | 描述 |
|----------|----------|------|
| 22/22 | 0.0.0.0/0 | SSH |
| 80/80 | 0.0.0.0/0 | HTTP |

### 2.2 确保 SSH 公钥已添加到 ECS

**方式 A: 使用阿里云控制台 (推荐)**

1. ECS 控制台 → 网络与安全 → SSH 密钥对
2. 创建或导入密钥对
3. 绑定到你的 ECS 实例
4. 重启实例

**方式 B: 手动添加**

如果已有 SSH 访问，可以手动添加：

```bash
# SSH 登录 ECS
ssh ecs-user@8.131.100.101

# 创建 .ssh 目录
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 添加公钥 (将 YOUR_PUBLIC_KEY 替换为你的公钥)
echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 步骤 3: 推送代码到 GitHub (2 分钟)

### 方式 A: 使用一键脚本 (推荐)

```bash
# 在项目根目录，双击运行
git-push.bat
```

按照提示：
1. 输入 Git 用户名 (如果是首次)
2. 输入 Git 邮箱 (如果是首次)
3. 输入提交信息
4. 自动推送到 GitHub

### 方式 B: 手动推送

```bash
# 在项目根目录
git add .
git commit -m "feat: 添加自动部署配置"
git push -u origin main
```

---

## 步骤 4: 查看部署进度 (5-10 分钟)

### 4.1 访问 GitHub Actions

打开链接：
```
https://github.com/lina0437/python-learning-platform/actions
```

### 4.2 查看部署日志

1. 点击最新的工作流运行 (应该显示 "Deploy to ECS")
2. 点击 **"deploy"** 任务
3. 查看实时日志

**预期日志**:
```
✅ Checkout code
✅ Setup SSH
✅ Deploy to ECS
  🚀 开始部署...
  📦 克隆仓库...
  ⚙️ 创建环境变量...
  🔨 构建 Docker 镜像...
  🚀 启动服务...
  📊 执行数据库迁移...
  🌱 创建示例课程数据...
  ✅ 部署完成！
```

### 4.3 等待部署完成

首次部署需要 **5-10 分钟** (下载 Docker 镜像)

---

## 步骤 5: 验证部署

### 5.1 访问前端

浏览器打开：
```
http://8.131.100.101
```

应该能看到首页

### 5.2 访问 API 文档

浏览器打开：
```
http://8.131.100.101/docs
```

应该能看到 Swagger API 文档

### 5.3 测试功能

- [ ] 访问首页
- [ ] 注册账号
- [ ] 登录
- [ ] 查看课程列表
- [ ] 查看课程详情

---

## 🔄 后续部署

### 日常部署 (超简单)

每次修改代码后：

```bash
# 方式 A: 使用脚本
git-push.bat

# 方式 B: 手动
git add .
git commit -m "feat: 你的修改"
git push
```

**GitHub Actions 会自动部署！**

### 手动触发部署

如果需要重新部署：

1. 访问：https://github.com/lina0437/python-learning-platform/actions/workflows/deploy.yml
2. 点击右上角 **"Run workflow"**
3. 选择分支 (main)
4. 点击 **"Run workflow"**

---

## 🐛 故障排查

### 问题 1: GitHub Actions 失败

**查看日志**:
```
https://github.com/lina0437/python-learning-platform/actions
```

**常见错误**:

**错误**: `Permission denied (publickey)`
**解决**: 
- 检查 ECS_SSH_KEY 是否正确
- 确保包含 BEGIN 和 END 行
- 检查 ECS 上的 authorized_keys

**错误**: `Connection timed out`
**解决**:
- 检查 ECS 安全组是否开放 22 端口
- 检查 ECS_HOST 是否正确

**错误**: `docker-compose: command not found`
**解决**:
- 首次部署会自动安装
- 检查部署日志

---

### 问题 2: 部署成功但无法访问网站

**检查 ECS 安全组**:
```
1. 阿里云 ECS 控制台
2. 安全组配置
3. 确保开放 80 端口
```

**检查服务状态**:
```bash
# SSH 登录 ECS
ssh ecs-user@8.131.100.101

# 查看容器状态
docker ps

# 查看日志
docker-compose logs -f
```

---

### 问题 3: 数据库连接失败

**查看后端日志**:
```bash
docker-compose logs backend
```

**重启服务**:
```bash
cd /opt/python-learning
docker-compose restart
```

---

## 📊 监控和维护

### 查看服务状态

```bash
# SSH 登录 ECS
ssh ecs-user@8.131.100.101

# 查看所有容器
docker ps

# 查看资源使用
docker stats
```

### 查看日志

```bash
# 所有服务日志
docker-compose logs -f

# 特定服务日志
docker-compose logs -f backend
docker-compose logs -f nginx
```

### 重启服务

```bash
docker-compose restart
```

### 更新部署

```bash
# 本地推送代码
git push

# 或者 SSH 到 ECS 手动更新
ssh ecs-user@8.131.100.101
cd /opt/python-learning
git pull
docker-compose build
docker-compose up -d
```

---

## 📝 检查清单

部署前检查：

- [ ] GitHub Secrets 已配置 (ECS_HOST, ECS_USER, ECS_SSH_KEY)
- [ ] ECS 安全组已开放 22 和 80 端口
- [ ] SSH 公钥已添加到 ECS
- [ ] 本地代码已提交

部署后检查：

- [ ] GitHub Actions 运行成功
- [ ] 可以访问 http://8.131.100.101
- [ ] API 文档可访问
- [ ] 注册/登录功能正常
- [ ] 课程数据已创建

---

## 🎯 成功标准

部署成功的标志：

1. ✅ GitHub Actions 显示 "success"
2. ✅ 可以访问 http://8.131.100.101
3. ✅ 可以注册和登录
4. ✅ 可以看到课程列表
5. ✅ 所有容器运行正常 (`docker ps`)
6. ✅ 日志无错误

---

## 📞 需要帮助？

遇到问题时：

1. **查看 GitHub Actions 日志**
   - https://github.com/lina0437/python-learning-platform/actions
   - 找到失败的运行
   - 查看错误信息

2. **查看 ECS 日志**
   ```bash
   ssh ecs-user@8.131.100.101
   docker-compose logs -f
   ```

3. **告诉我错误信息**
   - 截图或复制错误日志
   - 我会帮你解决

---

## 🎉 完成！

部署成功后：

1. **分享测试** - 把 http://8.131.100.101 发给朋友
2. **收集反馈** - 记录用户反馈
3. **持续开发** - 继续添加新功能
4. **自动部署** - 每次 git push 自动部署！

---

## 📚 相关文档

- [TODAY_TASKS.md](./TODAY_TASKS.md) - 今日任务清单
- [QUICK_START_TODAY.md](./QUICK_START_TODAY.md) - 本地开发指南
- [OFFLINE_DEV_GUIDE.md](./OFFLINE_DEV_GUIDE.md) - 离线开发指南
- [deploy/ECS_DEPLOY_GUIDE.md](./deploy/ECS_DEPLOY_GUIDE.md) - ECS 部署详细指南
- [deploy/TOMORROW_DEPLOY_PLAN.md](./deploy/TOMORROW_DEPLOY_PLAN.md) - 明天部署计划

---

**祝你部署顺利！** 🚀

**预计总时间**: 15-20 分钟 (首次)  
**后续部署时间**: 5-10 分钟 (自动)
