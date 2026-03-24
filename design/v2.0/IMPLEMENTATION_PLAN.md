# Python 学习平台 v2.0 实施计划

**更新日期:** 2026-03-24  
**设计确认:** ✅ 已确认  
**色调参考:** Boss 直聘网页版  
**核心要求:** 交互一致性，每个可点击入口都有对应页面

---

## 🎨 色调方案（参考 Boss 直聘）

### 主色调
- 🟦 **Boss 蓝:** `#2469F6` (主按钮、链接、重要操作)
- 🟩 **成功绿:** `#00D959` (正确提示、完成状态)
- 🟨 **警告黄:** `#FF9D21` (提醒、注意)
- 🟥 **错误红:** `#F55348` (错误提示)
- ⚫ **深空灰:** `#1A1A1A` (主标题)
- ⚪ **纯白色:** `#FFFFFF` (卡片背景)

### 渐变色
```css
/* Boss 直聘风格渐变 */
primary-gradient: linear-gradient(135deg, #2469F6 0%, #4F8FFF 100%)
button-hover: linear-gradient(135deg, #1B5BD6 0%, #2469F6 100%)
```

---

## 📋 实施阶段

### 阶段 1: 视觉升级 + 交互完善 (1-2 周)
**优先级:** 🔴 最高  
**目标:** 让页面看起来专业，交互流畅

#### 任务清单
- [ ] 1.1 更新配色方案（Boss 直聘风格）
- [ ] 1.2 首页 redesign
  - [ ] Hero Section 重新设计
  - [ ] 统计数据栏
  - [ ] 热门课程展示
  - [ ] 学员评价
  - [ ] 讲师团队
  - [ ] FAQ
  - [ ] 页脚
- [ ] 1.3 导航栏优化
  - [ ] 响应式设计
  - [ ] 用户状态区分（未登录/已登录）
  - [ ] 所有链接都有对应页面
- [ ] 1.4 课程列表页 redesign
  - [ ] 搜索和筛选功能
  - [ ] 课程卡片设计
  - [ ] 分页器
- [ ] 1.5 课程详情页 redesign
  - [ ] 课程信息展示
  - [ ] 课程大纲（可展开）
  - [ ] 讲师信息
  - [ ] 学员评价
  - [ ] 购买按钮
- [ ] 1.6 交互一致性检查
  - [ ] 所有按钮都有 hover 效果
  - [ ] 所有链接都有点击反馈
  - [ ] 页面切换动画
  - [ ] 加载状态
  - [ ] 空状态
- [ ] 1.7 移动端适配
  - [ ] 响应式布局
  - [ ] 移动端导航
  - [ ] 触摸优化

**交付物:** 全新的前端界面

---

### 阶段 2: 后台管理系统 (2-3 周)
**优先级:** 🔴 最高（教研功能）  
**目标:** 让你能轻松上传和管理课程

#### 任务清单
- [ ] 2.1 后台框架搭建
  - [ ] 后台路由和布局
  - [ ] 权限控制（管理员/教研人员）
  - [ ] 后台导航
- [ ] 2.2 后台首页（Dashboard）
  - [ ] 核心数据展示
  - [ ] 学员增长图表
  - [ ] 收入统计图表
  - [ ] 课程表现排行
  - [ ] 待处理事项
- [ ] 2.3 课程管理模块
  - [ ] 课程列表页
  - [ ] 创建课程（4 步流程）
  - [ ] 编辑课程
  - [ ] 删除课程
  - [ ] 课程上下架
  - [ ] 课程数据查看
- [ ] 2.4 章节/课时管理
  - [ ] 添加章节
  - [ ] 添加课时（视频/文本/练习）
  - [ ] 课时排序
  - [ ] 课时编辑
  - [ ] 课时删除
- [ ] 2.5 视频上传功能
  - [ ] 阿里云 OSS 集成
  - [ ] 视频上传组件
  - [ ] 上传进度显示
  - [ ] 视频转码（可选）
