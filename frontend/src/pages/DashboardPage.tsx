export default function DashboardPage() {
  const user = {
    name: '用户',
    progress: 35,
    completedLessons: 7,
    totalLessons: 20,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">学习中心</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Progress Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-gray-600 mb-2">学习进度</h3>
          <div className="text-3xl font-bold mb-4">{user.progress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full" 
              style={{ width: `${user.progress}%` }}
            />
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-gray-600 mb-2">已完成课时</h3>
          <div className="text-3xl font-bold">
            {user.completedLessons} / {user.totalLessons}
          </div>
        </div>

        {/* Continue Learning */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-gray-600 mb-2">继续学习</h3>
          <div className="text-lg font-semibold mb-2">Python 入门基础</div>
          <button className="btn-primary text-sm">
            继续学习
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">我的课程</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Python 入门基础</h3>
              <p className="text-gray-600 text-sm">进度：35%</p>
            </div>
            <button className="btn-primary text-sm">
              继续学习
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
