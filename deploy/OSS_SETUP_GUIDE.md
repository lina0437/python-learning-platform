# 阿里云 OSS 配置指南

**用途:** 配置视频、图片等文件上传功能  
**预计时间:** 10-15 分钟  
**难度:** ⭐⭐ 简单

---

## 📋 配置步骤

### 步骤 1: 登录阿里云控制台

1. 访问：https://www.aliyun.com
2. 登录你的阿里云账号
3. 进入控制台：https://usercenter2.aliyun.com/console

---

### 步骤 2: 创建 OSS Bucket

1. 访问 OSS 控制台：https://oss.console.aliyun.com
2. 点击 **"创建 Bucket"**
3. 填写信息：
   - **Bucket 名称:** `python-learning-platform`（全局唯一，如果被占用就换个名字）
   - **地域:** 选择离你最近的节点（例如：华东 1-杭州）
   - **读写权限:** 私有（推荐）
   - **存储类型:** 标准存储
   - **其他选项:** 默认
4. 点击 **"确定"** 创建

---

### 步骤 3: 创建 AccessKey

1. 访问 RAM 访问控制：https://ram.console.aliyun.com
2. 在左侧菜单选择 **"身份管理" → "用户"**
3. 点击 **"创建用户"**
4. 填写信息：
   - **登录名称:** `python-learning-platform`
   - **显示名称:** `Python 学习平台 OSS 访问`
   - **访问方式:** 勾选 **"OpenAPI 调用访问"**
5. 点击 **"确定"**
6. **重要:** 复制并保存 AccessKey ID 和 AccessKey Secret（只显示一次！）

---

### 步骤 4: 授予 OSS 权限

1. 在用户列表中找到刚创建的用户
2. 点击用户名称进入详情
3. 点击 **"权限管理"** 标签页
4. 点击 **"新增授权"**
5. 选择权限：
   - 搜索 `OSS`
   - 选择 **`AliyunOSSFullAccess`**（OSS 完全管理权限）
6. 点击 **"确定"**

---

### 步骤 5: 配置 CDN 加速（可选）

**为什么需要 CDN:**
- 加速视频播放
- 降低 OSS 流量成本
- 提升用户体验

**配置步骤:**

1. 访问 CDN 控制台：https://cdn.console.aliyun.com
2. 点击 **"域名管理" → "添加域名"**
3. 填写信息：
   - **域名:** 例如 `cdn.pythonlearn.com`（需要你有这个域名）
   - **业务类型:** 图片小文件
   - **服务范围:** 仅中国内地
   - **加速区域:** 根据你的用户选择
   - **源站信息:** 选择 OSS 域名，选择刚才创建的 Bucket
4. 点击 **"确定"**
5. **配置 CNAME:** 在你的域名服务商处添加 CNAME 记录
   - 主机记录：`cdn`
   - 记录类型：`CNAME`
   - 记录值：CDN 控制台提供的 CNAME 地址

---

### 步骤 6: 配置到项目中

**方式 A: 环境变量（推荐）**

在项目根目录创建 `.env` 文件（如果已有就追加）：

```bash
# 阿里云 OSS 配置
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
OSS_BUCKET=python-learning-platform
OSS_ACCESS_KEY_ID=LTAI5t...
OSS_ACCESS_KEY_SECRET=...
OSS_CDN_DOMAIN=cdn.pythonlearn.com  # 可选，如果配置了 CDN
```

**方式 B: 直接告诉我配置信息**

将以下信息发给我：

```yaml
OSS 配置：
  Endpoint: oss-cn-hangzhou.aliyuncs.com
  Bucket 名称：python-learning-platform
  AccessKey ID: LTAI5t...
  AccessKey Secret: ...
  CDN 域名：cdn.pythonlearn.com（可选）
```

我会帮你配置到项目中！

---

## ✅ 验证配置

配置完成后，运行以下命令验证：

```bash
# 进入项目目录
cd python-learning-platform

# 启动后端
cd backend
python -m uvicorn app.main:app --reload

# 访问上传 API 文档
# http://localhost:8000/docs
# 测试 /upload/video 接口
```

---

## 🔒 安全建议

1. **不要将 AccessKey 提交到 Git**
   - 确保 `.env` 在 `.gitignore` 中
   - 使用环境变量或密钥管理服务

2. **使用 RAM 用户而不是主账号**
   - 最小权限原则
   - 可以单独管理权限

3. **定期轮换 AccessKey**
   - 建议每 3-6 个月更换一次

4. **开启 OSS 日志记录**
   - 方便审计和问题排查

---

## 💰 费用说明

**OSS 费用组成:**
- 存储费用：约 ¥0.12/GB/月
- 流量费用：约 ¥0.5/GB（内网免费）
- 请求费用：约 ¥0.01/万次

**CDN 费用:**
- 流量费用：约 ¥0.24/GB（比 OSS 直接访问便宜）

**预估成本:**
- 100GB 存储 + 500GB 流量/月 ≈ ¥150-200/月

---

## 📞 常见问题

### Q: Bucket 名称已被占用怎么办？
A: 换个独特的名字，例如 `python-learn-平台-2026`

### Q: 选择哪个地域？
A: 选择离你的用户最近的地域，例如用户主要在华东就选杭州

### Q: 必须配置 CDN 吗？
A: 不是必须，但强烈建议配置，可以加速视频播放并降低成本

### Q: AccessKey 泄露了怎么办？
A: 立即在 RAM 控制台禁用并删除该 AccessKey，创建新的

---

## 📚 参考文档

- [OSS 官方文档](https://help.aliyun.com/product/31815.html)
- [RAM 访问控制](https://help.aliyun.com/product/28625.html)
- [CDN 配置指南](https://help.aliyun.com/product/27112.html)

---

**配置完成后告诉我，我会立即集成到项目中！** 🚀
