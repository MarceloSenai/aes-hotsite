'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, X, ArrowRight } from 'lucide-react';
import { nucleos } from './destaques/data';

/**
 * Escolha do núcleo de lazer.
 *
 * Substitui a antiga página índice `/nucleo-de-lazer`: o atalho da home abre
 * este modal e o visitante vai direto para o núcleo que quer, sem uma página
 * intermediária só para listar três links.
 */
export default function NucleosModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc fecha e o fundo não rola enquanto o modal está aberto.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move o foco para o diálogo — sem isso o teclado continuaria na página atrás.
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflowAnterior;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    /*
     * Fecha desmontando, sem AnimatePresence: com ele (framer-motion 12.38 +
     * Next 16.3), a animação de saída não completava e o nó ficava no DOM —
     * sobrava um overlay `fixed inset-0` invisível engolindo todos os cliques
     * da página. Verificado no Chrome com aba em foco. A entrada segue animada;
     * o que se perde é só o fade de saída.
     *
     * z-[9998]: mesma camada do PopupModal do site — acima de todo o conteúdo,
     * abaixo apenas dos FABs de tema/acessibilidade (z-[9999]).
     */
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
        aria-labelledby="nucleos-modal-titulo"
        tabIndex={-1}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl outline-none sm:p-8 dark:bg-gray-900"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2
          id="nucleos-modal-titulo"
          className="pr-10 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
        >
          Núcleos de Lazer
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Escolha o núcleo que você quer conhecer.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {nucleos.map((nucleo) => (
            <Link
              key={nucleo.href}
              href={nucleo.href}
              onClick={onClose}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={nucleo.image}
                  alt={nucleo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {nucleo.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <MapPin size={13} className="shrink-0" />
                  {nucleo.location}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  Acessar
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
