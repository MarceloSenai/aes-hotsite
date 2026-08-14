'use client';

import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import {
 Shield,
 Heart,
 Users,
 Ambulance,
 Mail,
 Clock,
 CheckCircle2,
 HandCoins,
} from 'lucide-react';

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

const sobreFumus = [
 'Contribuição mensal para manutenção do fundo de reserva coletivo.',
 'Carência: 12 meses.',
 'Adesão: preenchimento de ficha cadastral e encaminhamento para o e-mail cadastro@aessenai.org.br',
];

const prazosFumus = [
 { rotulo: 'Para solicitação do auxílio', prazo: 'Até 90 dias da ocorrência.' },
 { rotulo: 'Para receber o auxílio', prazo: 'Até 30 dias após apresentação da documentação.' },
];

const sobreFumua = [
 'Adesão automática.',
 'Nenhum tipo de contribuição / mensalidade.',
];

const prazosFumua = [
 { rotulo: 'Para solicitação do auxílio', prazo: 'Até 30 dias da emissão da nota fiscal.' },
 { rotulo: 'Para receber o auxílio', prazo: 'Até 10 dias úteis após apresentação da documentação.' },
];

export default function FundoMútuoPage() {
 return (
 <>
 {/* Faixa vermelha (hero) */}
 <PageHeader
 icone={Shield}
 titulo="Fundo Mútuo"
 subtitulo="A AES mantém dois fundos específicos de auxílio mútuo voltados para apoiar seus associados e dependentes em situações de emergência."
 />

 {/* Conteúdo */}
 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 className="space-y-8"
 >
 {/* FUMUS */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center">
 <Heart className="text-theme-primary dark:text-theme-primary" size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">FUMUS</h2>
 <p className="text-theme-primary dark:text-theme-primary font-medium text-sm">
 Fundo Mútuo de Solidariedade
 </p>
 </div>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-3">Sobre o FUMUS</h3>
 <ul className="space-y-3 mb-6">
 {sobreFumus.map((item) => (
 <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5" />
 <span>{item}</span>
 </li>
 ))}
 </ul>

 <div className="flex items-start gap-3 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl p-5 border border-theme-light dark:border-theme-primary-dark mb-6">
 <Mail className="text-theme-primary dark:text-theme-primary flex-shrink-0 mt-0.5" size={20} />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
 Procedimento em caso de sinistro (morte ou amputação de membro)
 </p>
 <p className="text-sm text-gray-700 dark:text-gray-300">
 Encaminhar para o e-mail cadastro@aessenai.org.br declaração ou atestado de óbito e os
 dados bancários para depósito do auxílio.
 </p>
 </div>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-3">Prazos</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {prazosFumus.map((item) => (
 <div
 key={item.rotulo}
 className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-5 border border-gray-200/80 dark:border-gray-700/60"
 >
 <div className="flex items-center gap-2 mb-2">
 <Clock className="text-theme-primary dark:text-theme-primary" size={18} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 {item.rotulo}
 </span>
 </div>
 <p className="text-gray-900 dark:text-white font-medium">{item.prazo}</p>
 </div>
 ))}
 </div>
 </motion.div>

 {/* FUMUA */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
 <Ambulance className="text-blue-600 dark:text-blue-400" size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">FUMUA</h2>
 <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
 Fundo Mútuo de Utilização de Ambulância
 </p>
 </div>
 </div>

 <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
 Reembolso parcial de despesas com serviços de remoção por ambulância, em situações não
 cobertas pelos contratos em vigor.
 </p>

 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40 mb-6">
 <div className="flex items-center gap-3 mb-2">
 <Users className="text-blue-600 dark:text-blue-400" size={20} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Elegibilidade</span>
 </div>
 <p className="text-gray-700 dark:text-gray-200">
 Associados, dependentes e/ou agregados inscritos nos planos de assistência médica mantidos
 pela AES.
 </p>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-3">Sobre o FUMUA</h3>
 <ul className="space-y-3 mb-6">
 {sobreFumua.map((item) => (
 <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
 <span>{item}</span>
 </li>
 ))}
 </ul>

 <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40 mb-6">
 <Mail className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
 Procedimento em caso de utilização do recurso
 </p>
 <p className="text-sm text-gray-700 dark:text-gray-300">
 Encaminhar para o e-mail cadastro@aessenai.org.br o relatório médico e/ou hospitalar e a
 nota fiscal solicitando o auxílio, com os dados bancários para depósito.
 </p>
 </div>
 </div>

 <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40 mb-6">
 <HandCoins className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Reembolso</p>
 <p className="text-sm text-gray-700 dark:text-gray-300">
 Até 90% da despesa comprovada, limitado a 20% do total de fundo de reserva.
 </p>
 </div>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-3">Prazos</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {prazosFumua.map((item) => (
 <div
 key={item.rotulo}
 className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-5 border border-gray-200/80 dark:border-gray-700/60"
 >
 <div className="flex items-center gap-2 mb-2">
 <Clock className="text-blue-600 dark:text-blue-400" size={18} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 {item.rotulo}
 </span>
 </div>
 <p className="text-gray-900 dark:text-white font-medium">{item.prazo}</p>
 </div>
 ))}
 </div>
 </motion.div>
 </motion.div>
 </div>
 </section>
 </>
 );
}
