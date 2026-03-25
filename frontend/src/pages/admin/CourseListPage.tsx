import { useState } from 'react'
import { Link } from 'react-router-dom'

// 模拟课程数据（后续从 API 获取）
const courses = [
  {
    id: 1,
    title: 'Python 零基础入门',
    subtitle: '从零开始掌握 Python 编程基础',
    instructor: '张老师',
    students: 12340,
    rating: 4.9,
    reviews: 523,
    lessons: 12,
    chapters: 4,
    price: 199,
    status: 'published',
    revenue: 24680,
    createdAt: '2026-01-15',
    updatedAt: '2026-03-20',
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
    chapters: 5,
    price: 299,
    status: 'published',
    revenue: 25680,
    createdAt: '2026-01-20',
    updatedAt: '2026-03-18',
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
    chapters: 6,
    price: 399,
    status: 'published',
    revenue: 25800,
    createdAt: '2026-02-01',
    updatedAt: '2026-03-15',
  },
  {
    id: 4,
    title: 'Python 高级进阶（草稿）',
    subtitle: '深入理解 Python 高级特性',
    instructor: '张老师',
    students: 0,
    rating: 0,
    reviews: 0,
    lessons: 5,
    chapters: 2,
    price: 0,
    status: 'draft',
    revenue: 0,
    createdAt: '2026-03-20',
    updatedAt: '2026-03-24',
  },
]

export default function AdminCourseListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  // 筛选课程
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">课程管理</h1>
          <p className="text-neutral-600 mt-1">管理所有课程内容</p>
        </div>
        <Link to="/admin/courses/new" className="btn-primary">
          ➕ 创建课程
        </Link>
      </div>

      {/* 筛选和搜索 */}
      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 搜索框 */}
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="搜索课程名称或讲师..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base"
            />
          </div>

          {/* 状态筛选 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">状态：</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'published'
                  ? 'bg-success-100 text-success-700 border-2 border-success-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              在售中
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'draft'
                  ? 'bg-neutral-200 text-neutral-700 border-2 border-neutral-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              草稿
            </button>
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">课程信息</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">状态</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">学员数</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">章节/课时</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">评分</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">收入</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="text-neutral-400">🔍</div>
                    <p className="text-neutral-600 mt-2">未找到相关课程</p>
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-neutral-50 transition-colors">
                    {/* 课程信息 */}
                    <td className="py-4 px-4">
                      <div>
                        <Link
                          to={`/admin/courses/${course.id}/edit`}
                          className="font-semibold text-neutral-900 hover:text-primary-600"
                        >
                          {course.title}
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
                          {course.subtitle}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          讲师：{course.instructor}
                        </p>
                      </div>
                    </td>

                    {/* 状态 */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === 'published'
                          ? 'bg-success-100 text-success-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}>
                        {course.status === 'published' ? '✓ 在售中' : '📝 草稿'}
                      </span>
                    </td>

                    {/* 学员数 */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm text-neutral-600">
                        {course.students > 0 ? course.students.toLocaleString() : '-'}
                      </span>
                    </td>

                    {/* 章节/课时 */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm text-neutral-600">
                        {course.chapters}章 / {course.lessons}课时
                      </span>
                    </td>

                    {/* 评分 */}
                    <td className="py-4 px-4 text-center">
                      {course.rating > 0 ? (
                        <span className="text-sm text-yellow-500">
                          ⭐ {course.rating}
                        </span>
                      ) : (
                        <span className="text-sm text-neutral-400">-</span>
                      )}
                    </td>

                    {/* 收入 */}
                    <td className="py-4 px-4 text-right">
                      {course.revenue > 0 ? (
                        <span className="text-sm font-semibold text-success-600">
                          ¥{course.revenue.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-sm text-neutral-400">-</span>
                      )}
                    </td>

                    {/* 操作 */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/courses/${course.id}/edit`}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          编辑
                        </Link>
                        <span className="text-neutral-300">|</span>
                        <Link
                          to={`/courses/${course.id}`}
                          className="text-sm text-neutral-600 hover:text-neutral-900"
                        >
                          查看
                        </Link>
                        <span className="text-neutral-300">|</span>
                        {course.status === 'published' ? (
                          <button className="text-sm text-warning-600 hover:text-warning-700 font-medium">
                            下架
                          </button>
                        ) : (
                          <button className="text-sm text-success-600 hover:text-success-700 font-medium">
                            发布
                          </button>
                        )}
                        <span className="text-neutral-300">|</span>
                        <button className="text-sm text-error-600 hover:text-error-700 font-medium">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页器 */}
        <div className="border-t border-neutral-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            显示 <span className="font-medium">{filteredCourses.length}</span> 门课程
          </div>
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50" disabled>
              上一页
            </button>
            <button className="px-3 py-1 rounded bg-primary-600 text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">
              2
            </button>
            <button className="px-3 py-1 rounded border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">
              下一页
            </button>
          </nav>
        </div>
      </div>

      {/* 快速操作提示 */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-1">
              快速开始
            </h3>
            <p className="text-sm text-neutral-600 mb-3">
              创建你的第一门课程，开始知识变现之旅
            </p>
            <Link to="/admin/courses/new" className="btn-primary text-sm">
              ➕ 创建课程
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
