'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { itemVariants } from './motion';

/**
 * Cabeçalho padrão das seções da home (eyebrow + título + subtítulo + link
 * "ver todos"). Compartilhado entre Benefícios e Núcleos de Lazer para que os
 * dois mantenham exatamente o mesmo estilo visual.
 */
export default function CabecalhoColuna({
  eyebrow,
  titulo,
  subtitulo,
  verHref,
  verLabel,
}: {
  eyebrow: string;
  titulo: ReactNode;
  subtitulo?: string;
  verHref: string;
  verLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        <motion.span
          variants={itemVariants}
          className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-dark)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] dark:text-[var(--color-primary-light)]"
        >
          <Sparkles size={13} aria-hidden="true" />
          {eyebrow}
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white"
        >
          {titulo}
        </motion.h2>
        {subtitulo && (
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-gray-600 sm:text-lg dark:text-gray-300"
          >
            {subtitulo}
          </motion.p>
        )}
      </div>
      <motion.div variants={itemVariants}>
        <Link
          href={verHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900"
        >
          {verLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}
