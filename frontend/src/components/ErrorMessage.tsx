interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({
  title = '出错了',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          重试
        </button>
      )}
    </div>
  )
}
