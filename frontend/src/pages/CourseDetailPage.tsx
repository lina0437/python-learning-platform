import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// 模拟课程详情数据
const courseDetail = {
  id: 1,
  title: 'Python 零基础入门',
  subtitle: '从零开始掌握 Python 编程基础，30 天学会 Python',
  description: `本课程专为零基础学员设计，从 Python 安装开始，循序渐进地讲解 Python 编程的核心概念。

通过本课程的学习，你将能够：
✓ 理解 Python 基础语法和数据类型
✓ 掌握函数、模块、文件操作等核心技能
✓ 能够独立编写 Python 程序解决实际问题
✓ 为学习数据分析、Web 开发等进阶方向打下坚实基础

课程特色：
• 通俗易懂的讲解，零基础也能轻松理解
• 丰富的实战练习，边学边练
• 即时反馈的代码编辑器，无需安装环境
• 专业的答疑服务，学习路上不孤单`,
  instructor: {
    name: '张老师',
    title: '首席讲师',
    bio: '10 年 Python 开发经验，曾就职于 BAT，累计授课 10,000+ 学员',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  rating: 4.9,
  reviews: 523,
  students: 12340,
  lessons: 12,
  hours: 8,
  difficulty: '初级',
  category: '编程基础',
  tags: ['Python', '入门', '编程基础', '零基础'],
  price: 199,
  originalPrice: 299,
  image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
  isFree: false,
  chapters: [
    {
      id: 1,
      title: '第 1 章 Python 简介',
      description: '了解 Python 的特点和应用场景',
      lessons: [
        { id: 1, title: '什么是 Python', duration: '10:32', free: true, completed: false },
        { id: 2, title: 'Python 的应用场景', duration: '8:45', free: true, completed: false },
        { id: 3, title: '环境搭建', duration: '15:20', free: false, completed: false },
      ],
    },
    {
      id: 2,
      title: '第 2 章 Python 基础语法',
      description: '掌握 Python 的基础语法规则',
      lessons: [
        { id: 4, title: '变量和数据类型', duration: '20:30', free: false, completed: false },
        { id: 5, title: '运算符和表达式', duration: '18:15', free: false, completed: false },
        { id: 6, title: '输入和输出', duration: '12:40', free: false, completed: false },
      ],
    },
    {
      id: 3,
      title: '第 3 章 流程控制',
      description: '学习条件判断和循环结构',
      lessons: [
        { id: 7, title: '条件语句 if-else', duration: '22:10', free: false, completed: false },
        { id: 8, title: '循环语句 for', duration: '25:30', free: false, completed: false },
        { id: 9, title: '循环语句 while', duration: '20:45', free: false, completed: false },
      ],
    },
    {
      id: 4,
      title: '第 4 章 数据结构',
      description: '掌握 Python 的核心数据结构',
      lessons: [
        { id: 10, title: '列表 List', duration: '28:20', free: false, completed: false },
        { id: 11, title: '元组 Tuple', duration: '15:30', free: false, completed: false },
        { id: 12, title: '字典 Dict', duration: '24:15', free: false, completed: false },
      ],
    },
  ],
  whatYouWillLearn: [
    '理解 Python 基础语法和数据类型',
    '掌握函数、模块、文件操作等核心技能',
    '能够独立编写 Python 程序解决实际问题',
    '为学习进阶方向打下坚实基础',
  ],
  requirements: [
    '无需编程基础，从零开始',
    '需要一台电脑（Windows/Mac/Linux）',
    '每天投入 1-2 小时学习时间',
  ],
  reviews: [
    {
      id: 1,
      user: '小明',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 5,
      date: '2026-03-20',
      content: '课程非常系统，从零开始也能跟上。老师讲解清晰，练习设计合理。现在已经找到 Python 相关工作了！',
      helpful: 45,
    },
    {
      id: 2,
      user: '小红',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 5,
      date: '2026-03-18',
      content: '很适合零基础学员，老师讲解很详细，每个知识点都有练习。学完后对 Python 有了全面的理解。',
      helpful: 32,
    },
    {
      id: 3,
      user: '小刚',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 5,
      date: '2026-03-15',
      content: '成功转行 Python 开发，薪资翻倍！感谢张老师的悉心教导，课程质量非常高。',
      helpful: 28,
    },
  ],
  faqs: [
    {
      q: '零基础可以学习吗？',
      a: '当然可以！本课程专为零基础学员设计，从最基础的概念开始讲解，循序渐进。',
    },
    {
      q: '学完需要多长时间？',
      a: '建议每天学习 1-2 小时，大约 30 天可以完成全部课程。',
    },
    {
      q: '学完后能达到什么水平？',
      a: '能够独立编写 Python 程序，掌握基础语法和核心概念，为进阶学习打下坚实基础。',
    },
    {
      q: '有答疑服务吗？',
      a: '有专属学习群，讲师和助教在线答疑，确保学习效果。',
    },
  ],
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('intro')
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:opacity-80">首页</Link>
            <span>/</span>
            <Link to="/courses" className="hover:opacity-80">课程中心</Link>
            <span>/</span>
            <span className="opacity-80">{courseDetail.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {courseDetail.title}
          </h1>
          <p className="text-xl opacity-90 mb-6">
            {courseDetail.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center">
              <span className="text-yellow-300 mr-1">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold">{courseDetail.rating}</span>
              <span className="opacity-80 ml-1">({courseDetail.reviews} 评价)</span>
            </div>
            <div className="flex items-center">
              <span>👥 {courseDetail.students.toLocaleString()} 人已学习</span>
            </div>
            <div className="flex items-center">
              <span>📚 {courseDetail.lessons} 章节</span>
            </div>
            <div className="flex items-center">
              <span>📹 {courseDetail.hours} 小时</span>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容区 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧：课程内容 */}
            <div className="flex-1">
              {/* 标签页导航 */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-100 mb-6">
                <div className="flex border-b">
                  {[
                    { id: 'intro', label: '课程介绍' },
                    { id: 'chapters', label: '课程大纲' },
                    { id: 'instructor', label: '讲师介绍' },
                    { id: 'reviews', label: '学员评价' },
                    { id: 'faqs', label: '常见问题' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium transition-colors
                        ${activeTab === tab.id
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* 标签页内容 */}
                <div className="p-6">
                  {/* 课程介绍 */}
                  {activeTab === 'intro' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">
                          课程描述
                        </h3>
                        <p className="text-neutral-600 whitespace-pre-line leading-relaxed">
                          {courseDetail.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">
                          你将学到
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {courseDetail.whatYouWillLearn.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-neutral-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">
                          课程要求
                        </h3>
                        <div className="space-y-2">
                          {courseDetail.requirements.map((item, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-neutral-400 mr-2">•</span>
                              <span className="text-neutral-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">
                          标签
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {courseDetail.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 课程大纲 */}
                  {activeTab === 'chapters' && (
                    <div className="space-y-4">
                      {courseDetail.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className="border border-neutral-200 rounded-lg overflow-hidden"
                        >
                          {/* 章节标题 */}
                          <button
                            onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                            className="w-full px-4 py-3 bg-neutral-50 flex items-center justify-between hover:bg-neutral-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <svg
                                className={`h-5 w-5 text-neutral-400 transition-transform ${
                                  expandedChapter === chapter.id ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              <span className="font-semibold text-neutral-900">{chapter.title}</span>
                            </div>
                            <span className="text-sm text-neutral-500">
                              {chapter.lessons.length} 课时
                            </span>
                          </button>

                          {/* 课时列表 */}
                          {expandedChapter === chapter.id && (
                            <div className="divide-y">
                              {chapter.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="px-4 py-3 flex items-center justify-between hover:bg-neutral-50"
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className="text-neutral-400 text-sm">
                                      {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                    </span>
                                    <span className="text-neutral-900">{lesson.title}</span>
                                    {lesson.free && (
                                      <span className="badge badge-success">免费</span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <span className="text-sm text-neutral-500">
                                      {lesson.duration}
                                    </span>
                                    <Link
                                      to={`/lesson/${lesson.id}`}
                                      className={`text-sm font-medium ${
                                        lesson.free
                                          ? 'text-primary-600 hover:text-primary-700'
                                          : 'text-neutral-400'
                                      }`}
                                    >
                                      {lesson.free ? '▶ 试学' : '🔒 解锁'}
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 讲师介绍 */}
                  {activeTab === 'instructor' && (
                    <div className="flex items-start space-x-6">
                      <img
                        src={courseDetail.instructor.avatar}
                        alt={courseDetail.instructor.name}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">
                          {courseDetail.instructor.name}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">
                          {courseDetail.instructor.title}
                        </p>
                        <p className="text-neutral-600">
                          {courseDetail.instructor.bio}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 学员评价 */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {/* 评分概览 */}
                      <div className="flex items-center space-x-6 pb-6 border-b">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-neutral-900 mb-2">
                            {courseDetail.rating}
                          </div>
                          <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                          <div className="text-sm text-neutral-500 mt-1">
                            {courseDetail.reviews} 条评价
                          </div>
                        </div>
                      </div>

                      {/* 评价列表 */}
                      <div className="space-y-6">
                        {courseDetail.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={review.avatar}
                                  alt={review.user}
                                  className="h-10 w-10 rounded-full"
                                />
                                <div>
                                  <div className="font-semibold text-neutral-900">
                                    {review.user}
                                  </div>
                                  <div className="text-sm text-neutral-500">
                                    {review.date}
                                  </div>
                                </div>
                              </div>
                              <div className="text-yellow-400">
                                {'⭐'.repeat(review.rating)}
                              </div>
                            </div>
                            <p className="text-neutral-700 mb-3">
                              {review.content}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-neutral-500">
                              <button className="hover:text-neutral-700">
                                👍 有帮助 ({review.helpful})
                              </button>
                              <button className="hover:text-neutral-700">
                                回复
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 常见问题 */}
                  {activeTab === 'faqs' && (
                    <div className="space-y-4">
                      {courseDetail.faqs.map((faq, index) => (
                        <div key={index} className="border border-neutral-200 rounded-lg p-4">
                          <h4 className="font-semibold text-neutral-900 mb-2">
                            Q: {faq.q}
                          </h4>
                          <p className="text-neutral-600">
                            A: {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右侧：购买卡片 */}
            <div className="lg:w-96">
              <div className="card p-6 sticky top-24">
                {/* 课程封面 */}
                <div className="relative h-48 bg-neutral-200 rounded-lg overflow-hidden mb-6">
                  <img
                    src={courseDetail.image}
                    alt={courseDetail.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 价格 */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-error-600">
                      ¥{courseDetail.price}
                    </span>
                    <span className="text-lg text-neutral-400 line-through ml-3">
                      ¥{courseDetail.originalPrice}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="badge badge-error">
                      省{Math.round((1 - courseDetail.price / courseDetail.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>

                {/* 购买按钮 */}
                <div className="space-y-3 mb-6">
                  <Link to={`/courses/${courseDetail.id}/buy`} className="btn-primary w-full block text-center py-3 text-lg">
                    立即购买
                  </Link>
                  <button className="btn-secondary w-full py-3 text-lg">
                    加入收藏
                  </button>
                </div>

                {/* 保障承诺 */}
                <div className="space-y-3 text-sm text-neutral-600 mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    永久访问
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    随时学习
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    证书认证
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    7 天无理由退款
                  </div>
                </div>

                {/* 限时优惠倒计时 */}
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
                  <div className="text-sm text-warning-700 font-medium mb-2">
                    🎁 限时优惠
                  </div>
                  <div className="text-2xl font-bold text-warning-700">
                    还剩 23:59:59
                  </div>
                </div>

                {/* 课程信息 */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">难度</span>
                    <span className="text-neutral-900">{courseDetail.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">分类</span>
                    <span className="text-neutral-900">{courseDetail.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">章节数</span>
                    <span className="text-neutral-900">{courseDetail.lessons} 章</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">学习时长</span>
                    <span className="text-neutral-900">{courseDetail.hours} 小时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">学员数</span>
                    <span className="text-neutral-900">{courseDetail.students.toLocaleString()} 人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相关课程推荐 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            相关课程推荐
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[2, 3, 6].map((courseId) => (
              <div key={courseId} className="card overflow-hidden group">
                <Link to={`/courses/${courseId}`}>
                  <div className="aspect-video bg-neutral-200">
                    <img
                      src={allCourses.find(c => c.id === courseId)?.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-1">
                      {allCourses.find(c => c.id === courseId)?.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">
                        👥 {allCourses.find(c => c.id === courseId)?.students.toLocaleString()}
                      </span>
                      <span className="text-error-600 font-bold">
                        ¥{allCourses.find(c => c.id === courseId)?.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// 引入课程数据（临时方案，后续从 API 获取）
const allCourses: any[] = []
