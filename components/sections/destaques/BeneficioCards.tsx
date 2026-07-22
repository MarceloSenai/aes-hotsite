'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import type { Beneficio } from './data';
import { itemVariants } from './motion';

/** Card escuro que ancora o bento. Ocupa metade da largura e as duas linhas. */
export function BeneficioDestaque({ item, total }: { item: Beneficio; total: number }) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} className="flex sm:col-span-2 md:row-span-2">
      <Link
        href={item.href}
        className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-gray-950 p-6 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 focus-visible:outline-none sm:p-8 dark:bg-black dark:focus-visible:ring-offset-black"
      >
        {/* Brilho de marca saindo do canto inferior esquerdo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 0% 100%, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent 70%)',
          }}
        />

        <div className="relative flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            <Star size={11} className="fill-current" />
            MAIS PROCURADO
          </span>
        </div>

        <div className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]">
          <Icon size={26} className="text-white" />
        </div>

        <h3 className="relative mt-5 text-2xl font-bold text-white sm:text-3xl">{item.title}</h3>

        <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          {item.description}
        </p>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90"
            >
              <Check size={13} className="text-[var(--color-primary)]" />
              {chip}
            </li>
          ))}
        </ul>

        <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white">
          Quero este benefício
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}

/** Cards claros numerados que preenchem as colunas 3 e 4 do bento. */
export function BeneficioCard({ item, index }: { item: Beneficio; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} className="flex">
      <Link
        href={item.href}
        className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800 dark:focus-visible:ring-offset-gray-800"
      >
        {/* Fita de marca que se abre no hover. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 bg-[var(--color-primary)] transition-transform duration-200 group-hover:scale-x-100"
        />

        <div className="flex items-start justify-between gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-light)] transition-colors duration-200 group-hover:bg-[var(--color-primary)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]">
            <Icon
              size={20}
              className="text-[var(--color-primary)] transition-colors duration-200 group-hover:text-white"
            />
          </div>
        </div>

        <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {item.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
            >
              {chip}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
          Saiba mais
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
