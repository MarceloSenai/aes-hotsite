'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Nucleo } from './data';
import { itemVariants } from './motion';

export default function NucleoCard({ item }: { item: Nucleo }) {
  return (
    <motion.div variants={itemVariants} className="flex">
      <Link
        href={item.href}
        className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800 dark:focus-visible:ring-offset-gray-800 xl:flex-row"
      >
        {/* Foto no topo (vertical): cheia na largura com altura 40; horizontal no xl: altura auto e largura 40. */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden xl:h-auto xl:w-40">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>

          <span className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={12} />
            {item.location}
          </span>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {item.description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.chips.slice(0, 2).map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
              >
                {chip}
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            Conhecer
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
