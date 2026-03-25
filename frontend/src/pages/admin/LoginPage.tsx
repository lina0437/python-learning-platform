import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: 调用 API 登录
      // 模拟登录
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 登录成功，跳转到后台首页
      navigate('/admin')
    } catch (err) {
      setError('邮箱或密码错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            管理后台
          </h1>
          <p className="text-white text-opacity-80">
            Python 学习平台管理系统
          </p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            管理员登录
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <p className="text-error-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pythonlearn.com"
                className="input-base"
                required
              />
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base"
                required
              />
            </div>

            {/* 记住我 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600">
                记住我
              </label>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* 找回密码 */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
              忘记密码？
            </a>
          </div>

          {/* 返回前台 */}
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              ← 返回前台
            </a>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center mt-8 text-white text-opacity-60 text-sm">
          <p>&copy; 2026 Python 学习平台。All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
