'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Newspaper, Calendar, Download, ExternalLink } from 'lucide-react';
import { boletinsService, getPublicUrl } from '@/lib/services/data-service';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { ErrorState, EmptyState } from '@/components/ui/DataState';

interface BoletimEdicao {
  id: string;
  numero: number;
  titulo: string;
  data: string;
  resumo: string;
  pdf_path?: string;
}

export default function BoletimPage() {
  const [boletins, setBoletins] = useState<BoletimEdicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await boletinsService.getAll();
      setBoletins(data as unknown as BoletimEdicao[]);
    } catch (err) {
      console.error('Failed to load boletins:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownload = (bol: BoletimEdicao) => {
    if (bol.pdf_path) {
      const url = getPublicUrl('aes-boletins', bol.pdf_path);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${bol.titulo}.pdf`;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} /> Voltar para Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center">
              <Newspaper size={32} className="text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Boletim <span className="text-theme-gradient">Informativo</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Acompanhe as edições do Boletim Informativo da AES com notícias, comunicados e informações relevantes para os associados.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 sm:p-8 mb-10 text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Receba o Boletim por E-mail</h3>
              <p className="text-white/80 text-sm">Cadastre-se para receber as próximas edições diretamente no seu e-mail.</p>
            </div>
            <a href="mailto:boletim.aes@aessenai.org.br?subject=Cadastro%20Boletim%20AES"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-sm transition-colors hover:bg-gray-100"
              style={{ color: 'var(--color-primary-dark)' }}>
              <ExternalLink size={16} /> Solicitar Cadastro
            </a>
          </div>
        </motion.div>

        {loading ? <SkeletonGrid count={6} /> : error ? <ErrorState onRetry={load} /> : boletins.length === 0 ? <EmptyState message="Nenhum boletim disponível no momento." /> : (<div className="space-y-4">
          {boletins.map((bol, idx) => (
            <motion.div key={bol.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start gap-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 font-bold text-xl text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
                {bol.numero}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{bol.titulo}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={12} /> {bol.data}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{bol.resumo}</p>
              </div>
              {bol.pdf_path ? (
                <button onClick={() => handleDownload(bol)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Download size={14} /> PDF
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-400 shrink-0">
                  <Download size={14} /> Em breve
                </span>
              )}
            </motion.div>
          ))}
        </div>)}
      </div>
    </section>
  );
}
