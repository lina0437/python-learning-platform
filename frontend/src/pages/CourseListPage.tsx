export default function CourseListPage() {
  const courses = [
    { id: 1, title: 'Python 入门基础', lessons: 20, students: 1234, level: '初级' },
    { id: 2, title: 'Python 数据分析', lessons: 15, students: 892, level: '中级' },
    { id: 3, title: 'Python Web 开发', lessons: 25, students: 567, level: '中级' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">全部课程</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <div className="text-gray-600 text-sm mb-4">
              <span>{course.lessons} 课时</span>
              <span className="mx-2">•</span>
              <span>{course.students} 人在学</span>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.level}</span>
            </div>
            <a href={`/courses/${course.id}`} className="btn-primary w-full block text-center">
              开始学习
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
