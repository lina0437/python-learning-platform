# 🐳 Docker Desktop 安装步骤（零基础版）

> 预计耗时：15-20 分钟（文件较大，下载可能慢）

---

## ⚠️ 安装前检查

Docker Desktop 需要满足以下条件：

### 1. Windows 版本要求
- Windows 10 64位 专业版/企业版/教育版
- 或 Windows 11
- **家庭版也可以，但需要额外步骤**

### 2. 需要开启 WSL2（Windows 子系统）

---

## 步骤 1：访问 Docker 官网

1. 打开浏览器
2. 在地址栏输入：
   ```
   https://www.docker.com/products/docker-desktop/
   ```
3. 按回车

---

## 步骤 2：下载 Docker Desktop

1. 页面加载后，找到 **"Download for Windows"** 按钮
2. **点击这个按钮**
3. 浏览器会开始下载（文件约 500MB，可能需要几分钟）
4. 等待下载完成

> 💡 如果下载很慢，可以用这个国内镜像：
> https://hub.docker.com/editions/community/docker-ce-desktop-windows

---

## 步骤 3：运行安装程序

1. 找到下载的文件
   - 通常在 "下载" 文件夹
   - 文件名类似：`Docker Desktop Installer.exe`

2. **双击**这个文件

---

## 步骤 4：安装设置

### 4.1 欢迎界面
- 勾选 **"Use WSL 2 instead of Hyper-V"**（使用 WSL2）
- 点击 "OK" 或 "Install"

### 4.2 如果提示需要 WSL2

如果弹出提示说需要 WSL2，点击 **"确定"** 或 **"OK"**

然后按照提示操作（可能需要重启）

### 4.3 许可协议
- 点击 "Accept" 或 "同意"

### 4.4 选择安装位置
- 保持默认
- 点击 "Next"

### 4.5 开始安装
- 点击 "Install" 或 "安装"
- 如果弹出用户账户控制，点击 "是"

---

## 步骤 5：等待安装完成

1. 安装进度条会开始走动
2. 大约需要 5-10 分钟
3. 等待直到看到 "Installation Complete"
4. 点击 "Finish" 或 "Close"

---

## 步骤 6：重启电脑（重要！）

**Docker Desktop 首次安装后需要重启电脑！**

1. 保存所有打开的文件
2. 点击开始菜单 → 电源 → 重启
3. 等待电脑重新启动

---

## 步骤 7：启动 Docker Desktop

1. 重启后，找到桌面上的 **Docker Desktop** 图标（蓝色鲸鱼）
2. 双击打开
3. 第一次启动会初始化，需要等待 2-5 分钟
4. 等待右下角图标变成 **绿色**（表示运行中）

---

## 步骤 8：验证安装

### 8.1 打开命令提示符

1. 按 **Win + R** 键
2. 输入：`cmd`
3. 按回车

### 8.2 检查 Docker 版本

输入：
```
docker --version
```

按回车，应该显示：
```
Docker version 24.x.x, build xxxxxxx
```

### 8.3 检查 Docker Compose

输入：
```
docker-compose --version
```

按回车，应该显示：
```
Docker Compose version 2.x.x
```

### 8.4 运行测试容器

输入：
```
docker run hello-world
```

按回车，如果看到欢迎信息，说明 Docker 正常工作！

---

## ✅ 安装成功检查

- [ ] Docker Desktop 可以打开
- [ ] 右下角图标是绿色的
- [ ] `docker --version` 显示版本号
- [ ] `docker run hello-world` 成功运行

**全部完成 → 恭喜！Docker 安装成功！** 🎉

---

## 🐛 常见问题

### 问题 1：提示需要启用虚拟化

**解决**：
1. 重启电脑，进入 BIOS（开机时按 F2、F10、Del 或 Esc，不同品牌不同）
2. 找到 "Virtualization Technology" 或 "VT-x" 或 "AMD-V"
3. 设置为 "Enabled"
4. 保存并退出（通常按 F10）
5. 重启电脑

### 问题 2：WSL2 未安装

**解决**：
1. 以管理员身份打开 PowerShell（右键开始菜单 → Windows PowerShell (管理员)）
2. 输入：
   ```
   wsl --install
   ```
3. 按回车
4. 等待安装完成
5. 重启电脑

### 问题 3：Docker Desktop 无法启动

**解决**：
1. 确保 WSL2 已安装并启用
2. 重启电脑
3. 如果还不行，告诉我错误信息

### 问题 4：下载太慢

**解决**：使用国内镜像源
- 安装后配置 Docker 镜像加速器（后面会教你）

---

## 📝 下一步

安装完成后，回复我：

> **"Docker Desktop 安装完成，版本是 xx.x.x"**

然后我们继续安装 Git（如果还没完成的话）！

---

## 💡 提示

- Docker 文件较大（约 500MB），下载可能需要时间
- 安装后**必须重启电脑**
- 第一次启动会比较慢，耐心等待
- 遇到问题随时问我

**加油！这是最后一个大软件了！** 🚀
