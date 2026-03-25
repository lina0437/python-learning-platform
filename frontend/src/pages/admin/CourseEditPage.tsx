import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface CourseFormData {
  title: string
  subtitle: string
  description: string
  categoryId: string
  difficulty: string
  tags: string[]
  coverImage: string | null
  whatYouWillLearn: string[]
  requirements: string[]
  targetAudience: string[]
  price: number
  originalPrice: number
  status: 'draft' | 'published'
}

const categories = [
  { value: 'programming', label: '编程基础' },
  { value: 'data', label: '数据分析' },
  { value: 'web', label: 'Web 开发' },
  { value: 'crawler', label: '爬虫开发' },
  { value: 'ai', label: '人工智能' },
  { value: 'automation', label: '办公自动化' },
]

const difficulties = [
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
]

export default function CourseEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isDirty, setIsDirty] = useState(false)

  // 表单数据
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    subtitle: '',
    description: '',
    categoryId: '',
    difficulty: 'beginner',
    tags: [],
    coverImage: null,
    whatYouWillLearn: [''],
    requirements: [''],
    targetAudience: [''],
    price: 0,
    originalPrice: 0,
    status: 'draft',
  })

  const isEditMode = !!id

  // 步骤配置
  const steps = [
    { id: 1, title: '基本信息', icon: '📝' },
    { id: 2, title: '课程内容', icon: '📚' },
    { id: 3, title: '定价设置', icon: '💰' },
    { id: 4, title: '发布', icon: '🚀' },
  ]

  // 处理表单变更
  const handleChange = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setIsDirty(true)
  }

  // 处理数组字段变更
  const handleArrayChange = (field: keyof CourseFormData, index: number, value: string) => {
    const newArray = [...formData[field] as string[]]
    newArray[index] = value
    handleChange(field, newArray)
  }

  // 添加数组项
  const addArrayItem = (field: keyof CourseFormData) => {
    handleChange(field, [...(formData[field] as string[]), ''])
  }

  // 删除数组项
  const removeArrayItem = (field: keyof CourseFormData, index: number) => {
    const newArray = (formData[field] as string[]).filter((_, i) => i !== index)
    handleChange(field, newArray)
  }

  // 验证当前步骤
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.title.trim() !== '' && 
               formData.subtitle.trim() !== '' &&
               formData.categoryId !== ''
      case 2:
        // TODO: 验证课程内容
        return true
      case 3:
        return formData.price >= 0
      default:
        return true
    }
  }

  // 下一步
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    } else {
      alert('请填写完整信息')
    }
  }

  // 上一步
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1)
  }

  // 保存草稿
  const handleSaveDraft = async () => {
    // TODO: 调用 API 保存
    console.log('保存草稿:', formData)
    alert('草稿已保存')
  }

  // 发布课程
  const handlePublish = async () => {
    // TODO: 调用 API 发布
    console.log('发布课程:', formData)
    alert('课程发布成功！')
    navigate('/admin/courses')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {isEditMode ? '编辑课程' : '创建课程'}
          </h1>
          <p className="text-neutral-600 mt-1">
            创建一门高质量课程，分享你的知识
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/courses')}
          className="text-sm text-neutral-600 hover:text-neutral-900"
        >
          ← 返回列表
        </button>
      </div>

      {/* 步骤导航 */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* 步骤节点 */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                    currentStep > step.id
                      ? 'bg-success-500 text-white'
                      : currentStep === step.id
                      ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep === step.id
                      ? 'text-primary-600'
                      : 'text-neutral-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-1 bg-neutral-200 rounded">
                  <div
                    className={`h-full rounded transition-all ${
                      currentStep > step.id ? 'bg-success-500' : ''
                    }`}
                    style={{ width: currentStep > step.id ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="card p-6 min-h-[500px]">
        {/* 步骤 1: 基本信息 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                课程基本信息
              </h3>

              {/* 课程标题 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程标题 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="例如：Python 零基础入门"
                  className="input-base"
                  maxLength={60}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  建议：清晰描述课程内容和目标，不超过 30 字
                </p>
              </div>

              {/* 课程副标题 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程副标题
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  placeholder="例如：从零开始掌握 Python 编程基础，30 天学会 Python"
                  className="input-base"
                  maxLength={120}
                />
              </div>

              {/* 课程分类 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程分类 *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleChange('categoryId', e.target.value)}
                  className="input-base"
                >
                  <option value="">请选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 课程难度 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程难度 *
                </label>
                <div className="flex space-x-4">
                  {difficulties.map((diff) => (
                    <label key={diff.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff.value}
                        checked={formData.difficulty === diff.value}
                        onChange={(e) => handleChange('difficulty', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-neutral-700">{diff.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 课程封面 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程封面
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm text-neutral-600 mb-1">
                    点击上传或拖拽到此处
                  </p>
                  <p className="text-xs text-neutral-500">
                    建议尺寸：1200×675px (16:9)，支持 JPG、PNG，最大 5MB
                  </p>
                </div>
              </div>

              {/* 课程简介 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程简介 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="详细介绍课程内容、特色和适合人群..."
                  className="input-base"
                  rows={6}
                  maxLength={2000}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.description.length}/2000 字
                </p>
              </div>

              {/* 学完本课程后，学员将能够 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  学完本课程后，学员将能够：
                </label>
                <div className="space-y-2">
                  {formData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-success-500">✓</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('whatYouWillLearn', index, e.target.value)}
                        className="input-base flex-1"
                        placeholder="输入学习目标"
                      />
                      {formData.whatYouWillLearn.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('whatYouWillLearn', index)}
                          className="text-error-500 hover:text-error-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('whatYouWillLearn')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + 添加学习目标
                  </button>
                </div>
              </div>

              {/* 课程要求 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程要求
                </label>
                <div className="space-y-2">
                  {formData.requirements.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-neutral-400">•</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        className="input-base flex-1"
                        placeholder="输入课程要求"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('requirements', index)}
                          className="text-error-500 hover:text-error-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('requirements')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + 添加课程要求
                  </button>
                </div>
              </div>

              {/* 适合人群 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  适合人群
                </label>
                <div className="space-y-2">
                  {formData.targetAudience.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-neutral-400">👤</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('targetAudience', index, e.target.value)}
                        className="input-base flex-1"
                        placeholder="输入适合人群"
                      />
                      {formData.targetAudience.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('targetAudience', index)}
                          className="text-error-500 hover:text-error-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('targetAudience')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + 添加适合人群
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 步骤 2: 课程内容 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                课程内容管理
              </h3>
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-neutral-600 mb-4">
                  课程内容编辑功能开发中...
                </p>
                <p className="text-sm text-neutral-500">
                  下一步将实现章节和课时的添加、编辑、排序功能
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 步骤 3: 定价设置 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                定价设置
              </h3>

              {/* 课程价格 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程价格（元）*
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', Number(e.target.value))}
                    className="input-base w-48"
                    min="0"
                    step="1"
                  />
                  <span className="text-sm text-neutral-500">
                    建议价格：99-699 元
                  </span>
                </div>
              </div>

              {/* 原价 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  课程原价（元）
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleChange('originalPrice', Number(e.target.value))}
                  className="input-base w-48"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  用于显示折扣，建议设置为价格的 1.5-2 倍
                </p>
              </div>

              {/* 免费课程 */}
              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.price === 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange('price', 0)
                        handleChange('originalPrice', 0)
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-neutral-700">设为免费课程</span>
                </label>
              </div>

              {/* 价格预览 */}
              {formData.price > 0 && formData.originalPrice > 0 && (
                <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                  <p className="text-sm font-medium text-warning-700 mb-2">
                    价格预览：
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-error-600">
                      ¥{formData.price}
                    </span>
                    <span className="text-lg text-neutral-400 line-through">
                      ¥{formData.originalPrice}
                    </span>
                    <span className="badge badge-error">
                      省{Math.round((1 - formData.price / formData.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 步骤 4: 发布 */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                发布课程
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2">
                  准备好发布课程了吗？
                </h4>
                <p className="text-neutral-600 mb-6">
                  发布后，学员将可以浏览和购买你的课程
                </p>

                {/* 发布选项 */}
                <div className="max-w-md mx-auto space-y-3">
                  <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
                    <input
                      type="radio"
                      name="publishOption"
                      checked={formData.status === 'published'}
                      onChange={() => handleChange('status', 'published')}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">立即发布</p>
                      <p className="text-sm text-neutral-500">课程将立即上架，学员可以购买</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
                    <input
                      type="radio"
                      name="publishOption"
                      checked={formData.status === 'draft'}
                      onChange={() => handleChange('status', 'draft')}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">保存为草稿</p>
                      <p className="text-sm text-neutral-500">稍后再编辑和发布</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部操作按钮 */}
      <div className="card p-6 flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <button
              onClick={handlePrev}
              className="btn-secondary mr-3"
            >
              ← 上一步
            </button>
          )}
          <button
            onClick={handleSaveDraft}
            className="btn-secondary"
          >
            💾 保存草稿
          </button>
        </div>

        <div className="flex space-x-3">
          {currentStep < steps.length ? (
            <button onClick={handleNext} className="btn-primary">
              下一步 →
            </button>
          ) : (
            <>
              {formData.status === 'draft' ? (
                <button onClick={handleSaveDraft} className="btn-secondary">
                  💾 保存草稿
                </button>
              ) : (
                <button onClick={handlePublish} className="btn-success">
                  🚀 发布课程
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