- [ ] 2.6 练习题目编辑器
  - [ ] 题目描述编辑器
  - [ ] 起始代码设置
  - [ ] 测试用例配置
  - [ ] 参考答案设置
  - [ ] 题目预览
- [ ] 2.7 用户管理模块
  - [ ] 学员列表
  - [ ] 学员详情
  - [ ] 学习进度查看
  - [ ] 用户封禁/解封
- [ ] 2.8 数据看板
  - [ ] 学员数据统计
  - [ ] 课程完成率的
  - [ ] 收入统计
  - [ ] 热门课程分析
  - [ ] 学习行为分析

**交付物:** 完整的后台管理系统

---

### 阶段 3: 学习体验优化 (2-3 周)
**优先级:** 🟡 高  
**目标:** 提升学员学习体验

#### 任务清单
- [ ] 3.1 学习页面重构
  - [ ] 三栏布局（视频 + 代码 + 目录）
  - [ ] 视频播放器优化
  - [ ] 代码编辑器优化（Monaco Editor）
  - [ ] 运行结果实时显示
- [ ] 3.2 进度追踪系统
  - [ ] 课时完成标记
  - [ ] 课程进度条
  - [ ] 学习时长统计
  - [ ] 自动保存进度
- [ ] 3.3 成就系统
  - [ ] 成就徽章设计
  - [ ] 成就解锁逻辑
  - [ ] 成就展示页面
  - [ ] 成就通知
- [ ] 3.4 代码练习优化
  - [ ] 即时运行反馈
  - [ ] 错误提示友好化
  - [ ] 参考答案提示
  - [ ] 多次提交记录
- [ ] 3.5 用户中心 redesign
  - [ ] 学习概览
  - [ ] 我的课程
  - [ ] 学习记录
  - [ ] 证书展示
  - [ ] 收藏夹
  - [ ] 订单管理

**交付物:** 优化的学习体验

---

### 阶段 4: 商业化功能 (1-2 周)
**优先级:** 🟡 中  
**目标:** 实现盈利功能

#### 任务清单
- [ ] 4.1 支付集成
  - [ ] 支付宝集成
  - [ ] 微信支付集成
  - [ ] 订单系统
  - [ ] 支付回调处理
- [ ] 4.2 优惠券系统
  - [ ] 优惠券创建
  - [ ] 优惠券领取
  - [ ] 优惠券使用
  - [ ] 优惠券管理后台
- [ ] 4.3 促销活动
  - [ ] 限时折扣
  - [ ] 拼团功能
  - [ ] 邀请返利
  - [ ] 新用户优惠
- [ ] 4.4 VIP 会员系统
  - [ ] 会员等级设计
  - [ ] 会员权益配置
  - [ ] 会员购买
  - [ ] 会员管理
- [ ] 4.5 发票系统
  - [ ] 发票申请
  - [ ] 发票管理
  - [ ] 电子发票集成

**交付物:** 完整的商业化系统

---

### 阶段 5: 优化迭代 (持续)
**优先级:** 🟢 持续优化  
**目标:** 持续改进产品

#### 任务清单
- [ ] 5.1 性能优化
  - [ ] 首屏加载优化
  - [ ] 图片懒加载
  - [ ] 代码分割
  - [ ] CDN 加速
  - [ ] 缓存优化
- [ ] 5.2 SEO 优化
  - [ ] 元标签优化
  - [ ] 结构化数据
  - [ ] Sitemap 生成
  - [ ] robots.txt 配置
- [ ] 5.3 数据分析
  - [ ] 用户行为追踪
  - [ ] 转化漏斗分析
  - [ ] A/B 测试框架
  - [ ] 数据可视化
- [ ] 5.4 用户反馈
  - [ ] 反馈收集系统
  - [ ] 问题追踪
  - [ ] 用户满意度调查
  - [ ] NPS 评分
