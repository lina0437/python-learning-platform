import { useState } from 'react'
import { Link } from 'react-router-dom'

// 模拟课程数据
const allCourses = [
  {
    id: 1,
    title: 'Python 零基础入门',
    subtitle: '从零开始掌握 Python 编程基础',
    instructor: '张老师',
    students: 12340,
    rating: 4.9,
    reviews: 523,
    lessons: 12,
    hours: 8,
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    category: '编程基础',
    difficulty: '初级',
    tags: ['Python', '入门', '编程基础'],
    isFree: false,
    isHot: true,
  },
  {
    id: 2,
    title: 'Python 数据分析实战',
    subtitle: '掌握 Pandas、NumPy 等核心库',
    instructor: '李老师',
    students: 8560,
    rating: 4.8,
    reviews: 328,
    lessons: 15,
    hours: 12,
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: '数据分析',
    difficulty: '中级',
    tags: ['Python', '数据分析', 'Pandas'],
    isFree: false,
    isHot: true,
  },
  {
    id: 3,
    title: 'Python Web 开发全栈',
    subtitle: 'Django + FastAPI 完整项目实战',
    instructor: '王老师',
    students: 6420,
    rating: 4.9,
    reviews: 412,
    lessons: 20,
    hours: 16,
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    category: 'Web 开发',
    difficulty: '中级',
    tags: ['Python', 'Web', 'Django', 'FastAPI'],
    isFree: false,
    isHot: true,
  },
  {
    id: 4,
    title: 'Python 爬虫开发实战',
    subtitle: '从基础到精通，掌握爬虫核心技术',
    instructor: '赵老师',
    students: 5230,
    rating: 4.7,
    reviews: 289,
    lessons: 18,
    hours: 14,
    price: 329,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    category: '爬虫开发',
    difficulty: '中级',
    tags: ['Python', '爬虫', '数据采集'],
    isFree: false,
    isHot: false,
  },
  {
    id: 5,
    title: 'Python 机器学习入门',
    subtitle: 'Scikit-learn 实战，入门机器学习',
    instructor: '李老师',
    students: 4120,
    rating: 4.8,
    reviews: 256,
    lessons: 16,
    hours: 13,
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    category: '人工智能',
    difficulty: '高级',
    tags: ['Python', '机器学习', 'AI'],
    isFree: false,
    isHot: false,
  },
  {
    id: 6,
    title: 'Python 自动化办公',
    subtitle: '提升 10 倍工作效率',
    instructor: '张老师',
    students: 9850,
    rating: 4.9,
    reviews: 634,
    lessons: 10,
    hours: 6,
    price: 159,
    originalPrice: 259,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: '办公自动化',
    difficulty: '初级',
    tags: ['Python', '自动化', '办公'],
    isFree: false,
    isHot: true,
  },
  {
    id: 7,
    title: 'Python 基础语法（免费）',
    subtitle: '快速了解 Python 基础语法',
    instructor: '张老师',
    students: 15620,
    rating: 4.8,
    reviews: 892,
    lessons: 8,
    hours: 4,
    price: 0,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    category: '编程基础',
    difficulty: '初级',
    tags: ['Python', '免费', '入门'],
    isFree: true,
    isHot: false,
  },
  {
    id: 9,
    title: 'Python 深度学习进阶',
    subtitle: 'PyTorch 实战，掌握深度学习',
    instructor: '赵老师',
    students: 3240,
    rating: 4.9,
    reviews: 198,
    lessons: 22,
    hours: 18,
    price: 499,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    category: '人工智能',
    difficulty: '高级',
    tags: ['Python', '深度学习', 'PyTorch'],
    isFree: false,
    isHot: false,
  },
]

const categories = ['全部', '编程基础', '数据分析', 'Web 开发', '爬虫开发', '人工智能', '办公自动化']
const difficulties = ['全部', '初级', '中级', '高级']
const sortOptions = [
  { value: 'hot', label: '最受欢迎' },
  { value: 'newest', label: '最新发布' },
  { value: 'price_asc', label: '价格从低到高' },
  { value: 'price_desc', label: '价格从高到低' },
  { value: 'rating', label: '评分最高' },
]

