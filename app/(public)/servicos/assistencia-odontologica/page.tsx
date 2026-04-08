'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Smile, CheckCircle2, XCircle, DollarSign, Search, FileText, List } from 'lucide-react';
import { planosSaudeService } from '@/lib/supabase/data-service';

interface PlanoFaixa {
  id: string;
  faixa: string;
  valor: string;
}

interface PlanoSaude {
  id: string;
  tipo: string;
  operadora: string;
  cobertura: string;
  aberto: boolean;
  faixas: PlanoFaixa[];
}

function mapPlanoSaude(row: Record<string, unknown>): PlanoSaude {
  const faixasRaw = (row.plano_faixas as Record<string, unknown>[]) ?? [];
  return {
    id: row.id as string,
    tipo: row.tipo as string,
    operadora: row.operadora as string,
    cobertura: row.cobertura as string,
    aberto: row.aberto as boolean,
    faixas: faixasRaw.map((f) => ({
      id: f.id as string,
      faixa: f.faixa as string,
      valor: f.valor as string,
    })),
  };
}

export default function AssistenciaOdontologicaPage() {
 const [planos, setPlanos] = useState<PlanoSaude[]>([]);

 useEffect(() => {
  const load = async () => {
   const data = await planosSaudeService.getAll('odontologico');
   setPlanos((data as any[]).map((row: any) => mapPlanoSaude(row as Record<string, unknown>)));
  };
  load();
 }, []);

 return (
 <section className="py-24 gradient-theme-page-light min-h-screen">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Back */}
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4 }}
 >
 <Link
 href="/servicos"
 className="inline-flex items-center gap-2 text-theme-primary dark:text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8"
 >
 <ArrowLeft size={18} />
 Voltar para Serviços
 </Link>
 </motion.div>

 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="mb-12"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center">
 <Smile className="text-sky-600 dark:text-sky-400" size={32} />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Assistência{' '}
 <span className="text-theme-gradient">
 Odontológica
 </span>
 </h1>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES oferece assistência odontológica completa para seus associados e
 dependentes, com acesso a uma rede credenciada de profissionais qualificados
 em diversas especialidades.
 </p>
 </motion.div>

 {/* Plans */}
 <div className="space-y-8">
 {planos.map((plano, index) => (
 <motion.div
 key={plano.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden"
 >
 {/* Plan header */}
 <div className="p-6 border-b border-gray-100 dark:border-gray-700/60">
 <div className="flex items-center justify-between flex-wrap gap-4">
 <div>
 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
 {plano.tipo}
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
 Operadora: {plano.operadora}
 </p>
 </div>
 <span
 className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
  plano.aberto
   ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
   : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
 }`}
 >
 {plano.aberto ? (
  <><CheckCircle2 size={14} /> Aberto para novas adesões</>
 ) : (
  <><XCircle size={14} /> Fechado para novas adesões</>
 )}
 </span>
 </div>
 </div>

 {/* Coverage */}
 <div className="px-6 py-4 bg-theme-primary-5 dark:bg-theme-primary-10">
 <div className="flex items-start gap-3">
 <CheckCircle2 className="text-theme-primary dark:text-theme-primary flex-shrink-0 mt-0.5" size={18} />
 <div>
 <p className="text-sm font-medium text-gray-900 dark:text-white">Cobertura</p>
 <p className="text-sm text-gray-600 dark:text-gray-400">{plano.cobertura}</p>
 </div>
 </div>
 </div>

 {/* Faixas table */}
 <div className="p-6">
 <div className="flex items-center gap-2 mb-4">
 <DollarSign size={18} className="text-theme-primary dark:text-theme-primary" />
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
 Tabela de Valores
 </h3>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
  <tr className="border-b border-gray-100 dark:border-gray-700/60">
   <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400">Faixa</th>
   <th className="text-right py-2 font-semibold text-gray-500 dark:text-gray-400">Valor</th>
  </tr>
 </thead>
 <tbody>
  {plano.faixas.map((f) => (
   <tr key={f.faixa} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0">
    <td className="py-2.5 pr-4 text-gray-700 dark:text-gray-300">{f.faixa}</td>
    <td className="py-2.5 text-right font-semibold text-gray-900 dark:text-white">{f.valor}</td>
   </tr>
  ))}
 </tbody>
 </table>
 </div>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Quick Links */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.4 }}
 className="mt-10"
 >
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <a href="https://www.uniodonto.coop.br/encontre-um-dentista/" target="_blank" rel="noopener noreferrer"
   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg transition-all text-center group">
   <Search size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Rede Credenciada</h3>
   <p className="text-xs text-gray-500 mt-1">Encontrar dentistas credenciados</p>
  </a>
  <a href="mailto:boletim.aes@aessenai.org.br?subject=Ficha de Adesão - Plano Odontológico"
   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg transition-all text-center group">
   <FileText size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Ficha de Adesao</h3>
   <p className="text-xs text-gray-500 mt-1">Solicitar ficha por e-mail</p>
  </a>
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 text-center">
   <List size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Tabela de Coparticipacao</h3>
   <p className="text-xs text-gray-500 mt-1">Valores de coparticipacao conforme procedimento</p>
  </div>
 </div>
 </motion.div>

 {/* Empty state */}
 {planos.length === 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-center py-16"
 >
 <Smile className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
 <p className="text-gray-500 dark:text-gray-400">
 Nenhum plano odontológico cadastrado no momento.
 </p>
 </motion.div>
 )}
 </div>
 </section>
 );
}
