import { useState, useRef } from 'react'

interface VideoUploaderProps {
  onUploadComplete: (videoUrl: string) => void
  maxSize?: number // MB
  accept?: string
}

export default function VideoUploader({ 
  onUploadComplete, 
  maxSize = 2048, // 2GB
  accept = 'video/mp4,video/quicktime,video/x-msvideo' 
}: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError('')
    
    // 验证文件大小
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`文件大小超过限制（最大 ${maxSize}MB）`)
      return
    }

    // 验证文件类型
    if (!file.type.startsWith('video/')) {
      setError('请上传视频文件')
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      // 步骤 1: 获取上传 URL
      const response = await fetch('http://localhost:8000/api/v1/upload/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name: file.name,
          file_size: file.size,
          content_type: file.type,
        }),
      })

      if (!response.ok) {
        throw new Error('获取上传 URL 失败')
      }

      const { upload_url, video_url, video_id, expire_time } = await response.json()

      // 步骤 2: 直传 OSS
      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setProgress(percent)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setUploadedUrl(video_url)
          onUploadComplete(video_url)
          setUploading(false)
          setProgress(100)
        } else {
          setError(`上传失败：${xhr.statusText}`)
          setUploading(false)
        }
      })

      xhr.addEventListener('error', () => {
        setError('上传失败，请重试')
        setUploading(false)
      })

      xhr.open('PUT', upload_url)
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.setRequestHeader('Content-Length', file.size.toString())
      xhr.send(file)

    } catch (err) {
      setError(err instanceof Error ? err.message : '上传失败')
      setUploading(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      {!uploadedUrl && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            uploading 
              ? 'border-neutral-300 bg-neutral-50' 
              : 'border-neutral-300 hover:border-primary-500 hover:bg-primary-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileSelect(file)
            }}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="space-y-4">
              <div className="text-4xl">🎬</div>
              <p className="text-sm text-neutral-600">上传中...</p>
              <div className="w-full max-w-md mx-auto bg-neutral-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-primary-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-neutral-500">{progress}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">🎬</div>
              <p className="text-sm text-neutral-600">
                点击上传或拖拽视频到此处
              </p>
              <p className="text-xs text-neutral-500">
                支持格式：MP4, MOV, AVI | 最大大小：{maxSize}MB | 建议：1080p, H.264 编码
              </p>
            </div>
          )}
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-error-700 text-sm">❌ {error}</p>
          <button
            onClick={() => {
              setError('')
              setUploadedUrl('')
              setProgress(0)
            }}
            className="text-error-600 hover:text-error-800 text-sm mt-2"
          >
            重新上传
          </button>
        </div>
      )}

      {/* 上传成功 */}
      {uploadedUrl && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-success-700 font-medium">✓ 视频上传成功</p>
              <p className="text-success-600 text-sm mt-1 break-all">{uploadedUrl}</p>
            </div>
            <button
              onClick={() => {
                setUploadedUrl('')
                setProgress(0)
              }}
              className="text-success-600 hover:text-success-800 text-sm"
            >
              重新上传
            </button>
          </div>
          
          {/* 视频预览 */}
          <video 
            src={uploadedUrl} 
            controls 
            className="mt-4 w-full max-h-64 rounded-lg bg-black"
          />
        </div>
      )}
    </div>
  )
}
