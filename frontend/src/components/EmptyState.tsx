import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionText?: string
  actionLink?: string
}

export default function EmptyState({
  icon = '🔍',
  title,
  description,
  actionText,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  )
}
