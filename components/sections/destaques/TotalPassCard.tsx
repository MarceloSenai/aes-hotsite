'use client';

import { ArrowRight, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { totalpass } from './data';
import { itemVariants } from './motion';

/**
 * Card da parceria TotalPass, esticado na largura toda da terceira linha do bento.
 *
 * Segue a MESMA identidade visual dos cards de benefício (BeneficioCard): fundo
 * claro, borda cinza, fita vermelha de `--color-primary` no topo, ícone vermelho em
 * círculo `primary-light`, chips cinza e CTA vermelho — sem verde, sem degradê. A
 * única marca de parceria é o selo "PARCERIA" (também no vermelho do tema), para
 * sinalizar que é parceria de terceiro sem quebrar a identidade da AES.
 *
 * É `md:col-span-4` (largura total) com layout horizontal em `lg` para preencher a
 * linha sem sobrar vazio ao lado. Link externo para o site do parceiro (nova aba).
 */
export default function TotalPassCard() {
  return (
    <motion.div variants={itemVariants} className="flex sm:col-span-2 md:col-span-4">
      <a
        href={totalpass.siteHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${totalpass.siteLabel} da ${totalpass.nome} (abre em nova aba)`}
        className="group relative flex flex-1 flex-col gap-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none sm:p-7 lg:flex-row lg:items-center lg:justify-between dark:border-gray-700/60 dark:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
      >
        {/* Fita de marca no topo, igual aos cards de benefício (BeneficioCards.tsx). */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 bg-[var(--color-primary)] transition-transform duration-200 group-hover:scale-x-100"
        />

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)] transition-colors duration-200 group-hover:bg-[var(--color-primary)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]">
            <Dumbbell
              size={24}
              className="text-[var(--color-primary)] transition-colors duration-200 group-hover:text-white"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{totalpass.nome}</h3>
              <span className="rounded-full bg-[var(--color-primary-light)] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--color-primary-dark)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] dark:text-[var(--color-primary-light)]">
                PARCERIA
              </span>
            </div>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {totalpass.resumo}
            </p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {totalpass.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-[var(--color-primary)] lg:self-auto dark:text-[var(--color-primary-light)]">
          {totalpass.siteLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </a>
    </motion.div>
  );
}