- [ ] 5.5 新功能开发
  - [ ] 根据用户需求迭代
  - [ ] 竞品功能跟进
  - [ ] 创新功能探索

---

## 📅 开发顺序

### 第 1 周：视觉升级启动
- 周一至周三：配色方案更新 + 导航栏优化
- 周四至周五：首页 Hero Section redesign
- 周六至周日：课程卡片设计

### 第 2 周：前端页面完善
- 周一至周二：课程列表页 + 详情页
- 周三至周四：用户中心 redesign
- 周五至周六：交互优化 + 移动端适配
- 周日：阶段 1 验收

### 第 3 周：后台开发启动
- 周一至周二：后台框架 + 权限控制
- 周三至周四：后台 Dashboard
- 周五至周日：课程管理 CRUD

### 第 4 周：后台功能完善
- 周一至周三：章节/课时管理
- 周四至周五：视频上传功能
- 周六至周日：练习题目编辑器

### 第 5 周：后台收尾 + 学习体验
- 周一至周二：用户管理 + 数据看板
- 周三至周四：学习页面重构
- 周五至周日：进度追踪系统

### 第 6 周：学习体验 + 商业化
- 周一至周二：成就系统 + 代码练习优化
- 周三至周四：支付集成
- 周五至周日：优惠券系统

### 第 7 周及以后：持续优化
- 性能优化
- SEO 优化
- 数据分析
- 新功能开发

---

## 🔧 技术栈

### 前端
- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式)
- React Router (路由)
- Axios (HTTP 客户端)
- Monaco Editor (代码编辑器)
- Video.js (视频播放器)
- Recharts (图表)

### 后端
- FastAPI (Web 框架)
- SQLAlchemy (ORM)
- Alembic (数据库迁移)
- PostgreSQL (数据库)
- Redis (缓存)
- Pydantic (数据验证)
- python-jose (JWT)

### 基础设施
- Docker + Docker Compose
- Nginx (反向代理)
- 阿里云 OSS (对象存储)
- 阿里云 CDN (内容分发)
- GitHub Actions (CI/CD)

---

## 📊 数据库设计（新增表）

### 课程相关
```sql
-- 课程表
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT,
    cover_image_url VARCHAR(500),
    price DECIMAL(10,2),
    original_price DECIMAL(10,2),
    difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
    status VARCHAR(20), -- draft, published, archived
    instructor_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 章节表
CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    sort_order INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 课时表
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id),
    title VARCHAR(200) NOT NULL,
    lesson_type VARCHAR(20), -- video, text, exercise, quiz
    video_url VARCHAR(500),
    video_duration INTEGER, -- 秒
    content TEXT, -- 文本内容或练习描述
    sort_order INTEGER,
    is_free_trial BOOLEAN DEFAULT FALSE, -- 是否可试学
    created_at TIMESTAMP DEFAULT NOW()
);

-- 练习题目表
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    starter_code TEXT,
    solution_code TEXT,
    test_cases JSONB, -- 测试用例
    difficulty VARCHAR(20),
    points INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 学习进度表
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    progress DECIMAL(5,2) DEFAULT 0, -- 完成百分比
    completed_lessons JSONB, -- 已完成的课时 ID 列表
    last_lesson_id INTEGER,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- 课时学习记录
CREATE TABLE lesson_completions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    lesson_id INTEGER REFERENCES lessons(id),
    completed_at TIMESTAMP DEFAULT NOW(),
    time_spent INTEGER, -- 学习时长（秒）
    UNIQUE(user_id, lesson_id)
);

-- 成就徽章表
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    requirement_type VARCHAR(50), -- course_completed, days_streak, exercises_completed
    requirement_value INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 用户成就表
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    achievement_id INTEGER REFERENCES achievements(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 订单表
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20), -- pending, paid, refunded, cancelled
    payment_method VARCHAR(20), -- alipay, wechat
    payment_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 优惠券表
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200),
    discount_type VARCHAR(20), -- percentage, fixed
    discount_value DECIMAL(10,2),
    min_purchase DECIMAL(10,2),
    max_discount DECIMAL(10,2),
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 用户优惠券表
CREATE TABLE user_coupons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    coupon_id INTEGER REFERENCES coupons(id),
    status VARCHAR(20), -- available, used, expired
    obtained_at TIMESTAMP DEFAULT NOW(),
    used_at TIMESTAMP,
    order_id INTEGER REFERENCES orders(id)
);
```

