/**
 * 加载骨架屏组件
 * 用于页面加载时的占位显示
 */

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* 标题骨架 */}
      <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
      
      {/* 内容骨架 */}
      <div className="space-y-3">
        <div className="h-4 bg-neutral-200 rounded"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
      </div>
      
      {/* 卡片骨架 */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card overflow-hidden">
            <div className="h-48 bg-neutral-200"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              <div className="h-10 bg-neutral-200 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
