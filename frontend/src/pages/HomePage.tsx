import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-python-light to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            学会 Python，从这里开始
          </h1>
          <p className="text-xl mb-8 opacity-90">
            交互式学习体验，边学边练，即时反馈
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="bg-white text-python-light font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              免费开始学习
            </Link>
            <Link to="/courses" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-python-light transition-colors">
              浏览课程
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们？</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">在线代码编辑器</h3>
              <p className="text-gray-600">无需安装环境，打开浏览器就能写代码</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">即时运行反馈</h3>
              <p className="text-gray-600">代码写完立即看到结果，学习更高效</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">系统化课程</h3>
              <p className="text-gray-600">从零基础到进阶，循序渐进的学习路径</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始学习了吗？</h2>
          <p className="text-gray-600 mb-8">立即注册，开启你的 Python 编程之旅</p>
          <Link to="/register" className="btn-primary text-lg py-3 px-8">
            免费注册
          </Link>
        </div>
      </section>
    </div>
  )
}
