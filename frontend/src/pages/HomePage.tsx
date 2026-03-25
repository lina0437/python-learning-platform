import { Link } from 'react-router-dom'

// 模拟统计数据
const stats = [
  { label: '注册学员', value: '10,000+', icon: '👥' },
  { label: '精品课程', value: '50+', icon: '📚' },
  { label: '平均评分', value: '4.9', icon: '⭐' },
  { label: '完课率', value: '65%', icon: '📊' },
]

// 热门课程数据
const featuredCourses = [
  {
    id: 1,
    title: 'Python 零基础入门',
    description: '从零开始掌握 Python 编程基础',
    instructor: '张老师',
    students: 12340,
    rating: 4.9,
    lessons: 12,
    hours: 8,
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    badge: '🔥 热门',
    difficulty: '初级',
  },
  {
    id: 2,
    title: 'Python 数据分析实战',
    description: '掌握 Pandas、NumPy 等核心库',
    instructor: '李老师',
    students: 8560,
    rating: 4.8,
    lessons: 15,
    hours: 12,
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    badge: '⭐ 推荐',
    difficulty: '中级',
  },
  {
    id: 3,
    title: 'Python Web 开发全栈',
    description: 'Django + FastAPI 完整项目实战',
    instructor: '王老师',
    students: 6420,
    rating: 4.9,
    lessons: 20,
    hours: 16,
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    badge: '💼 就业',
    difficulty: '中级',
  },
]

// 学员评价
const testimonials = [
  {
    id: 1,
    name: '小明',
    role: '大学生',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    content: '课程非常系统，从零开始也能跟上。现在已经找到 Python 相关工作了！',
    rating: 5,
  },
  {
    id: 2,
    name: '小红',
    role: '数据分析师',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    content: '数据分析课程很实用，学完就能应用到工作中，效率提升了很多。',
    rating: 5,
  },
  {
    id: 3,
    name: '小刚',
    role: '转行开发者',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    content: '老师讲解清晰，练习设计合理。成功转行 Python 开发，薪资翻倍！',
    rating: 5,
  },
]

