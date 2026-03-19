# 明天部署计划 (2026-03-20)

## 📋 部署信息

| 项目 | 值 |
|------|-----|
| 服务器 | 阿里云 ECS |
| 地域 | 北京 |
| 配置 | 2 核 8G |
| 系统 | Ubuntu 22.04 64 位 |
| 公网 IP | 8.131.100.101 |
| 访问地址 | http://8.131.100.101 |

---

## ⏰ 时间安排

### 上午 10:00 - 部署准备 (30 分钟)

- [ ] 确认本地代码已提交
- [ ] 确认 GitHub 仓库是最新的
- [ ] 确认阿里云安全组已配置
- [ ] 准备 SSH 登录

### 上午 10:30 - 执行部署 (1 小时)

- [ ] SSH 登录 ECS
- [ ] 执行部署脚本
- [ ] 等待服务启动
- [ ] 验证服务状态

### 上午 11:30 - 功能测试 (1 小时)

- [ ] 访问前端页面
- [ ] 测试注册/登录
- [ ] 测试课程功能
- [ ] 检查日志

### 下午 - 优化和分享

- [ ] 修复发现的问题
- [ ] 性能优化
- [ ] 分享给朋友测试

---

## 🚀 部署步骤详解

### 步骤 1: 确认本地代码

```bash
# 在项目根目录
cd C:\Users\28917\.easyclaw\workspace\python-learning-platform

# 查看状态
git status

# 如果有未提交的更改
git add .
git commit -m "feat: 准备部署"
git push origin main
```

---

### 步骤 2: 配置阿里云安全组

**重要**: 必须先配置，否则无法访问！

