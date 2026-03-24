import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // 模拟用户登录状态（后续会从 context 获取）
  const isLoggedIn = false
  
  // 导航链接
  const navLinks = [
    { path: '/courses', label: '课程中心' },
    { path: '/paths', label: '学习路径' },
    { path: '/about', label: '关于我们' },
    { path: '/blog', label: '技术博客' },
  ]
  
  // 检查当前路径是否激活
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo 和品牌 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🐍</span>
              <span className="font-bold text-xl text-neutral-900">Python 学习平台</span>
            </Link>
            
            {/* 桌面端导航 */}
            <div className="hidden md:flex ml-12 space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* 右侧操作区 */}
          <div className="flex items-center space-x-3">
            {/* 搜索框（桌面端） */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="搜索课程..."
                className="input-base w-64 pl-10 pr-4 py-2 text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
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
            
            {isLoggedIn ? (
              // 已登录状态
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:bg-neutral-50 px-3 py-2 rounded-lg transition-colors">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                      张
                    </div>
                    <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* 下拉菜单 */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      个人中心
                    </Link>
                    <Link to="/dashboard/courses" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      我的课程
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                      账户设置
                    </Link>
                    <hr className="my-1 border-neutral-100" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-error-50">
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // 未登录状态
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  免费注册
                </Link>
              </div>
            )}
            
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <div className="flex flex-col space-y-2">
              {/* 搜索框（移动端） */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="搜索课程..."
                  className="input-base w-full pl-10 pr-4 py-2 text-sm"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
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
              
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <hr className="my-2 border-neutral-100" />
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    个人中心
                  </Link>
                  <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 text-left">
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    免费注册
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
