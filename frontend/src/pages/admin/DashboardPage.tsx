import AdminLayout from '../../components/admin/AdminLayout'

// 模拟数据（后续从 API 获取）
const dashboardData = {
  stats: {
    totalUsers: 10234,
    totalCourses: 12,
    todayRevenue: 2580,
    completionRate: 65,
    averageRating: 4.8,
    pendingItems: 3,
  },
  growthData: [
    { date: '03-01', users: 120 },
    { date: '03-05', users: 150 },
    { date: '03-10', users: 180 },
    { date: '03-15', users: 220 },
    { date: '03-20', users: 280 },
    { date: '03-25', users: 350 },
  ],
  revenueData: [
    { date: '03-19', revenue: 1800 },
    { date: '03-20', revenue: 2200 },
    { date: '03-21', revenue: 1950 },
    { date: '03-22', revenue: 2400 },
    { date: '03-23', revenue: 2100 },
    { date: '03-24', revenue: 2800 },
    { date: '03-25', revenue: 2580 },
  ],
  topCourses: [
    { id: 1, title: 'Python 零基础入门', students: 12340, revenue: 24680 },
    { id: 2, title: 'Python 数据分析', students: 8560, revenue: 25680 },
    { id: 3, title: 'Python Web 开发', students: 6420, revenue: 25800 },
    { id: 6, title: 'Python 自动化办公', students: 9850, revenue: 15660 },
    { id: 4, title: 'Python 爬虫实战', students: 5230, revenue: 12960 },
  ],
  pendingItems: [
    { id: 1, type: '评价', content: '3 条新学员评价待回复', priority: 'medium' },
    { id: 2, type: '问题', content: '5 个课程问题待解答', priority: 'high' },
    { id: 3, type: '退款', content: '1 个退款申请待处理', priority: 'urgent' },
  ],
}

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">数据概览</h1>
            <p className="text-neutral-500 mt-1">欢迎回来，张老师！👋</p>
          </div>
          <div className="text-sm text-neutral-500">
            最后登录：2026-03-25 10:00
          </div>
        </div>

        {/* 核心数据卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* 总学员数 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">👥</div>
              <span className="text-sm text-success-600 font-medium">↑ 12%</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {dashboardData.stats.totalUsers.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-500">总学员数</div>
          </div>

          {/* 总课程数 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📚</div>
              <span className="text-sm text-success-600 font-medium">↑ 2</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {dashboardData.stats.totalCourses}
            </div>
            <div className="text-sm text-neutral-500">总课程数</div>
          </div>

          {/* 今日收入 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💰</div>
              <span className="text-sm text-success-600 font-medium">↑ 8%</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              ¥{dashboardData.stats.todayRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-500">今日收入</div>
          </div>

          {/* 课程完成率 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📊</div>
              <span className="text-sm text-success-600 font-medium">↑ 5%</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {dashboardData.stats.completionRate}%
            </div>
            <div className="text-sm text-neutral-500">课程完成率</div>
          </div>

          {/* 平均评分 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">⭐</div>
              <span className="text-sm text-success-600 font-medium">↑ 0.2</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {dashboardData.stats.averageRating}
            </div>
            <div className="text-sm text-neutral-500">平均评分</div>
          </div>

          {/* 待处理事项 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">⚠️</div>
              <span className="text-sm text-error-600 font-medium">需关注</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {dashboardData.stats.pendingItems}
            </div>
            <div className="text-sm text-neutral-500">待处理事项</div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 学员增长趋势 */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              📈 学员增长趋势
            </h3>
            <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">图表区域（使用 Recharts 实现）</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-neutral-500">本周新增</div>
                <div className="text-lg font-bold text-primary-600">+350</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">本周活跃</div>
                <div className="text-lg font-bold text-success-600">2,450</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">留存率</div>
                <div className="text-lg font-bold text-warning-600">68%</div>
              </div>
            </div>
          </div>

          {/* 收入统计 */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              💰 收入统计
            </h3>
            <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">图表区域（使用 Recharts 实现）</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-neutral-500">本周收入</div>
                <div className="text-lg font-bold text-primary-600">¥15,860</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">本月收入</div>
                <div className="text-lg font-bold text-success-600">¥48,520</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">平均客单价</div>
                <div className="text-lg font-bold text-warning-600">¥258</div>
              </div>
            </div>
          </div>
        </div>

        {/* 课程表现和待处理事项 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 课程表现 TOP5 */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              📚 课程表现 TOP5
            </h3>
            <div className="space-y-4">
              {dashboardData.topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-neutral-200 text-neutral-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-neutral-100 text-neutral-600'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">{course.title}</div>
                      <div className="text-sm text-neutral-500">👥 {course.students.toLocaleString()} 学员</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary-600">¥{course.revenue.toLocaleString()}</div>
                    <div className="text-xs text-neutral-500">收入</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 待处理事项 */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              ⚠️ 待处理事项
            </h3>
            <div className="space-y-3">
              {dashboardData.pendingItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-l-4
                    ${item.priority === 'urgent' ? 'bg-error-50 border-error-500' :
                      item.priority === 'high' ? 'bg-warning-50 border-warning-500' :
                      'bg-neutral-50 border-neutral-300'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {item.type === '评价' && '📝'}
                        {item.type === '问题' && '❓'}
                        {item.type === '退款' && '💸'}
                        {' '}{item.type}
                      </div>
                      <div className="text-sm text-neutral-600">{item.content}</div>
                    </div>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      处理 →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <button className="btn-secondary w-full">
                查看全部待处理事项
              </button>
            </div>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            🚀 快捷操作
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="p-4 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-primary-700">创建课程</div>
            </button>
            <button className="p-4 rounded-lg bg-success-50 hover:bg-success-100 transition-colors text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold text-success-700">发布文章</div>
            </button>
            <button className="p-4 rounded-lg bg-warning-50 hover:bg-warning-100 transition-colors text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold text-warning-700">用户管理</div>
            </button>
            <button className="p-4 rounded-lg bg-error-50 hover:bg-error-100 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-error-700">查看报表</div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