// 讲师团队
const instructors = [
  {
    id: 1,
    name: '张老师',
    role: '首席讲师',
    bio: '10 年 Python 开发经验，曾就职于 BAT',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: 2,
    name: '李老师',
    role: '数据科学讲师',
    bio: '前阿里数据专家，擅长数据分析',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: 3,
    name: '王老师',
    role: 'Web 开发讲师',
    bio: '全栈工程师，精通 Django、FastAPI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white py-24 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl">🐍</div>
          <div className="absolute bottom-20 right-10 text-8xl">💻</div>
          <div className="absolute top-1/2 left-1/3 text-6xl">⚡</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* 主标题 */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            学会 Python
            <br />
            <span className="text-yellow-300">开启编程职业生涯</span>
          </h1>
          
          {/* 副标题 */}
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            交互式学习 · 实战项目 · 专业指导 · 就业支持
          </p>
          
          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="bg-white text-primary-600 font-bold py-4 px-10 rounded-xl 
                         hover:bg-neutral-50 transition-all duration-200 
                         transform hover:scale-105 shadow-lg hover:shadow-xl
                         text-lg"
            >
              🚀 免费开始学习
            </Link>
            <Link
              to="/courses"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl 
                         hover:bg-white hover:text-primary-600 transition-all duration-200 
                         transform hover:scale-105 text-lg"
            >
              📖 浏览全部课程
            </Link>
          </div>
          
          {/* 信任元素 */}
          <div className="flex flex-col items-center">
            <p className="text-sm opacity-80 mb-3">已有 10,000+ 学员加入学习</p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-300 to-primary-400 border-2 border-white flex items-center justify-center text-xs font-semibold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 border-2 border-white flex items-center justify-center text-xs font-semibold">
                +9994
              </div>
            </div>
          </div>
          
          {/* 特性标签 */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
              ✓ 无需安装环境
            </span>
            <span className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
              ✓ 边学边练
            </span>
            <span className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
              ✓ 即时反馈
            </span>
            <span className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
              ✓ 证书认证
            </span>
          </div>
        </div>
      </section>

      {/* 统计数据栏 */}
      <section className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门课程展示 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              热门课程
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              精心设计的课程体系，从零基础到专业工程师
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="card overflow-hidden group">
                {/* 封面图 */}
                <div className="relative h-48 bg-neutral-200 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary">{course.badge}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`badge ${
                      course.difficulty === '初级' ? 'badge-success' :
                      course.difficulty === '中级' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* 讲师信息 */}
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <span className="mr-4">👨‍🏫 {course.instructor}</span>
                    <span>👥 {(course.students / 1000).toFixed(1)}k 学员</span>
                  </div>

                  {/* 课程信息 */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="flex items-center text-neutral-500">
                      ⭐ {course.rating}
                    </span>
                    <span className="flex items-center text-neutral-500">
                      📚 {course.lessons} 章节
                    </span>
                    <span className="flex items-center text-neutral-500">
                      📹 {course.hours} 小时
                    </span>
                  </div>

                  {/* 价格 */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-error-600">
                        ¥{course.price}
                      </span>
                      <span className="text-sm text-neutral-400 line-through ml-2">
                        ¥{course.originalPrice}
                      </span>
                    </div>
                    <span className="badge badge-error">
                      省{Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </div>

                  {/* 按钮 */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn-primary flex-1 text-center text-sm"
                    >
                      免费试学
                    </Link>
                    <button className="btn-secondary text-sm">
                      收藏
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 查看更多 */}
          <div className="text-center mt-12">
            <Link to="/courses" className="btn-outline text-lg py-3 px-8">
              浏览全部课程 →
            </Link>
          </div>
        </div>
      </section>

      {/* 学习路径推荐 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              学习路径推荐
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              系统化的学习路线，每一步都清晰明确
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 路径 1 */}
            <div className="card p-8">
              <div className="flex items-start mb-6">
                <div className="text-4xl mr-4">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Python 零基础入门
                  </h3>
                  <p className="text-neutral-600">
                    从零开始，循序渐进掌握 Python 编程基础
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold mr-3">
                    1
                  </span>
                  Python 语法基础
                </div>
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold mr-3">
                    2
                  </span>
                  数据结构与算法
                </div>
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold mr-3">
                    3
                  </span>
                  实战项目
                </div>
              </div>
              <Link to="/paths" className="btn-outline w-full text-center">
                查看学习路径
              </Link>
            </div>

            {/* 路径 2 */}
            <div className="card p-8">
              <div className="flex items-start mb-6">
                <div className="text-4xl mr-4">💼</div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Python 数据分析师
                  </h3>
                  <p className="text-neutral-600">
                    掌握数据分析核心技能，胜任数据分析岗位
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-warning-100 text-warning-700 flex items-center justify-center text-sm font-semibold mr-3">
                    1
                  </span>
                  NumPy 数值计算
                </div>
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-warning-100 text-warning-700 flex items-center justify-center text-sm font-semibold mr-3">
                    2
                  </span>
                  Pandas 数据处理
                </div>
                <div className="flex items-center text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-warning-100 text-warning-700 flex items-center justify-center text-sm font-semibold mr-3">
                    3
                  </span>
                  数据可视化
                </div>
              </div>
              <Link to="/paths" className="btn-outline w-full text-center">
                查看学习路径
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 学员评价 */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              学员评价
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              听听学员们怎么说
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-8">
                {/* 评分 */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                
                {/* 评价内容 */}
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* 学员信息 */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 讲师团队 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              讲师团队
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              来自一线互联网公司的资深专家
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="card overflow-hidden text-center">
                <div className="aspect-square bg-neutral-200">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">
                    {instructor.role}
                  </p>
                  <p className="text-neutral-600 text-sm">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 常见问题 */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              常见问题
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '零基础可以学习吗？',
                a: '当然可以！我们的课程从零基础开始，循序渐进，配有详细讲解和练习。',
              },
              {
                q: '学习时间如何安排？',
                a: '课程支持随时学习，永久有效。建议每天学习 1-2 小时，30 天可以掌握基础。',
              },
              {
                q: '学完后可以获得证书吗？',
                a: '完成课程并通过考核后，会获得结业证书，可用于求职证明。',
              },
              {
                q: '有答疑服务吗？',
                a: '有专属学习群，讲师和助教在线答疑，作业批改，确保学习效果。',
              },
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Q: {faq.q}
                </h3>
                <p className="text-neutral-600">
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            准备好开始学习了吗？
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            立即加入，与 10,000+ 学员一起开启 Python 学习之旅
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 font-bold py-4 px-10 rounded-xl 
                         hover:bg-neutral-50 transition-all duration-200 
                         transform hover:scale-105 shadow-lg hover:shadow-xl
                         text-lg"
            >
              🚀 免费注册
            </Link>
            <Link
              to="/courses"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl 
                         hover:bg-white hover:text-primary-600 transition-all duration-200 
                         transform hover:scale-105 text-lg"
            >
              📖 浏览课程
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 品牌信息 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🐍</span>
                <span className="font-bold text-xl text-white">Python 学习平台</span>
              </div>
              <p className="text-sm">
                致力于让每个人都能轻松学会 Python
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="font-semibold text-white mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-white transition-colors">课程中心</Link></li>
                <li><Link to="/paths" className="hover:text-white transition-colors">学习路径</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">关于我们</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">技术博客</Link></li>
              </ul>
            </div>

            {/* 支持 */}
            <div>
              <h4 className="font-semibold text-white mb-4">学习支持</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div>
              <h4 className="font-semibold text-white mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 contact@pythonlearn.com</li>
                <li>💬 PythonLearn001</li>
                <li>📱 400-xxx-xxxx</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 Python 学习平台。All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