---

## 🔌 API 设计（新增接口）

### 课程管理（后台）
```
POST   /api/admin/courses          # 创建课程
GET    /api/admin/courses          # 课程列表
GET    /api/admin/courses/:id      # 课程详情
PUT    /api/admin/courses/:id      # 更新课程
DELETE /api/admin/courses/:id      # 删除课程
POST   /api/admin/courses/:id/publish   # 发布课程
POST   /api/admin/courses/:id/unpublish # 下架课程

POST   /api/admin/courses/:id/chapters      # 创建章节
PUT    /api/admin/chapters/:id              # 更新章节
DELETE /api/admin/chapters/:id              # 删除章节

POST   /api/admin/chapters/:id/lessons      # 创建课时
PUT    /api/admin/lessons/:id               # 更新课时
DELETE /api/admin/lessons/:id               # 删除课时
POST   /api/admin/lessons/:id/video         # 上传视频
POST   /api/admin/lessons/:id/exercise      # 创建练习
```

### 学习相关
```
GET    /api/my-courses             # 我的课程
GET    /api/courses/:id/learn      # 学习页面
POST   /api/lessons/:id/complete   # 标记课时完成
POST   /api/exercises/:id/submit   # 提交练习
GET    /api/progress/:course_id    # 学习进度
GET    /api/achievements           # 我的成就
```

### 商业化
```
POST   /api/orders                 # 创建订单
POST   /api/orders/:id/pay         # 发起支付
POST   /api/orders/:id/refund      # 申请退款
GET    /api/orders                 # 订单列表

POST   /api/coupons/:code/redeem   # 兑换优惠券
GET    /api/my-coupons             # 我的优惠券

GET    /api/vip/pricing            # VIP 价格方案
POST   /api/vip/subscribe          # 订阅 VIP
```

### 数据看板（后台）
```
GET    /api/admin/dashboard/stats       # 核心数据
GET    /api/admin/dashboard/growth      # 增长趋势
GET    /api/admin/dashboard/revenue     # 收入统计
GET    /api/admin/dashboard/courses     # 课程表现
GET    /api/admin/dashboard/users       # 用户统计
```

---

## ✅ 质量保证

### 代码质量
- [ ] TypeScript 严格模式
- [ ] ESLint 配置
- [ ] Prettier 格式化
- [ ] 单元测试覆盖率 > 80%
- [ ] 集成测试
- [ ] E2E 测试

### 性能指标
- [ ] 首屏加载 < 2 秒
- [ ] Lighthouse 分数 > 90
- [ ] API 响应时间 < 200ms
- [ ] 图片压缩优化
- [ ] 代码分割

### 用户体验
- [ ] 所有交互有反馈
- [ ] 加载状态友好
- [ ] 错误提示清晰
- [ ] 空状态有引导
- [ ] 移动端适配完美

---

## 📞 沟通计划

### 定期同步
- **每日:** 开发进度更新（在文档中记录）
- **每周:** 功能演示和反馈收集
- **每阶段:** 完整验收和下一步计划

### 问题反馈
- 遇到问题立即联系
- 需要确认的需求随时问
- 设计调整及时沟通

---

## 🚀 开始工作！

**当前状态:** 准备开始阶段 1  
**下一步:** 更新配色方案 + 导航栏优化

**有任何问题会立即联系你！**

---

**最后更新:** 2026-03-24 14:58  
**状态:** 🟢 进行中
