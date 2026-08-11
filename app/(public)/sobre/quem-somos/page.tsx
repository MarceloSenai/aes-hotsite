'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 ChevronRight,
 Building2,
 Calendar,
 Award,
 Target,
 Eye,
 Heart,
 Users,
 Landmark,
 MapPin,
 Phone,
 Clock,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Animation variants */
/* ------------------------------------------------------------------ */

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.12, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 24 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
 },
};

/* ------------------------------------------------------------------ */
/* Data */
/* ------------------------------------------------------------------ */

const departments = [
 { name: 'Aposentados', href: '/departamentos/aposentados' },
 { name: 'Cultura e Recreativo', href: '/departamentos/cultural-recreativo' },
 { name: 'Esportivo Capital', href: '/departamentos/esportivo-capital' },
 { name: 'Esportivo Interior', href: '/departamentos/esportivo-interior' },
];

const milestones = [
 {
 icon: Calendar,
 title: 'Fundada em 21 de novembro de 1947',
 description:
 'A AES nasceu com o propósito de representar e assistir seus associados, fomentando o associativismo e zelando pelo bem-estar coletivo.',
 },
 {
 icon: Award,
 title: 'Utilidade Pública desde 1966',
 description:
 'Declarada de utilidade pública pelo Decreto Estadual n. 9376, de 7 de junho de 1966, reconhecendo sua relevância social.',
 },
];

/**
 * Missão, Visão e Valores. A missão é o texto aprovado pela associação; visão e
 * valores vêm do conteúdo institucional já existente no projeto
 * (components/sections/Mission.tsx).
 */
const pilares = [
 {
 icon: Target,
 title: 'Missão',
 description: 'Promover a união e o bem-estar dos associados',
 },
 {
 icon: Eye,
 title: 'Visão',
 description:
 'Ser referência como associação de empregados, promovendo o bem-estar e a qualidade de vida através de serviços de excelência.',
 },
 {
 icon: Heart,
 title: 'Valores',
 description:
 'Solidariedade, Cidadania, Integração Social, Transparência, Compromisso com o associado.',
 },
];

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function QuemSomosPage() {
 return (
 <>
 {/* ── Hero Banner ── */}
 <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary), var(--color-primary-dark))" }}>
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <motion.div
 className="absolute w-[400px] h-[400px] bg-theme-primary-20 rounded-full blur-[100px]"
 animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
 transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
 style={{ top: '-10%', right: '-5%' }}
 />
 </div>

 <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 {/* Breadcrumb */}
 <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
 <Link href="/" className="hover:text-white transition-colors">
 Home
 </Link>
 <ChevronRight size={14} />
 <span className="text-white font-medium">Quem Somos</span>
 </nav>

 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 Quem Somos
 </h1>
 <blockquote className="text-lg text-white/80 max-w-2xl italic">
 &ldquo;Unir-se é um bom começo, manter a união é um progresso, e
 trabalhar em conjunto é a vitória.&rdquo;{' '}
 <cite className="not-italic text-white/60">(Henry Ford)</cite>
 </blockquote>
 </motion.div>
 </div>
 </section>

 {/* ── Content ── */}
 <section className="bg-white dark:bg-gray-950 py-12 sm:py-16">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="space-y-10"
 >
 {/* Milestones */}
 <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2">
 {milestones.map((m) => {
 const Icon = m.icon;
 return (
 <div
 key={m.title}
 className="flex gap-4 p-6 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark"
 >
 <div className="shrink-0 p-3 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl h-fit">
 <Icon size={24} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
 {m.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
 {m.description}
 </p>
 </div>
 </div>
 );
 })}
 </motion.div>

 {/* Missão, Visão e Valores */}
 <motion.div variants={itemVariants}>
 <div className="flex items-center gap-3 mb-4">
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl">
 <Target size={22} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 Missão, Visão e Valores
 </h2>
 </div>
 <div className="grid gap-6 sm:grid-cols-3">
 {pilares.map((pilar) => {
 const Icon = pilar.icon;
 return (
 <div
 key={pilar.title}
 className="flex gap-4 p-6 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark"
 >
 <div className="shrink-0 p-3 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl h-fit">
 <Icon size={24} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
 {pilar.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
 {pilar.description}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </motion.div>

 {/* Organizational Structure */}
 <motion.div variants={itemVariants}>
 <div className="flex items-center gap-3 mb-4">
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl">
 <Landmark size={22} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 Estrutura Organizacional
 </h2>
 </div>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
 São órgão da AES a Assembleia Geral e o Corpo Administrativo composto
 por dezoito associados eleitos, distribuídos nos Conselhos Deliberativo
 e Fiscal e na Diretoria Executiva.
 </p>
 <div className="grid sm:grid-cols-3 gap-4">
 {[
 {
 title: 'Conselho Deliberativo',
 desc: 'Órgão máximo de deliberação da associação.',
 },
 {
 title: 'Conselho Fiscal',
 desc: 'Responsável pela fiscalização financeira e contábil.',
 },
 {
 title: 'Diretoria Executiva',
 desc: 'Execução das decisões e gestão do dia a dia.',
 },
 ].map((org) => (
 <div
 key={org.title}
 className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
 >
 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
 {org.title}
 </h3>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {org.desc}
 </p>
 </div>
 ))}
 </div>
 <div className="mt-4 text-right">
 <Link
 href="/sobre/administracao"
 className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-primary dark:text-theme-primary hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
 >
 Ver membros da administração
 <ChevronRight size={16} />
 </Link>
 </div>
 </motion.div>

 {/* Departments */}
 <motion.div variants={itemVariants}>
 <div className="flex items-center gap-3 mb-4">
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl">
 <Users size={22} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 Departamentos
 </h2>
 </div>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
 A AES conta com 4 departamentos que atuam em áreas diversas para atender
 os associados:
 </p>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {departments.map((dept) => (
 <Link
 key={dept.name}
 href={dept.href}
 className="group flex flex-col items-center text-center p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-theme-primary-light dark:hover:border-theme-primary-dark hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="p-3 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-full mb-3 group-hover:bg-theme-primary-light dark:group-hover:bg-theme-primary-20 transition-colors">
 <Building2
 size={20}
 className="text-theme-primary dark:text-theme-primary"
 />
 </div>
 <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-theme-primary-dark dark:group-hover:text-theme-primary transition-colors">
 {dept.name}
 </span>
 </Link>
 ))}
 </div>
 </motion.div>

 {/* Contact / Address */}
 <motion.div variants={itemVariants}>
 <div className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark p-8">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Onde Estamos
 </h2>
 <div className="grid sm:grid-cols-3 gap-6">
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MapPin size={18} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
 Endereço
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
 Rua Correia de Andrade, 232
 <br />
 Brás, São Paulo - SP
 <br />
 1. Andar - CEP 03008-020
 </p>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Phone size={18} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
 Telefone
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <a
 href="tel:+551133679900"
 className="hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
 >
 (11) 3367-9900
 </a>
 </p>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Clock size={18} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
 Horário de Atendimento
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 Segunda a Sexta
 <br />
 7:00 - 17:00
 </p>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </motion.div>
 </div>
 </section>
 </>
 );
}
