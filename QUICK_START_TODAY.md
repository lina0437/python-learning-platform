# 今天就能开始 (快速启动指南)

## 🎯 目标

**30 分钟内**让项目在你的电脑上跑起来！

---

## ⚡ 超快速启动 (10 分钟)

### 步骤 1: 检查环境 (2 分钟)

```bash
# 检查 Python
python --version
# 应该显示 Python 3.11.x 或更高

# 检查 Node.js
node --version
# 应该显示 v18.x 或更高
```

**如果没安装**:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/

---

### 步骤 2: 启动后端 (5 分钟)

```bash
# 打开 PowerShell 或 CMD
cd C:\Users\28917\.easyclaw\workspace\python-learning-platform\backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
venv\Scripts\activate

# 安装依赖 (使用国内镜像，快！)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 初始化数据库
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# 启动服务器
uvicorn main:app --reload --port 8000
```

**验证**: 打开浏览器访问 http://localhost:8000/docs

---

### 步骤 3: 启动前端 (5 分钟，新开一个终端)

```bash
# 新开一个终端窗口
cd C:\Users\28917\.easyclaw\workspace\python-learning-platform\frontend

# 安装依赖 (使用淘宝镜像，快！)
npm install --registry=https://registry.npmmirror.com

# 启动开发服务器
npm run dev
```

**验证**: 打开浏览器访问 http://localhost:5173

---

## 🎉 完成！

现在你应该能看到：

- ✅ 前端页面：http://localhost:5173
- ✅ API 文档：http://localhost:8000/docs
- ✅ 自动热重载：修改代码自动刷新

---

## 🧪 测试功能

### 1. 访问首页
http://localhost:5173

### 2. 测试注册
1. 点击"免费注册"
2. 输入邮箱和密码
3. 点击"创建账号"

### 3. 测试登录
1. 点击"登录"
2. 输入刚才的邮箱和密码
3. 成功进入学习中心

### 4. 查看课程
1. 点击"课程"
2. 查看课程列表
3. 点击进入课程详情

---

## 🐛 遇到问题？

### 问题 1: pip install 失败

**错误**: 网络超时/连接失败

**解决**:
```bash
# 使用清华镜像
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 或者配置永久镜像
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

---

### 问题 2: npm install 失败

**错误**: 网络超时/连接失败

**解决**:
```bash
# 使用淘宝镜像
npm install --registry=https://registry.npmmirror.com

# 或者配置永久镜像
npm config set registry https://registry.npmmirror.com
```

---

### 问题 3: 端口被占用

**错误**: Address already in use

**解决**:
```bash
# 查看占用端口的进程
netstat -ano | findstr :8000

# 杀死进程 (替换 PID)
taskkill /PID <进程 ID> /F

# 或者改端口
uvicorn main:app --reload --port 8001
```

---

### 问题 4: Alembic 迁移失败

**错误**: 数据库迁移失败

**解决**:
```bash
# 删除数据库文件
del python_learning.db

# 删除迁移历史
rmdir /s /q alembic\versions

# 重新迁移
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

---

### 问题 5: ModuleNotFoundError

**错误**: 找不到某个 Python 模块

**解决**:
```bash
# 确保虚拟环境已激活
venv\Scripts\activate

# 重新安装依赖
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

---

## 📝 下一步

今天剩下的时间：

1. ✅ **环境跑起来** (已完成)
2. 📝 **熟悉代码** - 浏览前端和后端代码结构
3. 🧪 **测试功能** - 注册、登录、查看课程
4. 🎨 **优化 UI** - 调整样式、改进体验
5. 📚 **创建课程** - 添加 Python 入门课程内容

---

## 🚀 明天：部署到 ECS

等本地开发完成后，明天我们可以：

1. 部署到阿里云 ECS
2. 配置公网访问
3. 分享给别人测试

参考：[deploy/ECS_DEPLOY_GUIDE.md](./deploy/ECS_DEPLOY_GUIDE.md)

---

## 💡 提示

### 开发工具推荐

- **VS Code** - 代码编辑器
- **Windows Terminal** - 更好的终端体验
- **Postman** - API 测试
- **DBeaver** - 数据库管理 (可选，SQLite 可用 DB Browser)

### VS Code 扩展

- Python (Microsoft)
- Pylance
- ES7+ React snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag

---

## 📞 需要帮助？

遇到问题随时告诉我：

1. 把错误信息完整发我
2. 截图也可以
3. 我会帮你解决！

**现在就开始吧！** 🚀

```bash
# 终端 1: 后端
cd backend
start_dev.bat

# 终端 2: 前端
cd frontend
start_dev.bat
```
