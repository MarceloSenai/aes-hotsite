'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import type { Nucleo } from './data';
import { itemVariants } from './motion';

export default function NucleoCard({ item }: { item: Nucleo }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-card-soft transition-[transform,box-shadow] duration-[350ms] hover:-translate-y-1.5 hover:shadow-card-elegant dark:border-gray-700/60 dark:bg-gray-800"
    >
      <Link
        href={item.href}
        className="flex flex-1 flex-col rounded-3xl focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-800"
      >
        {/* A foto já vem recortada em 4:5, então `sizes` corresponde à caixa
            renderizada. Se fosse o 16:9 recortado por object-cover, o browser
            baixaria uma versão estreita demais e a foto subiria ~1,5x. */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1400px) 429px, (min-width: 768px) 31vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-widest text-gray-900 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-theme-primary" />
            {item.location}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <h3 className="text-2xl leading-tight font-semibold text-white md:text-[1.7rem]">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {item.description}
          </p>

          <ul className="mt-4 grid grid-cols-1 gap-1.5">
            {item.chips.map((chip) => (
              <li
                key={chip}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className="mt-0.5 shrink-0 text-theme-primary"
                  aria-hidden="true"
                />
                <span>{chip}</span>
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            Conhecer
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
