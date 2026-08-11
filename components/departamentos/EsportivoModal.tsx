'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, ArrowRight, Trophy } from 'lucide-react';

export interface OpcaoEsportivo {
  rotulo: string;
  href: string;
  /** Nome do diretor da regional, vindo do banco. Pode não estar cadastrado. */
  diretor?: string;
}

/**
 * Escolha entre as regionais do Departamento Esportivo.
 *
 * O departamento é um só no card, mas tem duas telas de detalhe — Capital e
 * Interior. Em vez de mandar o visitante para uma delas por padrão, o clique
 * pergunta.
 *
 * Fecha desmontando, sem AnimatePresence: com ele (framer-motion 12.38 +
 * Next 16.3) a animação de saída não completa e o nó fica no DOM, deixando um
 * overlay invisível que engole os cliques da página. Mesmo motivo do
 * NucleosModal — se aparecer um terceiro caso, vale extrair um componente comum.
 */
export default function EsportivoModal({
  open,
  onClose,
  opcoes,
}: {
  open: boolean;
  onClose: () => void;
  opcoes: OpcaoEsportivo[];
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflowAnterior;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="esportivo-modal-titulo"
        tabIndex={-1}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl outline-none sm:p-8 dark:bg-gray-900"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30">
            <Trophy className="text-sky-600 dark:text-sky-400" size={22} />
          </div>
          <h2
            id="esportivo-modal-titulo"
            className="pr-10 text-2xl font-bold text-gray-900 dark:text-white"
          >
            Departamento Esportivo
          </h2>
        </div>
        <p className="mt-3 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Escolha a regional que você quer conhecer.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {opcoes.map((opcao) => (
            <Link
              key={opcao.href}
              href={opcao.href}
              onClick={onClose}
              className="group flex flex-col rounded-xl border border-gray-200/80 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {opcao.rotulo}
              </h3>
              {opcao.diretor && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Diretor:{' '}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {opcao.diretor}
                  </span>
                </p>
              )}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                Acessar
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
