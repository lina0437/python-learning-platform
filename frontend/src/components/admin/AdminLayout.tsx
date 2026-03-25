import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  // 导航菜单
  const menuItems = [
    {
      category: '概览',
      items: [
        { path: '/admin', label: '数据看板', icon: '📊' },
      ],
    },
    {
      category: '内容管理',
      items: [
        { path: '/admin/courses', label: '课程管理', icon: '📚' },
        { path: '/admin/chapters', label: '章节管理', icon: '📑' },
        { path: '/admin/exercises', label: '练习管理', icon: '✍️' },
      ],
    },
    {
      category: '用户管理',
      items: [
        { path: '/admin/users', label: '学员管理', icon: '👥' },
        { path: '/admin/orders', label: '订单管理', icon: '💰' },
      ],
    },
    {
      category: '系统设置',
      items: [
        { path: '/admin/settings', label: '系统设置', icon: '⚙️' },
      ],
    },
  ]

  // 检查当前路径是否激活
  const isActive = (path: string) => {
    return location.pathname === path
  }

  // 退出登录
  const handleLogout = () => {
    // TODO: 实现退出登录逻辑
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* 侧边栏 */}
      <aside
        className={`bg-neutral-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-neutral-800">
          <Link to="/admin" className="flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            {sidebarOpen && (
              <span className="font-bold text-lg">管理后台</span>
            )}
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 py-4">
          {menuItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              {sidebarOpen && (
                <div className="px-4 mb-2 text-xs text-neutral-500 uppercase tracking-wider">
                  {category.category}
                </div>
              )}
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* 底部操作 */}
        <div className="border-t border-neutral-800 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <span className="mr-2">🚪</span>
            {sidebarOpen && <span>退出登录</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-4">
            {/* 返回前台链接 */}
            <Link
              to="/"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              → 返回前台
            </Link>

            {/* 管理员信息 */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                管
              </div>
              <span className="text-sm font-medium text-neutral-700">管理员</span>
            </div>
          </div>
        </header>

        {/* 内容区 */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
