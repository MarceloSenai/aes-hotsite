'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 ArrowLeft,
 HeartPulse,
 Phone,
 Clock,
 MapPin,
 Building2,
 Stethoscope,
 Baby,
 FlaskConical,
 Siren,
 ShieldCheck,
 CheckCircle2,
 XCircle,
 DollarSign,
 Search,
 FileText,
 TrendingUp,
} from 'lucide-react';
import { planosSaudeService } from '@/lib/services/data-service';
import { ErrorState, EmptyState } from '@/components/ui/DataState';

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

const coverageItems = [
 {
 icon: FlaskConical,
 title: 'Laboratórios Credenciados FESP',
 description: 'Rede completa de laboratórios credenciados para exames e diagnósticos.',
 },
 {
 icon: Stethoscope,
 title: 'Atendimento Eletivo',
 description: 'Consultas e procedimentos agendados com especialistas da rede.',
 },
 {
 icon: Siren,
 title: 'Urgências e Emergências',
 description: 'Atendimento 24h em pronto-socorro para situações de urgência e emergência.',
 },
 {
 icon: Baby,
 title: 'Maternidade',
 description: 'Cobertura completa para gestação, parto e pós-parto.',
 },
];

const contacts = [
 {
 icon: Phone,
 label: 'Autorizações (24h)',
 value: '(11) 3385-6074',
 href: 'tel:+551133856074',
 },
 {
 icon: Phone,
 label: 'Fax',
 value: '(11) 2146-2624',
 href: null,
 },
 {
 icon: Phone,
 label: 'SAC UNIMED',
 value: '0800 772 3030',
 href: 'tel:08007723030',
 },
];

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
 },
};

export default function AssistenciaMedicaPage() {
 const [planos, setPlanos] = useState<PlanoSaude[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 const load = async () => {
  setError(false);
  setLoading(true);
  try {
   const data = await planosSaudeService.getAll('medico');
   setPlanos((data as Record<string, unknown>[]).map((row) => mapPlanoSaude(row)));
  } catch (err) {
   console.error('Failed to load planos medicos:', err);
   setError(true);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
 <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center">
 <HeartPulse className="text-rose-600 dark:text-rose-400" size={32} />
 </div>
 <div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Assistência{' '}
 <span className="text-theme-gradient">
 Médica
 </span>
 </h1>
 </div>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES oferece aos seus associados e dependentes o plano de saúde UNIMED FESP
 (Carteira 970 - UNIMED Paulistana), com acesso a uma ampla rede nacional de
 hospitais e clínicas credenciados.
 </p>
 </motion.div>

 {/* Partner Badge */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 mb-10"
 >
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center">
 <ShieldCheck className="text-theme-primary dark:text-theme-primary" size={24} />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
 UNIMED FESP
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm">
 Carteira 970 &mdash; UNIMED Paulistana | Rede nacional de hospitais e clínicas credenciados
 </p>
 </div>
 </div>
 </motion.div>

 {/* Coverage Grid */}
 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
 >
 {coverageItems.map((item) => {
 const Icon = item.icon;
 return (
 <motion.div
 key={item.title}
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-theme-glow hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mb-4">
 <Icon className="text-theme-primary dark:text-theme-primary" size={24} />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 {item.title}
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
 {item.description}
 </p>
 </motion.div>
 );
 })}
 </motion.div>

 {/* Plans from config */}
 {loading ? null : error ? <ErrorState onRetry={load} /> : planos.length === 0 ? <EmptyState message="Nenhum plano disponível." /> : null}
 {!loading && !error && planos.length > 0 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 }}
 className="mb-12"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
  Planos Disponíveis
 </h2>
 <div className="space-y-6">
  {planos.map((plano, index) => (
  <motion.div
   key={plano.id}
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
   className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden"
  >
   {/* Plan header */}
   <div className="p-6 border-b border-gray-100 dark:border-gray-700/60">
   <div className="flex items-center justify-between flex-wrap gap-4">
    <div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
     {plano.tipo}
    </h3>
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
    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
    Tabela de Valores por Faixa Etária
    </h4>
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
 </motion.div>
 )}

 {/* Quick Links */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.35 }}
 className="mb-12"
 >
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <a href="https://portalclientes.unimedfesp.coop.br/guia-medico" target="_blank" rel="noopener noreferrer"
   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg transition-all text-center group">
   <Search size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Guia Medico</h3>
   <p className="text-xs text-gray-500 mt-1">Consultar rede credenciada UNIMED</p>
  </a>
  <a href="mailto:rh@aessenai.org.br?subject=Ficha de Adesão - Plano Médico"
   className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg transition-all text-center group">
   <FileText size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Ficha de Adesão</h3>
   <p className="text-xs text-gray-500 mt-1">Solicitar ficha por e-mail</p>
  </a>
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 text-center">
   <TrendingUp size={24} className="mx-auto mb-2 text-theme-primary" />
   <h3 className="font-bold text-gray-900 dark:text-white">Política de Reajuste</h3>
   <p className="text-xs text-gray-500 mt-1">Reajuste anual conforme ANS e negociação coletiva</p>
  </div>
 </div>
 </motion.div>

 {/* Central NAS */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.4 }}
 className="gradient-theme-cta rounded-2xl p-6 mb-12 text-white"
 >
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
 <Building2 className="text-white" size={24} />
 </div>
 <div>
 <h3 className="text-lg font-bold">Central NAS 24h</h3>
 <p className="text-white/80 text-sm">
 Serviços de gestão em saúde e suporte 24 horas para associados
 </p>
 </div>
 </div>
 </motion.div>

 {/* Contacts */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.5 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 mb-10"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Contatos
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {contacts.map((contact) => {
 const Icon = contact.icon;
 return (
 <div key={contact.label} className="flex items-start gap-3">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center flex-shrink-0">
 <Icon className="text-theme-primary dark:text-theme-primary" size={20} />
 </div>
 <div>
 <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
 {contact.href ? (
 <a
 href={contact.href}
 className="text-gray-900 dark:text-white font-semibold hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
 >
 {contact.value}
 </a>
 ) : (
 <p className="text-gray-900 dark:text-white font-semibold">
 {contact.value}
 </p>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </motion.div>

 {/* Office */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Escritório de Atendimento
 </h2>
 <div className="flex flex-col sm:flex-row gap-6">
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center flex-shrink-0">
 <MapPin className="text-theme-primary dark:text-theme-primary" size={20} />
 </div>
 <div>
 <p className="text-sm text-gray-500 dark:text-gray-400">Endereço</p>
 <p className="text-gray-900 dark:text-white font-semibold">
 Rua José Getúlio, 78/90 - Aclimação, São Paulo - SP
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center flex-shrink-0">
 <Clock className="text-theme-primary dark:text-theme-primary" size={20} />
 </div>
 <div>
 <p className="text-sm text-gray-500 dark:text-gray-400">Horário</p>
 <p className="text-gray-900 dark:text-white font-semibold">
 Segunda a Sexta, 8h às 17h
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>
 );
}
