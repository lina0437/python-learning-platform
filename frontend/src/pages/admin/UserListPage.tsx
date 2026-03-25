import { useState } from 'react'
import { Link } from 'react-router-dom'

// 模拟用户数据
const users = [
  {
    id: 1,
    name: '小明',
    email: 'xiaoming@example.com',
    phone: '138****1234',
    registeredAt: '2026-01-15',
    lastLogin: '2026-03-24',
    enrolledCourses: 3,
    completedCourses: 1,
    learningHours: 25,
    totalOrders: 3,
    totalSpent: 597,
    status: 'active',
  },
  {
    id: 2,
    name: '小红',
    email: 'xiaohong@example.com',
    phone: '139****5678',
    registeredAt: '2026-01-20',
    lastLogin: '2026-03-25',
    enrolledCourses: 5,
    completedCourses: 2,
    learningHours: 48,
    totalOrders: 5,
    totalSpent: 1295,
    status: 'active',
  },
  {
    id: 3,
    name: '小刚',
    email: 'xiaogang@example.com',
    phone: '136****9012',
    registeredAt: '2026-02-01',
    lastLogin: '2026-03-20',
    enrolledCourses: 2,
    completedCourses: 0,
    learningHours: 12,
    totalOrders: 2,
    totalSpent: 398,
    status: 'active',
  },
  {
    id: 4,
    name: '小丽',
    email: 'xiaoli@example.com',
    phone: '137****3456',
    registeredAt: '2026-02-10',
    lastLogin: '2026-03-10',
    enrolledCourses: 1,
    completedCourses: 0,
    learningHours: 5,
    totalOrders: 1,
    totalSpent: 199,
    status: 'banned',
  },
]

export default function AdminUserListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'orders' | 'spent'>('recent')

  // 筛选和排序用户
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.includes(searchQuery) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
        case 'orders':
          return b.totalOrders - a.totalOrders
        case 'spent':
          return b.totalSpent - a.totalSpent
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">学员管理</h1>
          <p className="text-neutral-600 mt-1">管理所有学员信息</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-neutral-500">
            共 {filteredUsers.length} 名学员
          </span>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 搜索框 */}
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="搜索姓名或邮箱..."
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
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'active'
                  ? 'bg-success-100 text-success-700 border-2 border-success-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              正常
            </button>
            <button
              onClick={() => setStatusFilter('banned')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'banned'
                  ? 'bg-error-100 text-error-700 border-2 border-error-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              封禁
            </button>
          </div>

          {/* 排序 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-base py-1.5 text-sm"
            >
              <option value="recent">最近登录</option>
              <option value="orders">订单最多</option>
              <option value="spent">消费最多</option>
            </select>
          </div>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">学员信息</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">状态</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">学习数据</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">订单数据</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">最近登录</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="text-neutral-400">🔍</div>
                    <p className="text-neutral-600 mt-2">未找到相关学员</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    {/* 学员信息 */}
                    <td className="py-4 px-4">
                      <div>
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="font-semibold text-neutral-900 hover:text-primary-600"
                        >
                          {user.name}
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{user.phone}</p>
                      </div>
                    </td>

                    {/* 状态 */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-success-100 text-success-700'
                          : 'bg-error-100 text-error-700'
                      }`}>
                        {user.status === 'active' ? '✓ 正常' : '🚫 封禁'}
                      </span>
                    </td>

                    {/* 学习数据 */}
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm text-neutral-600">
                        <div>📚 {user.enrolledCourses} 门课程</div>
                        <div>✓ {user.completedCourses} 门完成</div>
                        <div>⏱️ {user.learningHours} 小时</div>
                      </div>
                    </td>

                    {/* 订单数据 */}
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm text-neutral-600">
                        <div>🛒 {user.totalOrders} 个订单</div>
                        <div className="font-semibold text-success-600">
                          ¥{user.totalSpent}
                        </div>
                      </div>
                    </td>

                    {/* 最近登录 */}
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm text-neutral-600">
                        {user.lastLogin}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        注册：{user.registeredAt}
                      </div>
                    </td>

                    {/* 操作 */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          详情
                        </Link>
                        <span className="text-neutral-300">|</span>
                        {user.status === 'active' ? (
                          <button className="text-sm text-warning-600 hover:text-warning-700 font-medium">
                            封禁
                          </button>
                        ) : (
                          <button className="text-sm text-success-600 hover:text-success-700 font-medium">
                            解封
                          </button>
                        )}
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
            显示 <span className="font-medium">{filteredUsers.length}</span> 名学员
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
    </div>
  )
}