1. 登录 [阿里云 ECS 控制台](https://ecs.console.aliyun.com/)
2. 找到你的实例 (北京区域)
3. 点击 **更多** → **网络和安全组** → **安全组配置**
4. 添加入站规则：

| 端口范围 | 授权对象 | 优先级 | 描述 |
|----------|----------|--------|------|
| 22/22 | 0.0.0.0/0 | 1 | SSH |
| 80/80 | 0.0.0.0/0 | 1 | HTTP |
| 443/443 | 0.0.0.0/0 | 1 | HTTPS (可选) |

---

### 步骤 3: SSH 登录 ECS

**方式 A: 使用密码登录** (阿里云默认通过控制台重置密码)

1. 在 ECS 控制台重置实例密码
2. 使用 SSH 客户端登录：
```bash
ssh root@8.131.100.101
# 输入重置后的密码
```

**方式 B: 使用 SSH 密钥登录** (推荐)

1. 本地生成密钥对 (如果还没有):
```bash
ssh-keygen -t ed25519
```

2. 在阿里云控制台绑定公钥:
   - 实例详情 → 绑定/解绑 SSH 密钥
   - 重启实例生效

3. 登录:
```bash
ssh -i ~/.ssh/id_ed25519 root@8.131.100.101
```

**方式 C: 使用阿里云 Workbench** (最简单)

1. ECS 控制台 → 远程连接
2. 点击 **Workbench 远程连接**
3. 自动登录

---

### 步骤 4: 执行部署脚本

登录 ECS 后执行：

```bash
# 1. 更新系统
sudo apt-get update

# 2. 下载部署脚本 (如果还没有)
# 可以通过 scp 上传，或者在控制台使用云助手

# 3. 执行部署脚本
cd /root
sudo bash ecs-deploy.sh
```

**执行时间**: 约 5-10 分钟 (首次下载 Docker)

---

### 步骤 5: 部署代码

```bash
# 方式 A: 从 GitHub 克隆 (推荐)
sudo bash ecs-auto-deploy.sh https://github.com/your-username/python-learning-platform.git

# 方式 B: 手动上传
# 使用 scp 或 FTP 将代码上传到 /opt/python-learning
```

---

### 步骤 6: 验证部署

```bash
# 1. 检查服务状态
sudo docker-compose ps

# 2. 查看日志
sudo docker-compose logs -f

# 3. 测试 API
curl http://localhost:8000/health

# 4. 访问前端
# 浏览器打开：http://8.131.100.101
```

---

## ✅ 验收清单

### 基础设施

- [ ] Docker 运行正常
- [ ] 所有容器启动成功
- [ ] 数据库正常连接
- [ ] Redis 正常连接

### 前端

- [ ] 首页可访问
- [ ] 页面样式正常
- [ ] 导航栏正常
- [ ] 移动端适配 (可选)

### 后端

- [ ] API 文档可访问
- [ ] 健康检查通过
- [ ] 数据库迁移完成
- [ ] 示例课程数据已创建

### 功能测试

- [ ] 用户可以注册
- [ ] 用户可以登录
- [ ] 可以查看课程列表
- [ ] 可以查看课程详情
- [ ] 可以进入学习页面

### 性能

- [ ] 页面加载 < 3 秒
- [ ] API 响应 < 500ms
- [ ] 无明显卡顿

---

## 🐛 故障排查

### 问题 1: 无法访问网站

**检查**:
```bash
# 1. 检查服务状态
sudo docker-compose ps

# 2. 检查端口
sudo netstat -tlnp | grep :80

# 3. 检查防火墙
sudo ufw status

# 4. 检查阿里云安全组 (控制台)
```

**解决**:
```bash
# 重启所有服务
cd /opt/python-learning
sudo docker-compose restart
```

---

### 问题 2: 数据库连接失败

**检查**:
```bash
# 查看后端日志
sudo docker-compose logs backend

# 检查数据库容器
sudo docker-compose ps postgres
```

**解决**:
```bash
# 重启数据库
sudo docker-compose restart postgres

# 等待数据库就绪
sleep 10

# 重启后端
sudo docker-compose restart backend
```

---

### 问题 3: 磁盘空间不足

**检查**:
```bash
df -h
```

**解决**:
```bash
# 清理 Docker 资源
sudo docker system prune -a

# 查看日志大小
sudo du -sh /var/lib/docker/containers/*
```

---

### 问题 4: 内存不足

**检查**:
```bash
free -h
```

**解决**:
```bash
# 配置 Swap (如果还没有)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 📊 部署后监控

### 实时监控

```bash
# 查看所有容器日志
sudo docker-compose logs -f

# 查看特定服务日志
sudo docker-compose logs -f backend
sudo docker-compose logs -f nginx

# 查看资源使用
docker stats
```

### 定期检查

```bash
# 每天检查服务状态
sudo docker-compose ps

# 每周清理一次
sudo docker system prune -f
```

---

## 🔄 更新部署

### 日常更新

```bash
cd /opt/python-learning

# 1. 拉取最新代码
sudo docker-compose exec backend git pull

# 2. 重新构建
sudo docker-compose build

# 3. 重启服务
sudo docker-compose up -d

# 4. 数据库迁移
sudo docker-compose exec backend alembic upgrade head
```

### 使用自动部署脚本

```bash
sudo bash ecs-auto-deploy.sh https://github.com/your-username/python-learning-platform.git
```

---

## 📝 重要信息记录

### 服务器信息

```
公网 IP: 8.131.100.101
SSH 端口：22
用户名：root
密码：(记录在安全的地方)
```

### 数据库信息

```
主机：localhost (容器内：postgres)
端口：5432
数据库：python_learning
用户：postgres
密码：(部署时生成，记录在 /opt/python-learning/.env)
```

### JWT 密钥

```
密钥：(部署时生成，记录在 /opt/python-learning/.env)
⚠️ 重要：不要泄露，不要提交到 Git
```

---

## 🎯 成功标准

部署成功的标志：

1. ✅ 可以访问 http://8.131.100.101
2. ✅ 可以注册和登录
3. ✅ 可以查看课程
4. ✅ 所有服务运行正常
5. ✅ 日志无错误
6. ✅ 性能满足要求

---

## 📞 需要帮助？

遇到问题时：

1. **查看日志**: `sudo docker-compose logs -f`
2. **检查状态**: `sudo docker-compose ps`
3. **重启服务**: `sudo docker-compose restart`
4. **联系我**: 把错误信息发给我

---

## 🎉 部署完成后

1. **分享测试** - 把链接发给朋友测试
2. **收集反馈** - 记录用户反馈
3. **持续优化** - 根据反馈改进
4. **监控运行** - 定期检查服务状态

---

**祝明天部署顺利！** 🚀

**准备时间**: 今天  
**部署时间**: 明天上午  
**预计总耗时**: 2-3 小时
