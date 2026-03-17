'use client';

import { motion } from 'framer-motion';
import {
  Megaphone,
  BookOpen,
  BarChart3,
  FileText,
  Download,
  ArrowRight,
  Calendar,
  ExternalLink,
} from 'lucide-react';

const documentSections = [
  {
    icon: Megaphone,
    title: 'Comunicados',
    description:
      'Últimos comunicados, avisos e boletins informativos da AES SENAI para os associados.',
    gradient: 'from-sky-500 to-blue-500',
    bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
    textIcon: 'text-sky-600 dark:text-sky-400',
    items: [
      { name: 'Comunicado Geral - Março 2026', date: 'Mar 2026', type: 'PDF' },
      { name: 'Informativo Mensal - Fevereiro 2026', date: 'Fev 2026', type: 'PDF' },
      { name: 'Aviso - Calendário de Eventos 2026', date: 'Jan 2026', type: 'PDF' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Estatuto e Regulamentos',
    description:
      'Documentos oficiais que regem o funcionamento da associação, incluindo estatuto social e regulamentos internos.',
    gradient: 'from-emerald-500 to-green-500',
    bgIcon: 'bg-emerald-100 dark:bg-emerald-900/30',
    textIcon: 'text-emerald-600 dark:text-emerald-400',
    items: [
      { name: 'Estatuto Social da AES SENAI', date: 'Vigente', type: 'PDF' },
      { name: 'Regulamento do Núcleo de Lazer', date: 'Vigente', type: 'PDF' },
      { name: 'Regulamento do FUMUS', date: 'Vigente', type: 'PDF' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Relatório Anual',
    description:
      'Relatórios anuais de atividades e prestação de contas da diretoria aos associados.',
    gradient: 'from-violet-500 to-purple-500',
    bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
    textIcon: 'text-violet-600 dark:text-violet-400',
    items: [
      { name: 'Relatório Anual 2025', date: '2025', type: 'PDF' },
      { name: 'Relatório Anual 2024', date: '2024', type: 'PDF' },
      { name: 'Relatório Anual 2023', date: '2023', type: 'PDF' },
    ],
  },
  {
    icon: FileText,
    title: 'Formulários de Reembolso',
    description:
      'Formulários para solicitação de reembolso de despesas médicas, odontológicas e demais benefícios.',
    gradient: 'from-amber-500 to-orange-500',
    bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
    textIcon: 'text-amber-600 dark:text-amber-400',
    items: [
      { name: 'Formulário de Reembolso Médico', date: 'Atualizado', type: 'PDF' },
      { name: 'Formulário de Reembolso Odontológico', date: 'Atualizado', type: 'PDF' },
      { name: 'Instruções para Envio de Reembolso', date: 'Atualizado', type: 'PDF' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function DocumentosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Central de Documentos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Documentos
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Acesse comunicados, estatutos, relatórios e formulários da AES SENAI.
              Todos os documentos importantes em um só lugar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Sections */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-12"
          >
            {documentSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
                    {/* Section Header */}
                    <div className={`relative bg-gradient-to-r ${section.gradient} p-6 sm:p-8`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="text-white" size={28} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            {section.title}
                          </h2>
                          <p className="text-white/80 text-sm mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="p-6 sm:p-8">
                      <div className="space-y-3">
                        {section.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer group/item"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 ${section.bgIcon} rounded-lg flex items-center justify-center`}>
                                <FileText className={section.textIcon} size={20} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                  {item.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <Calendar size={12} className="text-gray-400" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.date}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                                    {item.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                              <Download size={18} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View all link */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm hover:gap-3 transition-all duration-300">
                          Ver todos os documentos
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200/80 dark:border-gray-700/60 shadow-lg"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Precisa de outro documento?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
              Acesse a área do associado para consultar documentos adicionais ou entre em contato com a secretaria.
            </p>
            <a
              href="https://associado.aessenai.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
            >
              Área do Associado
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
