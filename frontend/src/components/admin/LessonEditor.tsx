import { useState } from 'react'
import VideoUploader from './VideoUploader'

interface Lesson {
  id: number
  title: string
  lessonType: 'video' | 'text' | 'exercise' | 'quiz'
  videoUrl?: string
  content?: string
  isFreeTrial: boolean
}

interface LessonEditorProps {
  lesson: Lesson
  onSave: (lesson: Lesson) => void
  onCancel: () => void
}

export default function LessonEditor({ lesson, onSave, onCancel }: LessonEditorProps) {
  const [editedLesson, setEditedLesson] = useState<Lesson>({ ...lesson })

  const handleChange = (field: keyof Lesson, value: any) => {
    setEditedLesson(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!editedLesson.title.trim()) {
      alert('请输入课时标题')
      return
    }
    onSave(editedLesson)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* 标题栏 */}
        <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-neutral-900">编辑课时</h3>
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-6 space-y-6">
          {/* 课时标题 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              课时标题 *
            </label>
            <input
              type="text"
              value={editedLesson.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="例如：什么是 Python"
              className="input-base"
              autoFocus
            />
          </div>

          {/* 课时类型 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              课时类型 *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'video', label: '视频课', icon: '📹' },
                { value: 'text', label: '文本课', icon: '📄' },
                { value: 'exercise', label: '练习题', icon: '✍️' },
                { value: 'quiz', label: '测验', icon: '📝' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleChange('lessonType', type.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    editedLesson.lessonType === type.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium text-neutral-900">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 视频上传（如果是视频课） */}
          {editedLesson.lessonType === 'video' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                视频上传
              </label>
              <VideoUploader
                onUploadComplete={(videoUrl) => {
                  handleChange('videoUrl', videoUrl)
                }}
                maxSize={2048}
              />
            </div>
          )}

          {/* 文本内容（如果是文本课） */}
          {editedLesson.lessonType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                文本内容 *
              </label>
              <textarea
                value={editedLesson.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="输入文本内容..."
                className="input-base"
                rows={10}
              />
            </div>
          )}

          {/* 免费试学 */}
          <div className="flex items-center p-4 bg-neutral-50 rounded-lg">
            <input
              type="checkbox"
              id="isFreeTrial"
              checked={editedLesson.isFreeTrial}
              onChange={(e) => handleChange('isFreeTrial', e.target.checked)}
              className="mr-3 h-4 w-4"
            />
            <label htmlFor="isFreeTrial" className="text-sm text-neutral-700 cursor-pointer">
              <span className="font-medium">设为免费试学</span>
              <p className="text-xs text-neutral-500 mt-1">
                学员可以免费学习这个课时，用于课程预览
              </p>
            </label>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="px-6 py-4 border-t flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            💾 保存课时
          </button>
        </div>
      </div>
    </div>
  )
}
