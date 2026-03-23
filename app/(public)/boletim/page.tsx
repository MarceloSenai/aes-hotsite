'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Newspaper, Calendar, Download, ExternalLink } from 'lucide-react';

interface Edicao {
  numero: number;
  titulo: string;
  data: string;
  resumo: string;
}

const edições: Edicao[] = [
  { numero: 48, titulo: 'Boletim AES - Marco 2026', data: 'Marco 2026', resumo: 'Novas parcerias, calendario de eventos atualizado e informações sobre reservas nos nucleos de lazer.' },
  { numero: 47, titulo: 'Boletim AES - Fevereiro 2026', data: 'Fevereiro 2026', resumo: 'Carnaval nos nucleos, torneio de verao e novidades sobre o plano de saude.' },
  { numero: 46, titulo: 'Boletim AES - Janeiro 2026', data: 'Janeiro 2026', resumo: 'Posse da nova gestao 2026-2030, confraternização de inicio de ano e balanco 2025.' },
  { numero: 45, titulo: 'Boletim AES - Dezembro 2025', data: 'Dezembro 2025', resumo: 'Encerramento do ano, festa de confraternização e prestacao de contas anual.' },
  { numero: 44, titulo: 'Boletim AES - Novembro 2025', data: 'Novembro 2025', resumo: 'Eleicoes AES, Black Friday nas parcerias e resultados do campeonato esportivo.' },
  { numero: 43, titulo: 'Boletim AES - Outubro 2025', data: 'Outubro 2025', resumo: 'Dia das Criancas nos nucleos, campeonato de pesca e novidades Totalpass.' },
];

export default function BoletimPage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} />
            Voltar para Home
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

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 sm:p-8 mb-10 text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Receba o Boletim por E-mail</h3>
              <p className="text-white/80 text-sm">Cadastre-se para receber as proximas edições diretamente no seu e-mail.</p>
            </div>
            <a
              href="mailto:boletim.aes@aessenai.org.br?subject=Cadastro%20Boletim%20AES"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-sm transition-colors hover:bg-gray-100"
              style={{ color: 'var(--color-primary-dark)' }}
            >
              <ExternalLink size={16} />
              Solicitar Cadastro
            </a>
          </div>
        </motion.div>

        {/* Editions list */}
        <div className="space-y-4">
          {edições.map((ed, idx) => (
            <motion.div
              key={ed.numero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 font-bold text-xl text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
                {ed.numero}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{ed.titulo}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={12} />
                  {ed.data}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{ed.resumo}</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0">
                <Download size={14} />
                PDF
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
