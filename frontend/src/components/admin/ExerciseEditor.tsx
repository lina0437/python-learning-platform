import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'

interface Exercise {
  id: number
  title: string
  description: string
  starterCode: string
  solutionCode: string
  testCases: TestCase[]
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  tags: string[]
}

interface TestCase {
  id: number
  input: string
  expectedOutput: string
  description: string
}

interface ExerciseEditorProps {
  exercise?: Exercise
  onSave: (exercise: Exercise) => void
  onCancel: () => void
}

export default function ExerciseEditor({ exercise, onSave, onCancel }: ExerciseEditorProps) {
  const [editedExercise, setEditedExercise] = useState<Exercise>({
    id: exercise?.id || Date.now(),
    title: exercise?.title || '',
    description: exercise?.description || '',
    starterCode: exercise?.starterCode || '# 请在下方编写代码\n',
    solutionCode: exercise?.solutionCode || '',
    testCases: exercise?.testCases || [],
    difficulty: exercise?.difficulty || 'easy',
    points: exercise?.points || 10,
    tags: exercise?.tags || [],
  })

  const [activeTab, setActiveTab] = useState<'basic' | 'code' | 'test' | 'preview'>('basic')

  const handleChange = (field: keyof Exercise, value: any) => {
    setEditedExercise(prev => ({ ...prev, [field]: value }))
  }

  // 添加测试用例
  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now(),
      input: '',
      expectedOutput: '',
      description: '',
    }
    handleChange('testCases', [...editedExercise.testCases, newTestCase])
  }

  // 更新测试用例
  const updateTestCase = (id: number, field: keyof TestCase, value: string) => {
    handleChange(
      'testCases',
      editedExercise.testCases.map(tc =>
        tc.id === id ? { ...tc, [field]: value } : tc
      )
    )
  }

  // 删除测试用例
  const deleteTestCase = (id: number) => {
    handleChange(
      'testCases',
      editedExercise.testCases.filter(tc => tc.id !== id)
    )
  }

  // 添加标签
  const addTag = (tag: string) => {
    if (tag && !editedExercise.tags.includes(tag)) {
      handleChange('tags', [...editedExercise.tags, tag])
    }
  }

  // 删除标签
  const removeTag = (tag: string) => {
    handleChange('tags', editedExercise.tags.filter(t => t !== tag))
  }

  const handleSave = () => {
    if (!editedExercise.title.trim()) {
      alert('请输入题目名称')
      return
    }
    if (editedExercise.testCases.length === 0) {
      alert('请至少添加一个测试用例')
      return
    }
    onSave(editedExercise)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8">
        {/* 标题栏 */}
        <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-xl">
          <h3 className="text-lg font-bold text-neutral-900">
            {exercise ? '编辑练习题目' : '创建练习题目'}
          </h3>
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>

        {/* 标签页导航 */}
        <div className="px-6 pt-4 border-b">
          <div className="flex space-x-4">
            {[
              { id: 'basic', label: '基本信息', icon: '📝' },
              { id: 'code', label: '代码设置', icon: '💻' },
              { id: 'test', label: '测试用例', icon: '✓' },
              { id: 'preview', label: '预览', icon: '👁️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* 基本信息 */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* 题目名称 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  题目名称 *
                </label>
                <input
                  type="text"
                  value={editedExercise.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="例如：打印 Hello, World!"
                  className="input-base"
                  autoFocus
                />
              </div>

              {/* 题目描述 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  题目描述 *
                </label>
                <textarea
                  value={editedExercise.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="详细描述题目要求、输入输出说明、示例等..."
                  className="input-base"
                  rows={8}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  支持 Markdown 语法
                </p>
              </div>

              {/* 难度 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  难度 *
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'easy', label: '简单', color: 'bg-success-100 text-success-700' },
                    { value: 'medium', label: '中等', color: 'bg-warning-100 text-warning-700' },
                    { value: 'hard', label: '困难', color: 'bg-error-100 text-error-700' },
                  ].map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => handleChange('difficulty', diff.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        editedExercise.difficulty === diff.value
                          ? diff.color + ' ring-2 ring-offset-2 ring-current'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 分值 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  分值 *
                </label>
                <input
                  type="number"
                  value={editedExercise.points}
                  onChange={(e) => handleChange('points', Number(e.target.value))}
                  className="input-base w-32"
                  min="1"
                  max="100"
                />
              </div>

              {/* 标签 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  标签
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedExercise.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-primary-900"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="输入标签后按回车添加"
                  className="input-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag(e.currentTarget.value.trim())
                      e.currentTarget.value = ''
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* 代码设置 */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              {/* 起始代码 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  起始代码（学员看到的初始代码）
                </label>
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <MonacoEditor
                    height="300px"
                    language="python"
                    value={editedExercise.starterCode}
                    onChange={(value) => handleChange('starterCode', value || '')}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>

              {/* 参考答案 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  参考答案（学员不可见）
                </label>
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <MonacoEditor
                    height="300px"
                    language="python"
                    value={editedExercise.solutionCode}
                    onChange={(value) => handleChange('solutionCode', value || '')}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 测试用例 */}
          {activeTab === 'test' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-neutral-900">测试用例</h4>
                <button onClick={addTestCase} className="btn-primary text-sm">
                  + 添加测试用例
                </button>
              </div>

              {editedExercise.testCases.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <p className="text-neutral-500">还没有测试用例，点击添加</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {editedExercise.testCases.map((testCase, index) => (
                    <div key={testCase.id} className="card p-4 border border-neutral-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-neutral-900">测试用例 {index + 1}</h5>
                        <button
                          onClick={() => deleteTestCase(testCase.id)}
                          className="text-error-500 hover:text-error-700"
                        >
                          🗑️ 删除
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">
                            输入
                          </label>
                          <textarea
                            value={testCase.input}
                            onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                            placeholder="输入数据"
                            className="input-base text-sm"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">
                            期望输出
                          </label>
                          <textarea
                            value={testCase.expectedOutput}
                            onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                            placeholder="期望的输出结果"
                            className="input-base text-sm"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                          描述（可选）
                        </label>
                        <input
                          type="text"
                          value={testCase.description}
                          onChange={(e) => updateTestCase(testCase.id, 'description', e.target.value)}
                          placeholder="测试用例说明"
                          className="input-base text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 预览 */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">{editedExercise.title}</h4>
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    editedExercise.difficulty === 'easy' ? 'bg-success-100 text-success-700' :
                    editedExercise.difficulty === 'medium' ? 'bg-warning-100 text-warning-700' :
                    'bg-error-100 text-error-700'
                  }`}>
                    {editedExercise.difficulty === 'easy' ? '简单' :
                     editedExercise.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                  <span className="text-sm text-neutral-600">{editedExercise.points} 分</span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-neutral-700 whitespace-pre-line">{editedExercise.description}</p>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-neutral-900 mb-2">起始代码</h5>
                <div className="bg-neutral-50 p-4 rounded-lg font-mono text-sm text-neutral-800">
                  <pre>{editedExercise.starterCode || '无'}</pre>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-neutral-900 mb-2">测试用例（{editedExercise.testCases.length}个）</h5>
                <div className="space-y-2">
                  {editedExercise.testCases.map((tc, index) => (
                    <div key={tc.id} className="bg-neutral-50 p-3 rounded-lg text-sm">
                      <div className="font-medium text-neutral-900 mb-1">测试 {index + 1}</div>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div>
                          <span className="text-neutral-600">输入：</span>
                          <code className="bg-white px-2 py-1 rounded">{tc.input || '无'}</code>
                        </div>
                        <div>
                          <span className="text-neutral-600">期望输出：</span>
                          <code className="bg-white px-2 py-1 rounded">{tc.expectedOutput || '无'}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="px-6 py-4 border-t flex items-center justify-end space-x-3 sticky bottom-0 bg-white rounded-b-xl">
          <button onClick={onCancel} className="btn-secondary">
            取消
          </button>
          <button onClick={handleSave} className="btn-primary">
            💾 保存题目
          </button>
        </div>
      </div>
    </div>
  )
}
