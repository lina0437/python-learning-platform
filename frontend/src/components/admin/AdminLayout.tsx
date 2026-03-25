import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  
  // 模拟用户信息（后续从 context 获取）
  const adminUser = {
    name: '张老师',
    role: '管理员',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  }

  // 导航菜单
  const navMenu = [
    {
      category: '概览',
      items: [
        { path: '/admin', label: '数据概览', icon: '📊' },
        { path: '/admin/courses', label: '课程管理', icon: '📚' },
        { path: '/admin/users', label: '用户管理', icon: '👥' },
        { path: '/admin/orders', label: '订单管理', icon: '💰' },
      ],
    },
    {
      category: '内容',
      items: [
        { path: '/admin/content/articles', label: '文章管理', icon: '📝' },
        { path: '/admin/content/media', label: '媒体资源', icon: '🎬' },
      ],
    },
    {
      category: '数据',
      items: [
        { path: '/admin/analytics/overview', label: '数据分析', icon: '📈' },
        { path: '/admin/analytics/reports', label: '报表中心', icon: '📑' },
      ],
    },
    {
      category: '系统',
      items: [
        { path: '/admin/settings/general', label: '通用设置', icon: '⚙️' },
        { path: '/admin/settings/permission', label: '权限管理', icon: '🔐' },
      ],
    },
  ]

  // 检查当前路径是否激活
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
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
        className={`bg-neutral-900 text-white fixed h-full transition-all duration-300 z-50
          ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="text-2xl">🐍</span>
              <span className="font-bold text-lg">管理后台</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navMenu.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              {sidebarOpen && (
                <div className="px-4 mb-2 text-xs font-semibold text-neutral-500 uppercase">
                  {category.category}
                </div>
              )}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 transition-colors
                      ${isActive(item.path)
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
            </div>
          ))}
        </nav>

        {/* 底部用户信息 */}
        <div className="p-4 border-t border-neutral-800">
          <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}>
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="h-10 w-10 rounded-full"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {adminUser.name}
                </div>
                <div className="text-xs text-neutral-400 truncate">
                  {adminUser.role}
                </div>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                title="退出登录"
              >
                🚪
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 sticky top-0 z-40">
          {/* 左侧：面包屑 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <nav className="flex items-center text-sm text-neutral-500">
              <Link to="/admin" className="hover:text-neutral-900">
                后台首页
              </Link>
              {location.pathname !== '/admin' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-neutral-900 font-medium">
                    {location.pathname.split('/').pop()}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* 右侧：操作区 */}
          <div className="flex items-center space-x-4">
            {/* 查看前台 */}
            <Link
              to="/"
              target="_blank"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              查看前台 →
            </Link>

            {/* 通知 */}
            <button className="relative p-2 rounded-lg hover:bg-neutral-100">
              <svg className="h-6 w-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full"></span>
            </button>

            {/* 设置 */}
            <button className="p-2 rounded-lg hover:bg-neutral-100">
              <svg className="h-6 w-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="bg-white border-t py-4 px-6 text-sm text-neutral-500">
          <div className="flex justify-between items-center">
            <p>&copy; 2026 Python 学习平台 - 管理后台</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-neutral-900">帮助中心</a>
              <a href="#" className="hover:text-neutral-900">反馈建议</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
