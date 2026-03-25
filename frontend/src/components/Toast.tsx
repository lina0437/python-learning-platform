import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: () => void
}

export default function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // 等待动画结束
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: 'bg-success-500',
    error: 'bg-error-500',
    info: 'bg-primary-500',
    warning: 'bg-warning-500',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }

  return (
    <div
      className={`fixed top-20 right-4 ${typeStyles[type]} text-white px-6 py-3 rounded-lg shadow-lg 
                  flex items-center space-x-3 z-50
                  transition-all duration-300 transform
                  ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
    >
      <span className="text-xl">{icons[type]}</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 hover:opacity-80"
      >
        ✕
      </button>
    </div>
  )
}
