import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🐍</span>
              <span className="font-bold text-xl text-gray-900">Python 学习平台</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/courses" className="text-gray-600 hover:text-gray-900">
                课程
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                学习中心
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              登录
            </Link>
            <Link to="/register" className="btn-primary">
              免费注册
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
