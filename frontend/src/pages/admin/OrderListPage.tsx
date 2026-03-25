import { useState } from 'react'
import { Link } from 'react-router-dom'

// 模拟订单数据
const orders = [
  {
    id: 'ORD-20260324-001',
    userId: 1,
    userName: '小明',
    courseId: 1,
    courseTitle: 'Python 零基础入门',
    amount: 199,
    status: 'paid',
    paymentMethod: 'alipay',
    createdAt: '2026-03-24 15:30',
    paidAt: '2026-03-24 15:31',
  },
  {
    id: 'ORD-20260324-002',
    userId: 2,
    userName: '小红',
    courseId: 2,
    courseTitle: 'Python 数据分析实战',
    amount: 299,
    status: 'paid',
    paymentMethod: 'wechat',
    createdAt: '2026-03-24 14:20',
    paidAt: '2026-03-24 14:21',
  },
  {
    id: 'ORD-20260323-001',
    userId: 3,
    userName: '小刚',
    courseId: 3,
    courseTitle: 'Python Web 开发全栈',
    amount: 399,
    status: 'refunded',
    paymentMethod: 'alipay',
    createdAt: '2026-03-23 10:15',
    paidAt: '2026-03-23 10:16',
    refundedAt: '2026-03-24 09:00',
  },
  {
    id: 'ORD-20260323-002',
    userId: 4,
    userName: '小丽',
    courseId: 1,
    courseTitle: 'Python 零基础入门',
    amount: 199,
    status: 'pending',
    paymentMethod: 'alipay',
    createdAt: '2026-03-23 16:45',
    paidAt: null,
  },
]

export default function AdminOrderListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'refunded'>('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.userName.includes(searchQuery) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-success-100 text-success-700">✓ 已支付</span>
      case 'pending':
        return <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-warning-100 text-warning-700">⏳ 待支付</span>
      case 'refunded':
        return <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-700">↩️ 已退款</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">订单管理</h1>
          <p className="text-neutral-600 mt-1">管理所有订单和退款</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-neutral-500">今日收入</p>
            <p className="text-xl font-bold text-success-600">¥2,580</p>
          </div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 搜索框 */}
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="搜索订单号/课程名/学员名..."
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
              onClick={() => setStatusFilter('paid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'paid'
                  ? 'bg-success-100 text-success-700 border-2 border-success-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              已支付
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'pending'
                  ? 'bg-warning-100 text-warning-700 border-2 border-warning-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              待支付
            </button>
            <button
              onClick={() => setStatusFilter('refunded')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === 'refunded'
                  ? 'bg-neutral-200 text-neutral-700 border-2 border-neutral-600'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              已退款
            </button>
          </div>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">订单号</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">学员</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">课程</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">支付方式</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">状态</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">金额</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">创建时间</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="text-neutral-400">🔍</div>
                    <p className="text-neutral-600 mt-2">未找到相关订单</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    {/* 订单号 */}
                    <td className="py-4 px-4">
                      <span className="text-sm font-mono text-neutral-900">{order.id}</span>
                    </td>

                    {/* 学员 */}
                    <td className="py-4 px-4">
                      <Link
                        to={`/admin/users/${order.userId}`}
                        className="text-sm font-medium text-neutral-900 hover:text-primary-600"
                      >
                        {order.userName}
                      </Link>
                    </td>

                    {/* 课程 */}
                    <td className="py-4 px-4">
                      <Link
                        to={`/courses/${order.courseId}`}
                        className="text-sm text-neutral-600 hover:text-primary-600 line-clamp-1"
                      >
                        {order.courseTitle}
                      </Link>
                    </td>

                    {/* 支付方式 */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm text-neutral-600">
                        {order.paymentMethod === 'alipay' ? '💳 支付宝' : '💚 微信支付'}
                      </span>
                    </td>

                    {/* 状态 */}
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* 金额 */}
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-semibold text-neutral-900">
                        ¥{order.amount}
                      </span>
                    </td>

                    {/* 创建时间 */}
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm text-neutral-600">{order.createdAt}</div>
                      {order.paidAt && (
                        <div className="text-xs text-success-600 mt-0.5">
                          支付：{order.paidAt}
                        </div>
                      )}
                      {order.refundedAt && (
                        <div className="text-xs text-error-600 mt-0.5">
                          退款：{order.refundedAt}
                        </div>
                      )}
                    </td>

                    {/* 操作 */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          详情
                        </Link>
                        {order.status === 'paid' && (
                          <>
                            <span className="text-neutral-300">|</span>
                            <button className="text-sm text-warning-600 hover:text-warning-700 font-medium">
                              退款
                            </button>
                          </>
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
            显示 <span className="font-medium">{filteredOrders.length}</span> 个订单
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

      {/* 收入统计卡片 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">今日收入</p>
              <p className="text-2xl font-bold text-success-600">¥2,580</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
          <div className="text-sm text-success-600">↑ 15% 较昨日</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">本周收入</p>
              <p className="text-2xl font-bold text-success-600">¥15,680</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          <div className="text-sm text-success-600">↑ 8% 较上周</div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">本月收入</p>
              <p className="text-2xl font-bold text-success-600">¥68,520</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
          <div className="text-sm text-success-600">↑ 12% 较上月</div>
        </div>
      </div>
    </div>
  )
}
