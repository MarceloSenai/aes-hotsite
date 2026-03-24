/**
 * Reusable skeleton loading components for async content
 */

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 ${className}`}>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3, cardHeight = 'h-48' }: { count?: number; cardHeight?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} className={cardHeight} />
      ))}
    </div>
  );
}

export function SkeletonLine({ width = 'w-full' }: { width?: string }) {
  return <div className={`animate-pulse h-4 bg-gray-200 dark:bg-gray-800 rounded ${width}`} />;
}

export function SkeletonCarousel() {
  return (
    <div className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 min-h-[280px] sm:min-h-[260px] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto" />
      </div>
    </div>
  );
}
