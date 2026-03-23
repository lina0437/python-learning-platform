# GitHub Secrets 配置指南

## 🔐 需要配置的 Secrets

### 必须配置 🔴

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `ECS_HOST` | ECS 服务器公网 IP 或域名 | `8.131.100.101` |
| `ECS_USER` | SSH 登录用户名 | `root` 或 `ubuntu` |
| `ECS_SSH_KEY` | SSH 私钥（完整内容） | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### 可选配置 🟡

| Secret 名称 | 说明 | 默认值 |
|------------|------|--------|
| `DOCKER_USERNAME` | Docker Hub 用户名（如使用） | - |
| `DOCKER_PASSWORD` | Docker Hub 密码/Token（如使用） | - |

---

## 📋 配置步骤

### 步骤 1: 获取 ECS 信息

#### 1.1 获取 ECS 公网 IP

```bash
# 登录阿里云控制台
# 进入 ECS 实例列表
# 复制公网 IP 地址
```

**示例**: `8.131.100.101`

#### 1.2 确认 SSH 用户名

- **Ubuntu**: 通常是 `ubuntu`
- **Alibaba Cloud Linux**: 通常是 `root`
- **CentOS**: 通常是 `root`

**测试连接**:
```bash
ssh root@8.131.100.101
# 或
ssh ubuntu@8.131.100.101
```

#### 1.3 生成/获取 SSH 密钥

**方法 A: 使用已有密钥**

```bash
# 查看已有 SSH 公钥
cat ~/.ssh/id_rsa.pub

# 查看私钥（用于 GitHub Secrets）
cat ~/.ssh/id_rsa
```

**方法 B: 生成新密钥**

```bash
# 生成 SSH 密钥对
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github-actions

# 查看私钥（复制到 GitHub Secrets）
cat ~/.ssh/github-actions

# 将公钥添加到 ECS
ssh-copy-id -i ~/.ssh/github-actions.pub root@8.131.100.101
```

**方法 C: 使用阿里云密钥对**

1. 登录阿里云控制台
2. 进入 ECS → 网络与安全 → 密钥对
3. 创建或导入密钥对
4. 绑定到 ECS 实例
5. 下载私钥文件（`.pem`）
6. 转换格式（如需要）:
   ```bash
   ssh-keygen -p -m PEM -f your-key.pem
   cat your-key.pem
   ```

---

### 步骤 2: 配置 GitHub Secrets

#### 2.1 进入 Secrets 设置页面

1. 打开 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 左侧菜单选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**

#### 2.2 添加 Secret

**添加 ECS_HOST:**
```
Name: ECS_HOST
Value: 8.131.100.101  # 你的 ECS 公网 IP
```

**添加 ECS_USER:**
```
Name: ECS_USER
Value: root  # 或 ubuntu
```

**添加 ECS_SSH_KEY:**
```
Name: ECS_SSH_KEY
Value: -----BEGIN OPENSSH PRIVATE KEY-----
       (完整的私钥内容，包括所有行)
       -----END OPENSSH PRIVATE KEY-----
```

---

### 步骤 3: 验证配置

#### 3.1 测试 SSH 连接（本地）

```bash
# 测试 SSH 连接
ssh -i ~/.ssh/id_rsa root@8.131.100.101

# 应该能成功登录，无需密码
```

#### 3.2 测试 GitHub Actions

1. 提交一个小改动到仓库
2. Push 到 main 分支
3. 观察 Actions 标签页
4. 查看部署日志

**或手动触发:**
1. 进入 Actions 标签
2. 选择 "Deploy to ECS" 工作流
3. 点击 "Run workflow"
4. 选择 main 分支
5. 点击 "Run workflow"

---

## 🔍 常见问题排查

### 问题 1: SSH 连接失败

**错误**: `Permission denied (publickey)`

**解决**:
```bash
# 1. 验证私钥格式正确（包含 BEGIN/END 标记）
# 2. 确保公钥已添加到 ECS 的 ~/.ssh/authorized_keys
# 3. 检查 SSH 权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 问题 2: ECS_HOST 无法连接

**错误**: `Connection timed out`

**解决**:
```bash
# 1. 检查 ECS 安全组是否开放 22 端口
# 2. 确认 ECS 公网 IP 正确
# 3. 测试本地连接
ping 8.131.100.101
telnet 8.131.100.101 22
```

### 问题 3: Secrets 未生效

**错误**: `Warning: Skip output '...' since it may contain secret.`

**解决**:
- 这是正常行为，GitHub 会隐藏包含秘密的输出
- 检查 Secrets 名称是否正确（区分大小写）
- 确保在仓库级别配置（不是组织级别）

---

## 📝 配置检查清单

在继续部署前，请确认：

- [ ] ECS 服务器已创建并运行
- [ ] ECS 安全组开放了 22、80 端口
- [ ] SSH 密钥对已生成
- [ ] SSH 公钥已添加到 ECS
- [ ] 本地 SSH 连接测试成功
- [ ] GitHub Secrets 已配置（ECS_HOST、ECS_USER、ECS_SSH_KEY）
- [ ] 仓库已启用 GitHub Actions

---

## 🎯 下一步

配置完 Secrets 后，告诉我，我会继续执行：

- **任务 7**: 执行首次部署
- **任务 8**: 验证部署成功

---

## 💡 快速配置命令

```bash
# 一键测试 SSH 连接
ssh -o StrictHostKeyChecking=no root@8.131.100.101 "echo 'SSH connection successful!'"

# 检查 Docker 是否已安装
ssh root@8.131.100.101 "docker --version"

# 检查 Docker Compose
ssh root@8.131.100.101 "docker compose version"
```

---

**准备好了吗？配置完 Secrets 后告诉我，我们继续部署！** 🚀
