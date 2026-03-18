import { useParams, Link } from 'react-router-dom'

export default function CourseDetailPage() {
  const { id } = useParams()

  // TODO: 从 API 获取课程详情
  const course = {
    id: Number(id),
    title: 'Python 入门基础',
    description: '从零开始学习 Python 编程，适合完全没有编程基础的同学。',
    lessons: [
      { id: 1, title: '什么是 Python', duration: '10 分钟', free: true },
      { id: 2, title: '安装 Python 环境', duration: '15 分钟', free: true },
      { id: 3, title: '第一个 Python 程序', duration: '20 分钟', free: false },
      { id: 4, title: '变量和数据类型', duration: '25 分钟', free: false },
    ]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-600">共 {course.lessons.length} 课时</span>
          <span className="text-gray-600">初级难度</span>
        </div>
        <Link to={`/lesson/${course.lessons[0].id}`} className="btn-primary">
          开始学习
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">课程大纲</h2>
        <div className="space-y-4">
          {course.lessons.map(lesson => (
            <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-gray-600 text-sm">{lesson.duration}</p>
              </div>
              <Link 
                to={`/lesson/${lesson.id}`}
                className={`px-4 py-2 rounded-lg ${lesson.free ? 'btn-secondary' : 'btn-primary'}`}
              >
                {lesson.free ? '免费试学' : '解锁学习'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
