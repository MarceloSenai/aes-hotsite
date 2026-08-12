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

/**
 * Estado de carregamento para listas longas.
 *
 * Um bloco de caixas cinza sozinho não diz ao visitante o que está acontecendo —
 * ele lê a tela como vazia ou quebrada. O texto nomeia o que está sendo buscado,
 * e o esqueleto tem a forma de uma tabela, não de cards genéricos.
 */
export function ListaCarregando({ titulo, linhas = 6 }: { titulo: string; linhas?: number }) {
  return (
    <div role="status" aria-live="polite">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden
          className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-gray-200 border-t-[var(--color-primary)] dark:border-gray-700 dark:border-t-[var(--color-primary)]"
        />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{titulo}</span>
      </div>

      <div aria-hidden className="animate-pulse overflow-hidden rounded-xl border border-gray-200/70 dark:border-gray-700/50">
        <div className="h-11 bg-gray-100 dark:bg-gray-800" />
        {Array.from({ length: linhas }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-t border-gray-100 px-5 py-3.5 dark:border-gray-800/70">
            <div className="h-3.5 w-28 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3.5 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
