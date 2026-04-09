'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  FolderOpen,
  Calendar,
} from 'lucide-react';
import { documentosService, getPublicUrl } from '@/lib/services/data-service';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/DataState';

interface DocumentoArquivo {
  id: string;
  titulo: string;
  descricao?: string;
  categoria: string;
  file_path?: string;
  file_name?: string;
  fileUrl?: string;
  created_at?: string;
}

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

// Consistent gradient mapping for categories
const categoryGradients: Record<string, string> = {
  'Comunicados': 'linear-gradient(to right, #0ea5e9, #3b82f6)',
  'Estatuto e Regulamentos': 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
  'Relatório Anual': 'linear-gradient(to right, #8b5cf6, #a855f7)',
  'Formulários de Reembolso': 'linear-gradient(to right, #f59e0b, #f97316)',
};

const categoryIconColors: Record<string, { bg: string; text: string }> = {
  'Comunicados': { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400' },
  'Estatuto e Regulamentos': { bg: 'bg-theme-primary-light dark:bg-theme-primary-20', text: 'text-theme-primary dark:text-theme-primary' },
  'Relatório Anual': { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600 dark:text-violet-400' },
  'Formulários de Reembolso': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
};

const defaultGradient = 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))';
const defaultIconColor = { bg: 'bg-theme-primary-light dark:bg-theme-primary-20', text: 'text-theme-primary dark:text-theme-primary' };

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<DocumentoArquivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await documentosService.getAll();
      const mapped = (data as DocumentoArquivo[]).map((row) => ({
        ...row,
        fileUrl: row.file_path ? getPublicUrl('aes-documentos', row.file_path as string) : undefined,
      }));
      setDocumentos(mapped);
    } catch (err) {
      console.error('Failed to load documentos:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Group documents by categoria
  const grouped = documentos.reduce<Record<string, DocumentoArquivo[]>>((acc, doc) => {
    if (!acc[doc.categoria]) acc[doc.categoria] = [];
    acc[doc.categoria].push(doc);
    return acc;
  }, {});
  const categoryNames = Object.keys(grouped);

  const handleDownload = (doc: DocumentoArquivo) => {
    if (doc.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.file_name || `${doc.titulo}.pdf`;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark), var(--color-primary-dark))" }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-primary-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-theme-primary-20 rounded-full blur-3xl" />

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
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Acesse comunicados, estatutos, relatórios e formulários da AES SENAI.
              Todos os documentos importantes em um so lugar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Sections */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <SkeletonGrid count={6} /> : error ? <ErrorState onRetry={load} /> : categoryNames.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-12"
            >
              {categoryNames.map((catName) => {
                const docs = grouped[catName];
                const gradient = categoryGradients[catName] || defaultGradient;
                const iconColor = categoryIconColors[catName] || defaultIconColor;

                return (
                  <motion.div
                    key={catName}
                    variants={cardVariants}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-theme-glow">
                      {/* Section Header */}
                      <div className="relative p-6 sm:p-8" style={{ background: gradient }}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <FolderOpen className="text-white" size={28} />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">
                              {catName}
                            </h2>
                            <p className="text-white/80 text-sm mt-1">
                              {docs.length} {docs.length === 1 ? 'documento' : 'documentos'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Document List */}
                      <div className="p-6 sm:p-8">
                        <div className="space-y-3">
                          {docs.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group/item"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 ${iconColor.bg} rounded-lg flex items-center justify-center`}>
                                  <FileText className={iconColor.text} size={20} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                    {doc.titulo}
                                  </h4>
                                  {doc.descricao && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {doc.descricao}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <Calendar size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {doc.created_at}
                                    </span>
                                    {doc.file_name && (
                                      <span className="text-xs px-2 py-0.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light rounded-full font-medium">
                                        {doc.file_name.split('.').pop()?.toUpperCase() || 'PDF'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {doc.fileUrl ? (
                                <button
                                  onClick={() => handleDownload(doc)}
                                  className="flex items-center gap-2 text-theme-primary dark:text-theme-primary opacity-60 hover:opacity-100 group-hover/item:opacity-100 transition-opacity duration-200 cursor-pointer"
                                  title="Baixar documento"
                                >
                                  <Download size={18} />
                                </button>
                              ) : (
                                <div className="text-gray-300 dark:text-gray-600">
                                  <FileText size={18} />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
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
              <FolderOpen className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                Nenhum documento cadastrado
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Documentos podem ser adicionados pelo painel administrativo.
              </p>
            </motion.div>
          )}
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
            <div className="w-16 h-16 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="text-theme-primary dark:text-theme-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Precisa de outro documento?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
              Acesse a area do associado para consultar documentos adicionais ou entre em contato com a secretaria.
            </p>
            <a
              href="https://associado.aessenai.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-theme-cta text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-theme-glow"
            >
              Area do Associado
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
