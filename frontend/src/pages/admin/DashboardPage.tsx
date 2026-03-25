import { Link } from 'react-router-dom'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 模拟数据（后续从 API 获取）
const dashboardData = {
  stats: {
    totalUsers: 10234,
    totalCourses: 12,
    totalRevenue: 125680,
    todayRevenue: 2580,
    completionRate: 65,
    averageRating: 4.8,
  },
  growthData: [
    { date: '2026-03-18', users: 150 },
    { date: '2026-03-19', users: 180 },
    { date: '2026-03-20', users: 220 },
    { date: '2026-03-21', users: 190 },
    { date: '2026-03-22', users: 250 },
    { date: '2026-03-23', users: 280 },
    { date: '2026-03-24', users: 320 },
  ],
  revenueData: [
    { date: '2026-03-18', revenue: 1580 },
    { date: '2026-03-19', revenue: 2100 },
    { date: '2026-03-20', revenue: 1890 },
    { date: '2026-03-21', revenue: 2350 },
    { date: '2026-03-22', revenue: 2800 },
    { date: '2026-03-23', revenue: 3200 },
    { date: '2026-03-24', revenue: 2580 },
  ],
  topCourses: [
    { id: 1, title: 'Python 零基础入门', students: 12340, revenue: 24680, rating: 4.9 },
    { id: 2, title: 'Python 数据分析实战', students: 8560, revenue: 25680, rating: 4.8 },
    { id: 3, title: 'Python Web 开发全栈', students: 6420, revenue: 25800, rating: 4.9 },
    { id: 6, title: 'Python 自动化办公', students: 9850, revenue: 15670, rating: 4.9 },
    { id: 4, title: 'Python 爬虫开发实战', students: 5230, revenue: 17200, rating: 4.7 },
  ],
  topCourses: [
    { id: 1, title: 'Python 零基础入门', students: 12340, revenue: 24680, rating: 4.9 },
    { id: 2, title: 'Python 数据分析实战', students: 8560, revenue: 25680, rating: 4.8 },
    { id: 3, title: 'Python Web 开发全栈', students: 6420, revenue: 25800, rating: 4.9 },
    { id: 6, title: 'Python 自动化办公', students: 9850, revenue: 15670, rating: 4.9 },
    { id: 4, title: 'Python 爬虫开发实战', students: 5230, revenue: 17200, rating: 4.7 },
  ],
  completionDistribution: [
    { name: '已完成', value: 65, color: '#10b981' },
    { name: '学习中', value: 25, color: '#2563eb' },
    { name: '未开始', value: 10, color: '#6b7280' },
  ],
  pendingTasks: [
    { id: 1, type: 'review', title: '3 条新学员评价待回复', count: 3, urgent: false },
    { id: 2, type: 'question', title: '5 个课程问题待解答', count: 5, urgent: true },
    { id: 3, type: 'refund', title: '1 个退款申请待处理', count: 1, urgent: true },
  ],
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">数据看板</h1>
          <p className="text-neutral-600 mt-1">实时查看平台运营数据</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-neutral-500">
                最后更新：{new Date().toLocaleString('zh-CN')}
          </span>
          <button className="btn-primary">
            📥 导出报表
          </button>
        </div>
      </div>

      {/* 核心数据卡片 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 总学员数 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">总学员数</p>
              <p className="text-3xl font-bold text-neutral-900">
                {dashboardData.stats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 12%</span>
            <span className="text-neutral-500 ml-2">较上月</span>
          </div>
        </div>

        {/* 总课程数 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">总课程数</p>
              <p className="text-3xl font-bold text-neutral-900">
                {dashboardData.stats.totalCourses}
              </p>
            </div>
            <div className="text-4xl">📚</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 2</span>
            <span className="text-neutral-500 ml-2">本月新增</span>
          </div>
        </div>

        {/* 总收入 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">总收入</p>
              <p className="text-3xl font-bold text-neutral-900">
                ¥{dashboardData.stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 8%</span>
            <span className="text-neutral-500 ml-2">较上月</span>
          </div>
        </div>

        {/* 今日收入 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">今日收入</p>
              <p className="text-3xl font-bold text-neutral-900">
                ¥{dashboardData.stats.todayRevenue.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 15%</span>
            <span className="text-neutral-500 ml-2">较昨日</span>
          </div>
        </div>

        {/* 课程完成率 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">课程完成率</p>
              <p className="text-3xl font-bold text-neutral-900">
                {dashboardData.stats.completionRate}%
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 5%</span>
            <span className="text-neutral-500 ml-2">较上月</span>
          </div>
        </div>

        {/* 平均评分 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">平均评分</p>
              <p className="text-3xl font-bold text-neutral-900">
                {dashboardData.stats.averageRating}
              </p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-success-600 font-medium">↑ 0.2</span>
            <span className="text-neutral-500 ml-2">较上月</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 学员增长趋势 */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            📈 学员增长趋势
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {dashboardData.growthData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-500 mb-1">
                  {item.date.slice(5)}
                </div>
                <div className="text-sm font-medium text-neutral-900">
                  {item.users}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 收入统计 */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            💰 收入统计
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                  formatter={(value) => [`¥${value.toLocaleString()}`, '收入']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {dashboardData.revenueData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-500 mb-1">
                  {item.date.slice(5)}
                </div>
                <div className="text-sm font-medium text-neutral-900">
                  ¥{(item.revenue / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 课程完成率分布 */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            📊 课程完成率分布
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.completionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.completionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {dashboardData.completionDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-600">{item.name}</span>
                </div>
                <span className="font-medium text-neutral-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 课程表现排行 */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-900">
            📚 课程表现 TOP5
          </h3>
          <Link to="/admin/courses" className="text-sm text-primary-600 hover:text-primary-700">
            查看全部 →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">排名</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">课程名称</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">学员数</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">收入</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">评分</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topCourses.map((course, index) => (
                <tr key={course.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-neutral-100 text-neutral-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-neutral-50 text-neutral-500'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/courses/${course.id}`} className="text-sm font-medium text-neutral-900 hover:text-primary-600">
                      {course.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-neutral-600">
                    {course.students.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-success-600">
                    ¥{course.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm text-yellow-500">⭐ {course.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 待处理事项 */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">
          ⚠️ 待处理事项
        </h3>
        <div className="space-y-3">
          {dashboardData.pendingTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                task.urgent
                  ? 'bg-error-50 border-error-200'
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {task.type === 'review' ? '💬' :
                   task.type === 'question' ? '❓' :
                   '💸'}
                </span>
                <div>
                  <p className={`font-medium ${
                    task.urgent ? 'text-error-700' : 'text-neutral-900'
                  }`}>
                    {task.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  task.urgent
                    ? 'bg-error-200 text-error-700'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {task.count}
                </span>
                <button className="btn-primary text-sm py-1.5 px-4">
                  处理
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
