import { Link } from 'react-router-dom'

// 模拟博客文章数据
const blogPosts = [
  {
    id: 1,
    title: '2026 年 Python 学习路线图：从小白到工程师',
    excerpt: '本文详细介绍了 2026 年 Python 学习的完整路线，包括必备技能、学习资源、实战项目推荐，帮助你从零开始成长为合格的 Python 工程师。',
    author: '张老师',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    date: '2026-03-20',
    category: '学习路线',
    readTime: '10 分钟',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    tags: ['Python', '学习路线', '职业发展'],
  },
  {
    id: 2,
    title: 'Python 数据分析实战：5 个经典案例',
    excerpt: '通过 5 个真实的数据分析案例，带你掌握 Pandas、NumPy、Matplotlib 等核心库的实际应用，提升数据分析能力。',
    author: '李老师',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    date: '2026-03-18',
    category: '数据分析',
    readTime: '15 分钟',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['Python', '数据分析', 'Pandas'],
  },
  {
    id: 3,
    title: 'FastAPI vs Django：Web 框架如何选择？',
    excerpt: '深入对比 FastAPI 和 Django 两个主流 Python Web 框架，从性能、易用性、生态系统等多个维度分析，帮助你做出最佳选择。',
    author: '王老师',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: '2026-03-15',
    category: 'Web 开发',
    readTime: '12 分钟',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    tags: ['FastAPI', 'Django', 'Web 开发'],
  },
  {
    id: 4,
    title: '机器学习入门：从零开始理解神经网络',
    excerpt: '用通俗易懂的方式讲解神经网络的基本原理，配合 Python 代码实现，让你轻松入门机器学习。',
    author: '赵老师',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    date: '2026-03-12',
    category: '人工智能',
    readTime: '20 分钟',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    tags: ['机器学习', '神经网络', '深度学习'],
  },
  {
    id: 5,
    title: 'Python 面试必备：50 道经典面试题解析',
    excerpt: '整理了 50 道 Python 面试中最常见的问题，包含详细解析和代码示例，助你顺利通过面试。',
    author: '张老师',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    date: '2026-03-10',
    category: '面试求职',
    readTime: '25 分钟',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    tags: ['面试', 'Python', '求职'],
  },
  {
    id: 6,
    title: '自动化办公：用 Python 提升 10 倍工作效率',
    excerpt: '学习如何使用 Python 自动化处理 Excel、PDF、邮件等日常办公任务，让你从重复劳动中解放出来。',
    author: '王老师',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: '2026-03-08',
    category: '办公自动化',
    readTime: '18 分钟',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tags: ['自动化', '办公', '效率'],
  },
]

const categories = [
  { name: '全部', count: 56 },
  { name: '学习路线', count: 12 },
  { name: '数据分析', count: 15 },
  { name: 'Web 开发', count: 10 },
  { name: '人工智能', count: 8 },
  { name: '面试求职', count: 6 },
  { name: '办公自动化', count: 5 },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            技术博客
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            分享 Python 学习心得、技术教程、行业动态，助你快速成长
          </p>
        </div>
      </section>

      {/* 内容区 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧：文章列表 */}
            <div className="flex-1">
              {/* 搜索框 */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="搜索文章..."
                  className="input-base"
                />
              </div>

              {/* 文章列表 */}
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <article key={post.id} className="card overflow-hidden">
                    <div className="md:flex">
                      {/* 封面图 */}
                      <div className="md:w-64 h-48 md:h-auto bg-neutral-200 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 内容区 */}
                      <div className="p-6 flex-1">
                        {/* 分类标签 */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="badge badge-primary">
                            {post.category}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {post.date}
                          </span>
                          <span className="text-sm text-neutral-500">
                            · {post.readTime}
                          </span>
                        </div>

                        {/* 标题 */}
                        <Link to={`/blog/${post.id}`}>
                          <h2 className="text-xl font-bold text-neutral-900 mb-2 hover:text-primary-600 transition-colors">
                            {post.title}
                          </h2>
                        </Link>

                        {/* 摘要 */}
                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* 作者信息 */}
                        <div className="flex items-center">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <span className="text-sm text-neutral-600">
                            {post.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* 分页器 */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    上一页
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    3
                  </button>
                  <span className="px-2 text-neutral-400">...</span>
                  <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    10
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    下一页
                  </button>
                </nav>
              </div>
            </div>

            {/* 右侧：侧边栏 */}
            <aside className="md:w-80 space-y-6">
              {/* 分类目录 */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  分类目录
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/blog?category=${category.name}`}
                      className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <span className="text-neutral-700">{category.name}</span>
                      <span className="text-sm text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 热门文章 */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  🔥 热门文章
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Link key={index} to={`/blog/${index}`} className="block group">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg font-bold text-neutral-300 group-hover:text-primary-600 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                            Python 学习最常见的 10 个坑，你踩过几个？
                          </h4>
                          <p className="text-xs text-neutral-500 mt-1">
                            2,345 阅读
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 订阅通讯 */}
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  📧 订阅通讯
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  每周精选 Python 技术文章，免费订阅
                </p>
                <input
                  type="email"
                  placeholder="你的邮箱"
                  className="input-base mb-3 text-sm"
                />
                <button className="btn-primary w-full text-sm">
                  立即订阅
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
