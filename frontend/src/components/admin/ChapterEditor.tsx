import { useState } from 'react'

interface Chapter {
  id: number
  title: string
  description: string
  sortOrder: number
  lessons: Lesson[]
}

interface Lesson {
  id: number
  title: string
  lessonType: 'video' | 'text' | 'exercise' | 'quiz'
  videoUrl?: string
  videoDuration?: string
  content?: string
  sortOrder: number
  isFreeTrial: boolean
}

interface ChapterEditorProps {
  chapters: Chapter[]
  onChange: (chapters: Chapter[]) => void
}

export default function ChapterEditor({ chapters, onChange }: ChapterEditorProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null)

  // 添加章节
  const addChapter = () => {
    const newChapter: Chapter = {
      id: Date.now(),
      title: '',
      description: '',
      sortOrder: chapters.length,
      lessons: [],
    }
    onChange([...chapters, newChapter])
    setExpandedChapter(newChapter.id)
  }

  // 更新章节
  const updateChapter = (id: number, updates: Partial<Chapter>) => {
    onChange(chapters.map(ch => ch.id === id ? { ...ch, ...updates } : ch))
  }

  // 删除章节
  const deleteChapter = (id: number) => {
    if (confirm('确定要删除这个章节吗？该章节下的所有课时也会被删除。')) {
      onChange(chapters.filter(ch => ch.id !== id))
    }
  }

  // 添加课时
  const addLesson = (chapterId: number) => {
    const newLesson: Lesson = {
      id: Date.now(),
      title: '',
      lessonType: 'video',
      videoUrl: '',
      videoDuration: '',
      content: '',
      sortOrder: 0,
      isFreeTrial: false,
    }
    onChange(chapters.map(ch => {
      if (ch.id === chapterId) {
        return { ...ch, lessons: [...ch.lessons, newLesson] }
      }
      return ch
    }))
  }

  // 更新课时
  const updateLesson = (chapterId: number, lessonId: number, updates: Partial<Lesson>) => {
    onChange(chapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lessons: ch.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l),
        }
      }
      return ch
    }))
  }

  // 删除课时
  const deleteLesson = (chapterId: number, lessonId: number) => {
    onChange(chapters.map(ch => {
      if (ch.id === chapterId) {
        return { ...ch, lessons: ch.lessons.filter(l => l.id !== lessonId) }
      }
      return ch
    }))
  }

  // 移动章节顺序
  const moveChapter = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
        (direction === 'down' && index === chapters.length - 1)) {
      return
    }
    const newChapters = [...chapters]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newChapters[index], newChapters[targetIndex]] = 
    [newChapters[targetIndex], newChapters[index]]
    onChange(newChapters)
  }

  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className="card border border-neutral-200 overflow-hidden">
          {/* 章节标题栏 */}
          <div className="bg-neutral-50 px-4 py-3 flex items-center justify-between border-b">
            <div className="flex items-center space-x-3 flex-1">
              <button
                onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                className="p-1 hover:bg-neutral-200 rounded"
              >
                <svg
                  className={`h-5 w-5 text-neutral-400 transition-transform ${
                    expandedChapter === chapter.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <span className="font-semibold text-neutral-900">
                {chapter.title || `第${index + 1}章`}
              </span>
              <span className="text-sm text-neutral-500">
                {chapter.lessons.length} 课时
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => moveChapter(index, 'up')}
                disabled={index === 0}
                className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                onClick={() => moveChapter(index, 'down')}
                disabled={index === chapters.length - 1}
                className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
              >
                ↓
              </button>
              <button
                onClick={() => deleteChapter(chapter.id)}
                className="p-1 text-error-500 hover:text-error-700"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* 章节内容编辑 */}
          {expandedChapter === chapter.id && (
            <div className="p-4 space-y-4">
              {/* 章节标题 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  章节标题
                </label>
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                  placeholder="例如：第 1 章 Python 简介"
                  className="input-base"
                />
              </div>

              {/* 章节描述 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  章节描述
                </label>
                <textarea
                  value={chapter.description}
                  onChange={(e) => updateChapter(chapter.id, { description: e.target.value })}
                  placeholder="简要介绍本章内容..."
                  className="input-base"
                  rows={2}
                />
              </div>

              {/* 课时列表 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-900">课时列表</h4>
                  <button
                    onClick={() => addLesson(chapter.id)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + 添加课时
                  </button>
                </div>

                {chapter.lessons.length === 0 ? (
                  <div className="text-center py-8 bg-neutral-50 rounded-lg">
                    <p className="text-neutral-500 text-sm">还没有课时，点击添加</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-lg">
                            {lesson.lessonType === 'video' ? '📹' :
                             lesson.lessonType === 'text' ? '📄' :
                             lesson.lessonType === 'exercise' ? '✍️' : '📝'}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-neutral-900">
                              {lesson.title || `第${lessonIndex + 1}课`}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {lesson.lessonType === 'video' && '视频课'}
                              {lesson.lessonType === 'text' && '文本课'}
                              {lesson.lessonType === 'exercise' && '练习题'}
                              {lesson.lessonType === 'quiz' && '测验'}
                              {lesson.isFreeTrial && ' • 免费试学'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => deleteLesson(chapter.id, lesson.id)}
                            className="text-error-500 hover:text-error-700"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 添加章节按钮 */}
      <button
        onClick={addChapter}
        className="w-full py-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-500 hover:border-primary-500 hover:text-primary-600 transition-colors"
      >
        📚 添加章节
      </button>
    </div>
  )
}
