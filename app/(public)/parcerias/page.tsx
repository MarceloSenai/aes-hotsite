'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  ExternalLink,
  Phone,
  Instagram,
  Globe,
  Star,
} from 'lucide-react';
import { SiteConfigManager, type Parceria } from '@/lib/config/site-config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Consistent category color mapping
const categoryColors: Record<string, { bg: string; text: string }> = {
  'Idiomas': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  'Instituto': { bg: 'bg-theme-primary-light dark:bg-theme-primary-20', text: 'text-theme-primary dark:text-theme-primary' },
  'Fitness': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
  'Hospedagem': { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400' },
  'Eletrodomésticos': { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
  'Educação': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
  'Bem-estar': { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400' },
};

const defaultColor = { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400' };

function getCategoryColor(categoria: string) {
  return categoryColors[categoria] || defaultColor;
}

export default function ParceriasPage() {
  const [parcerias, setParcerias] = useState<Parceria[]>([]);

  useEffect(() => {
    const load = () => setParcerias(SiteConfigManager.getConfig().parcerias);
    load();
    const handler = () => load();
    window.addEventListener('aes-config-change', handler);
    return () => window.removeEventListener('aes-config-change', handler);
  }, []);

  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
            Convênios
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossas{' '}
            <span className="text-theme-gradient">
              Parcerias
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convênios e parcerias exclusivas para associados AES
          </p>
        </motion.div>

        {/* Partners Grid */}
        {parcerias.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {parcerias.map((partner) => {
              const color = getCategoryColor(partner.categoria);
              return (
                <motion.div
                  key={partner.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-theme-glow hover:border-theme-primary-light dark:hover:border-theme-primary-dark hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Handshake className={color.text} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {partner.nome}
                      </h3>
                      <span className="text-xs font-medium text-theme-primary dark:text-theme-primary bg-theme-primary-5 dark:bg-theme-primary-10 px-2 py-0.5 rounded-full">
                        {partner.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Destaque tag */}
                  {partner.destaque && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-700/40">
                        <Star size={12} className="fill-current" />
                        {partner.destaque}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {partner.descricao}
                  </p>

                  <div className="space-y-2">
                    {partner.contato && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="text-gray-400" size={14} />
                        <span className="text-gray-700 dark:text-gray-300">
                          {partner.contato}
                        </span>
                      </div>
                    )}
                    {partner.site && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="text-gray-400" size={14} />
                        <a
                          href={partner.site.startsWith('http') ? partner.site : `https://${partner.site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-theme-primary dark:text-theme-primary hover:underline inline-flex items-center gap-1"
                        >
                          {partner.site}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                    {partner.instagram && (
                      <div className="flex items-center gap-2 text-sm">
                        <Instagram className="text-gray-400" size={14} />
                        <a
                          href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
                        >
                          {partner.instagram}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Handshake className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Nenhuma parceria cadastrada
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Parcerias podem ser adicionadas pelo painel administrativo.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
