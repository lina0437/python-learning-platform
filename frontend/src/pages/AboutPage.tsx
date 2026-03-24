import { Link } from 'react-router-dom'

const teamMembers = [
  {
    name: '张老师',
    role: '创始人 & 首席讲师',
    bio: '10 年 Python 开发经验，曾就职于 BAT，累计授课 10,000+ 学员',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    name: '李老师',
    role: '数据科学讲师',
    bio: '前阿里数据专家，擅长数据分析和机器学习实战教学',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    name: '王老师',
    role: 'Web 开发讲师',
    bio: '全栈工程师，精通 Django、FastAPI 等主流框架',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: '赵老师',
    role: 'AI 讲师',
    bio: '人工智能博士，专注深度学习和计算机视觉研究',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  },
]

const stats = [
  { label: '注册学员', value: '10,000+', icon: '👥' },
  { label: '精品课程', value: '50+', icon: '📚' },
  { label: '平均评分', value: '4.9', icon: '⭐' },
  { label: '完课率', value: '65%', icon: '📊' },
]

const values = [
  {
    title: '教学质量第一',
    description: '每一门课程都经过精心打磨，确保内容实用、讲解清晰',
    icon: '🎯',
  },
  {
    title: '实战导向',
    description: '拒绝纸上谈兵，所有课程都包含真实项目实战',
    icon: '💻',
  },
  {
    title: '持续更新',
    description: '技术日新月异，课程内容定期更新，紧跟行业前沿',
    icon: '🔄',
  },
  {
    title: '贴心服务',
    description: '专属学习群、答疑服务、作业批改，学习路上不孤单',
    icon: '❤️',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            关于我们
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            致力于让每个人都能轻松学会 Python，开启编程职业生涯
          </p>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              我们的使命
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              让学习 Python 变得简单、有趣、高效，帮助更多人掌握这项 21 世纪的必备技能
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                教育理念
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                我们相信，学习编程不应该枯燥乏味。通过交互式学习、即时反馈、实战项目，
                让学习过程充满成就感。每个人都能学会 Python，关键是找到正确的方法。
              </p>
            </div>

            <div className="card p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                发展目标
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                成为国内领先的 Python 在线教育平台，帮助 100 万学员掌握 Python 技能，
                实现职业发展和个人成长的突破。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              核心价值观
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 讲师团队 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              讲师团队
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              我们的讲师都来自一线互联网公司，拥有丰富的实战经验和教学热情
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="card overflow-hidden text-center">
                <div className="aspect-square bg-neutral-200">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-neutral-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            联系我们
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            有任何问题或建议，欢迎随时联系我们
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card p-6">
              <div className="text-2xl mb-3">📧</div>
              <h3 className="font-semibold text-neutral-900 mb-2">邮箱</h3>
              <p className="text-neutral-600 text-sm">contact@pythonlearn.com</p>
            </div>

            <div className="card p-6">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold text-neutral-900 mb-2">微信客服</h3>
              <p className="text-neutral-600 text-sm">PythonLearn001</p>
            </div>

            <div className="card p-6">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="font-semibold text-neutral-900 mb-2">电话</h3>
              <p className="text-neutral-600 text-sm">400-xxx-xxxx</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            准备好开始学习了吗？
          </h2>
          <p className="text-neutral-600 mb-8">
            立即加入，与 10,000+ 学员一起开启 Python 学习之旅
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn-primary text-lg py-3 px-8">
              免费注册
            </Link>
            <Link to="/courses" className="btn-outline text-lg py-3 px-8">
              浏览课程
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
