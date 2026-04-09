'use client';

import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <AlertTriangle className="text-red-500" size={28} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {message || 'Erro ao carregar os dados. Tente novamente.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <RefreshCw size={16} />
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message, icon: Icon }: { message?: string; icon?: React.ElementType }) {
  const IconComp = Icon || Inbox;
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <IconComp className="text-gray-400" size={28} />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        {message || 'Nenhum item encontrado.'}
      </p>
    </div>
  );
}
