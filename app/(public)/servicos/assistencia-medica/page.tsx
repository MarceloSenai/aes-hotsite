'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import {
 Stethoscope,
 CheckCircle2,
 AlertTriangle,
 Smartphone,
 FileText,
 Download,
 Mail,
} from 'lucide-react';

const caracteristicasUnimed = [
 'Coparticipativo.',
 'Atendimento estadual e nacional, de acordo com o plano contratado.',
 'Destinado ao associado titular, cônjuge e filho até 24 anos incompletos.',
 'Possui carência.',
 'Sofre reajuste anual com aplicação dos indicadores financeiro (IPC-FIPE Saúde) e de reajuste técnico, decorrente da taxa de sinistralidade (índice de utilização) obtida no período de análise.',
];

const recursosApp = [
 {
 titulo: 'Carteirinha digital',
 descricao:
 'Acesso fácil aos dados do cartão do seu plano, além de QR Code e Token para atendimento em consultórios e clínicas.',
 },
 {
 titulo: 'Guia médico',
 descricao:
 'Busca rápida por médicos, hospitais, laboratórios e clínicas credenciadas, com opção de download para uso offline.',
 },
 {
 titulo: 'Autorizações',
 descricao: 'Acompanhamento do status de solicitações de guias e procedimentos.',
 },
 {
 titulo: 'Extrato e coparticipação',
 descricao: 'Consulta de extrato de utilização do plano e histórico de coparticipação.',
 },
 {
 titulo: 'Central de atendimento',
 descricao: 'Canais rápidos para suporte, telefones úteis e unidades de atendimento.',
 },
];

/**
 * Contratos dos três planos. Ana Costa e Unimed FESP ainda não têm o PDF —
 * `arquivo: null` marca isso, e o clique avisa em vez de levar a um link morto.
 */
const contratos: { nome: string; arquivo: string | null }[] = [
 { nome: 'ANA COSTA SAÚDE', arquivo: null },
 { nome: 'AMIL/AMESP', arquivo: '/documentos/saude/Amesp-contrato.PDF' },
 { nome: 'UNIMED FESP', arquivo: null },
];

export default function AssistenciaMedicaPage() {
 const [contratoIndisponivel, setContratoIndisponivel] = useState<string | null>(null);

 return (
 <>
 <PageHeader
 icone={Stethoscope}
 titulo="Assistência Médica"
 subtitulo="A AES oferece aos seus associados e dependentes planos de saúde com assistência completa, com acesso a uma ampla rede de hospitais e clínicas credenciados."
 />

 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-5xl mx-auto space-y-8">

 {/* Abertura */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 Os planos de saúde mantidos pela AES, <strong>Ana Costa Saúde</strong>,{' '}
 <strong>Amil/Amesp</strong> e <strong>Unimed Fesp</strong>, oferecem cobertura completa,
 incluindo serviços como consultas médicas, exames, internações hospitalares, cirurgias,
 atendimento de urgência e emergência, além de diversos procedimentos especializados.
 </p>

 <div className="mt-6 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40">
 <AlertTriangle
 size={20}
 className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
 />
 <p className="text-sm text-amber-800 dark:text-amber-300">
 <strong>Indisponíveis para novas adesões:</strong> Ana Costa Saúde e Amil/Amesp.
 </p>
 </div>
 </motion.div>

 {/* Características do contrato com a Unimed Fesp */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
 Características do contrato com a Unimed Fesp
 </h2>
 <ul className="space-y-3">
 {caracteristicasUnimed.map((item) => (
 <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </motion.div>

 {/* Aplicativo */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <div className="flex items-center gap-3 mb-2">
 <Smartphone size={22} className="text-theme-primary" />
 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
 Aplicativo Unimed SP – Clientes
 </h2>
 </div>
 <p className="text-gray-600 dark:text-gray-300 mb-6">
 No aplicativo Unimed SP – Clientes (da Unimed Fesp), você encontra serviços essenciais
 para gerenciar seu plano de saúde diretamente pelo celular. Ele concentra os seguintes
 recursos:
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {recursosApp.map((r) => (
 <div
 key={r.titulo}
 className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-5 border border-gray-200/80 dark:border-gray-700/60"
 >
 <p className="font-semibold text-gray-900 dark:text-white mb-1">{r.titulo}</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">{r.descricao}</p>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Contratos */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
 Contratos dos planos
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {contratos.map((contrato) => {
 const conteudo = (
 <>
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center shrink-0">
 <FileText size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div className="min-w-0 text-left">
 <p className="font-medium text-gray-900 dark:text-white text-sm">
 {contrato.nome}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400">
 {contrato.arquivo ? 'PDF' : 'Documento pendente'}
 </p>
 </div>
 </>
 );

 const classe =
 'flex items-center gap-3 w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300';

 return contrato.arquivo ? (
 <a
 key={contrato.nome}
 href={contrato.arquivo}
 target="_blank"
 rel="noopener noreferrer"
 className={classe}
 onClick={() => setContratoIndisponivel(null)}
 >
 {conteudo}
 <Download size={18} className="text-gray-400 ml-auto shrink-0" />
 </a>
 ) : (
 <button
 key={contrato.nome}
 type="button"
 onClick={() => setContratoIndisponivel(contrato.nome)}
 className={classe}
 >
 {conteudo}
 <AlertTriangle size={18} className="text-amber-500 ml-auto shrink-0" />
 </button>
 );
 })}
 </div>

 {contratoIndisponivel && (
 <div
 role="alert"
 className="mt-4 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40"
 >
 <AlertTriangle
 size={20}
 className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
 />
 <p className="text-sm text-amber-800 dark:text-amber-300">
 Documento não encontrado. O contrato do plano{' '}
 <strong>{contratoIndisponivel}</strong> ainda não está disponível para consulta.
 </p>
 </div>
 )}
 </motion.div>

 {/* Para contratar */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="gradient-theme-cta rounded-2xl p-8 text-center"
 >
 <h2 className="text-2xl font-bold text-white mb-3">Para contratar</h2>
 <p className="text-white/85 mb-6">Envie um e-mail para a supervisão de benefícios.</p>
 <a
 href="mailto:supervisora@aessenai.org.br"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-theme-primary-dark rounded-xl font-semibold hover:bg-theme-primary-5 transition-colors shadow-lg"
 >
 <Mail size={20} />
 supervisora@aessenai.org.br
 </a>
 </motion.div>
 </div>
 </div>
 </section>
 </>
 );
}
