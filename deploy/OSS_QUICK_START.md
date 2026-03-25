# 阿里云 OSS 快速配置指南

**目的:** 配置视频上传功能  
**预计时间:** 10 分钟

---

## 🚀 快速步骤

### 1️⃣ 创建 OSS Bucket

1. 访问：https://oss.console.aliyun.com
2. 点击 **"创建 Bucket"**
3. 填写：
   - **Bucket 名称:** `python-learning-platform`（或自定义）
   - **地域:** 选最近的（如华东 1-杭州）
   - **读写权限:** 私有
4. 点击 **"确定"**

---

### 2️⃣ 创建 AccessKey

1. 访问：https://ram.console.aliyun.com
2. **用户** → **创建用户**
3. 填写：
   - **登录名称:** `python-platform`
   - **访问方式:** 勾选 **"OpenAPI 调用访问"**
4. 点击 **"确定"**
5. **立即复制** AccessKey ID 和 Secret（只显示一次！）

---

### 3️⃣ 授权 OSS 权限

1. 在用户列表找到刚创建的用户
2. 点击用户名 → **权限管理**
3. **新增授权**
4. 搜索并选择：`AliyunOSSFullAccess`
5. 点击 **"确定"**

---

### 4️⃣ 配置到项目

在项目根目录创建 `.env` 文件：

```bash
# 阿里云 OSS 配置
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
OSS_BUCKET=python-learning-platform
OSS_ACCESS_KEY_ID=LTAI5t...
OSS_ACCESS_KEY_SECRET=...
```

**替换说明:**
- `OSS_ENDPOINT`: 你创建 Bucket 时选的地域
- `OSS_BUCKET`: 你的 Bucket 名称
- `OSS_ACCESS_KEY_ID`: 第 2 步复制的 AccessKey ID
- `OSS_ACCESS_KEY_SECRET`: 第 2 步复制的 Secret

---

### 5️⃣ 验证配置

**方式 A: 告诉我配置信息**

将以下信息发给我：

```yaml
OSS 配置：
  Endpoint: oss-cn-hangzhou.aliyuncs.com
  Bucket: python-learning-platform
  AccessKey ID: LTAI5t...
  AccessKey Secret: ...
```

我来帮你验证和对接！

**方式 B: 自行测试**

1. 启动后端：
```bash
cd backend
python -m uvicorn app.main:app --reload
```

2. 访问 API 文档：http://localhost:8000/docs
3. 测试 `/api/v1/upload/video` 接口

---

## ✅ 配置完成后

配置完成后，你可以：
1. 在后台创建课程
2. 添加章节和课时
3. 选择"视频课"类型
4. 上传视频文件

视频将自动上传到你的 OSS Bucket！

---

## 📞 需要帮助？

配置过程中遇到任何问题，随时告诉我！

---

**文档位置:** `deploy/OSS_QUICK_START.md`  
**详细文档:** `deploy/OSS_SETUP_GUIDE.md`
