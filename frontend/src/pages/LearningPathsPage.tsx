import { Link } from 'react-router-dom'

// 模拟学习路径数据
const learningPaths = [
  {
    id: 1,
    title: 'Python 零基础入门',
    description: '从零开始，循序渐进掌握 Python 编程基础',
    difficulty: '初级',
    courses: 5,
    hours: 40,
    students: 12340,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    path: [
      { order: 1, title: 'Python 语法基础', course: 'Python 零基础入门' },
      { order: 2, title: '数据结构与算法', course: 'Python 数据结构' },
      { order: 3, title: '实战项目', course: 'Python 小项目实战' },
    ],
  },
  {
    id: 2,
    title: 'Python 数据分析师',
    description: '掌握数据分析核心技能，胜任数据分析岗位',
    difficulty: '中级',
    courses: 8,
    hours: 120,
    students: 8560,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    path: [
      { order: 1, title: 'NumPy 数值计算', course: 'NumPy 从入门到精通' },
      { order: 2, title: 'Pandas 数据处理', course: 'Pandas 实战' },
      { order: 3, title: '数据可视化', course: 'Matplotlib & Seaborn' },
      { order: 4, title: '机器学习基础', course: 'Scikit-learn 实战' },
    ],
  },
  {
    id: 3,
    title: 'Python Web 开发工程师',
    description: '学习 Web 开发全流程，成为全栈工程师',
    difficulty: '中级',
    courses: 10,
    hours: 150,
    students: 6420,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    path: [
      { order: 1, title: 'HTML/CSS 基础', course: '前端基础' },
      { order: 2, title: 'JavaScript 核心', course: 'JavaScript 精要' },
      { order: 3, title: 'Django 框架', course: 'Django Web 开发' },
      { order: 4, title: 'RESTful API', course: 'FastAPI 实战' },
      { order: 5, title: '数据库设计', course: 'PostgreSQL 实战' },
    ],
  },
  {
    id: 4,
    title: 'Python 人工智能工程师',
    description: '深入机器学习与深度学习，进入 AI 领域',
    difficulty: '高级',
    courses: 12,
    hours: 200,
    students: 4230,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    path: [
      { order: 1, title: '机器学习基础', course: '机器学习实战' },
      { order: 2, title: '深度学习框架', course: 'PyTorch 从入门到精通' },
      { order: 3, title: '计算机视觉', course: 'OpenCV 实战' },
      { order: 4, title: '自然语言处理', course: 'NLP 实战' },
      { order: 5, title: '项目实战', course: 'AI 项目实战' },
    ],
  },
]

export default function LearningPathsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            学习路径
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            系统化的学习路线，从零基础到专业工程师，每一步都清晰明确
          </p>
        </div>
      </section>

      {/* 路径列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {learningPaths.map((path) => (
              <div key={path.id} className="card overflow-hidden">
                {/* 封面图 */}
                <div className="relative h-48 bg-neutral-200">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`badge ${
                      path.difficulty === '初级' ? 'badge-success' :
                      path.difficulty === '中级' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {path.description}
                  </p>

                  {/* 统计信息 */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-500">
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {path.courses} 门课程
                    </span>
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {path.hours} 小时
                    </span>
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {(path.students / 1000).toFixed(1)}k 学员
                    </span>
                  </div>

                  {/* 学习路径 */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">学习路线：</h4>
                    <div className="space-y-2">
                      {path.path.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                            {step.order}
                          </div>
                          <div>
                            <p className="text-sm text-neutral-900">{step.title}</p>
                            <p className="text-xs text-neutral-500">{step.course}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex space-x-3">
                    <Link to="/courses" className="btn-primary flex-1 text-center">
                      开始学习
                    </Link>
                    <button className="btn-secondary">
                      了解详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            还没有找到适合的学习路径？
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            告诉我们你的目标和基础，我们会为你推荐最适合的学习路线
          </p>
          <button className="btn-primary text-lg py-3 px-8">
            获取个性化推荐
          </button>
        </div>
      </section>
    </div>
  )
}