export default function CourseListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部')
  const [sortBy, setSortBy] = useState('hot')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')

  // 筛选和排序课程
  const filteredCourses = allCourses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === '全部' || course.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === '全部' || course.difficulty === selectedDifficulty
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && course.isFree) ||
                          (priceFilter === 'paid' && !course.isFree)
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'hot':
          return b.students - a.students
        case 'newest':
          return b.id - a.id
        case 'price_asc':
          return a.price - b.price
        case 'price_desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            课程中心
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            探索我们的精品课程，从零基础到专业工程师
          </p>
        </div>
      </section>

      {/* 搜索和筛选区 */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 搜索框 */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="搜索课程、讲师、标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-12 pr-4 py-3 text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* 筛选条件 */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 分类筛选 */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 难度筛选 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-500">难度：</span>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${selectedDifficulty === difficulty
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                    }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* 价格筛选 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-500">价格：</span>
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                  ${priceFilter === 'all'
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                全部
              </button>
              <button
                onClick={() => setPriceFilter('free')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                  ${priceFilter === 'free'
                    ? 'bg-success-100 text-success-700 border-2 border-success-600'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                免费
              </button>
              <button
                onClick={() => setPriceFilter('paid')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                  ${priceFilter === 'paid'
                    ? 'bg-warning-100 text-warning-700 border-2 border-warning-600'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                付费
              </button>
            </div>

            {/* 排序 */}
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-sm text-neutral-500">排序：</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-base py-1.5 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 结果统计 */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              找到 <span className="font-semibold text-primary-600">{filteredCourses.length}</span> 门课程
            </p>
            {(searchQuery || selectedCategory !== '全部' || selectedDifficulty !== '全部' || priceFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('全部')
                  setSelectedDifficulty('全部')
                  setPriceFilter('all')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                清除筛选
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 课程列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            // 空状态
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                未找到相关课程
              </h3>
              <p className="text-neutral-600 mb-6">
                试试调整搜索条件或清除筛选
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('全部')
                  setSelectedDifficulty('全部')
                  setPriceFilter('all')
                }}
                className="btn-primary"
              >
                清除所有筛选
              </button>
            </div>
          ) : (
            // 课程卡片网格
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="card overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {/* 封面图 */}
                  <div className="relative h-48 bg-neutral-200 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* 标签 */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {course.isHot && (
                        <span className="badge badge-error">🔥 热门</span>
                      )}
                      {course.isFree && (
                        <span className="badge badge-success">🆓 免费</span>
                      )}
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
                    {/* 收藏按钮 */}
                    <button className="absolute bottom-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100">
                      <svg className="h-5 w-5 text-neutral-600 hover:text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* 内容区 */}
                  <div className="p-6">
                    {/* 分类和标签 */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded font-medium">
                        {course.category}
                      </span>
                    </div>

                    {/* 标题和副标题 */}
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {course.subtitle}
                    </p>

                    {/* 讲师信息 */}
                    <div className="flex items-center text-sm text-neutral-500 mb-4">
                      <span className="mr-4">👨‍🏫 {course.instructor}</span>
                      <span>👥 {(course.students / 1000).toFixed(1)}k 学员</span>
                    </div>

                    {/* 课程信息 */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="flex items-center text-neutral-500">
                        ⭐ {course.rating} <span className="ml-1 text-xs">({course.reviews})</span>
                      </span>
                      <span className="flex items-center text-neutral-500">
                        📚 {course.lessons} 章节
                      </span>
                      <span className="flex items-center text-neutral-500">
                        📹 {course.hours} 小时
                      </span>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 价格 */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {course.isFree ? (
                          <span className="text-2xl font-bold text-success-600">免费</span>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-error-600">
                              ¥{course.price}
                            </span>
                            <span className="text-sm text-neutral-400 line-through ml-2">
                              ¥{course.originalPrice}
                            </span>
                          </>
                        )}
                      </div>
                      {!course.isFree && (
                        <span className="badge badge-error">
                          省{Math.round((1 - course.price / course.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* 按钮 */}
                    <div className="flex space-x-3">
                      <Link
                        to={`/courses/${course.id}`}
                        className="btn-primary flex-1 text-center text-sm"
                      >
                        {course.isFree ? '立即学习' : '免费试学'}
                      </Link>
                      <button className="btn-secondary text-sm">
                        收藏
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 分页器 */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center items-center space-x-2">
            <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
              3
            </button>
            <span className="px-2 text-neutral-400">...</span>
            <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
              10
            </button>
            <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
              下一页
            </button>
          </nav>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            没有找到适合的课程？
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            告诉我们你的需求，我们会为你推荐最适合的学习路径
          </p>
          <button className="bg-white text-primary-600 font-bold py-3 px-8 rounded-xl hover:bg-neutral-50 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg">
            获取个性化推荐
          </button>
        </div>
      </section>
    </div>
  )
}
