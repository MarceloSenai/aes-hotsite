'use client';

import { motion } from 'framer-motion';
import {
 Users,
 Palette,
 Trophy,
 MapPin,
 ArrowRight,
} from 'lucide-react';

const departments = [
 {
 icon: Users,
 title: 'Aposentados',
 director: 'Dulceni Maria Paglione de Oliveira',
 role: 'Diretora',
 description:
 'Departamento dedicado ao suporte e integração dos associados aposentados, promovendo atividades de convivência, bem-estar e valorização dos membros que contribuíram para a história do SENAI.',
 highlights: [
 'Eventos de confraternização',
 'Apoio e orientação',
 'Atividades recreativas',
 'Integração social',
 ],
 gradient: 'linear-gradient(to bottom right, #f59e0b, #f97316)',
 bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
 textIcon: 'text-amber-600 dark:text-amber-400',
 borderHover: 'hover:border-amber-200 dark:hover:border-amber-700/60',
 shadowHover: 'hover:shadow-amber-500/5',
 },
 {
 icon: Palette,
 title: 'Cultural e Recreativo',
 director: 'Alessandra Angelim da Silva',
 role: 'Diretora',
 description:
 'Promove atividades culturais, artísticas e recreativas para os associados e famíliares, organizando eventos, passeios, shows e programas de entretenimento ao longo do ano.',
 highlights: [
 'Eventos culturais',
 'Passeios e excursões',
 'Programação artística',
 'Atividades recreativas',
 ],
 gradient: 'linear-gradient(to bottom right, #8b5cf6, #a855f7)',
 bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
 textIcon: 'text-violet-600 dark:text-violet-400',
 borderHover: 'hover:border-violet-200 dark:hover:border-violet-700/60',
 shadowHover: 'hover:shadow-violet-500/5',
 },
 {
 icon: Trophy,
 title: 'Esportivo Capital',
 director: 'Rubens da Silva Moreira',
 role: 'Diretor',
 description:
 'Coordena as atividades esportivas na região da capital paulista, organizando campeonatos, torneios e eventos esportivos para associados de todas as idades.',
 highlights: [
 'Campeonatos internos',
 'Torneios esportivos',
 'Atividades em grupo',
 'Promoção da saúde',
 ],
 gradient: 'linear-gradient(to bottom right, #0ea5e9, #3b82f6)',
 bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
 textIcon: 'text-sky-600 dark:text-sky-400',
 borderHover: 'hover:border-sky-200 dark:hover:border-sky-700/60',
 shadowHover: 'hover:shadow-sky-500/5',
 },
 {
 icon: MapPin,
 title: 'Esportivo Interior',
 director: 'Edison Simon',
 role: 'Diretor',
 description:
 'Responsável pelas atividades esportivas nas cidades do interior de São Paulo, garantindo que associados de todas as regiões tenham acesso à prática esportiva e integração.',
 highlights: [
 'Eventos regionais',
 'Torneios intermunicipais',
 'Esportes ao ar livre',
 'Integração regional',
 ],
 gradient: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))',
 bgIcon: 'bg-theme-primary-light dark:bg-theme-primary-20',
 textIcon: 'text-theme-primary dark:text-theme-primary',
 borderHover: 'hover:border-theme-primary-light dark:hover:border-theme-primary-dark',
 shadowHover: 'hover:shadow-theme-glow',
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

export default function DepartamentosPage() {
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
 Estrutura Organizacional
 </span>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
 Departamentos
 </h1>
 <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
 Conheça os departamentos da AES SENAI e seus diretores, responsáveis por organizar
 atividades e serviços para os associados.
 </p>
 </motion.div>
 </div>
 </section>

 {/* Departments Grid */}
 <section className="py-20 bg-white dark:bg-gray-900">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-16"
 >
 <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
 Nossos Departamentos
 </span>
 <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
 Áreas de{' '}
 <span className="text-theme-gradient">
 Atuação
 </span>
 </h2>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
 Cada departamento é liderado por um diretor dedicado a promover atividades e benefícios
 </p>
 </motion.div>

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-50px' }}
 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
 >
 {departments.map((dept) => {
 const Icon = dept.icon;
 return (
 <motion.div
 key={dept.title}
 variants={cardVariants}
 className="group"
 >
 <div
 className={`relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 p-8 transition-all duration-300 hover:shadow-xl ${dept.shadowHover} ${dept.borderHover} hover:-translate-y-1`}
 >
 {/* Gradient overlay on hover */}
 <div
 className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-300"
 style={{ background: dept.gradient }}
 />

 <div className="relative">
 {/* Header */}
 <div className="flex items-start gap-4 mb-6">
 <div
 className={`w-16 h-16 ${dept.bgIcon} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
 >
 <Icon className={dept.textIcon} size={32} />
 </div>
 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
 {dept.title}
 </h3>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {dept.role}:{' '}
 <span className="font-semibold text-gray-700 dark:text-gray-300">
 {dept.director}
 </span>
 </p>
 </div>
 </div>

 {/* Description */}
 <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
 {dept.description}
 </p>

 {/* Highlights */}
 <div className="grid grid-cols-2 gap-3">
 {dept.highlights.map((item) => (
 <div
 key={item}
 className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
 >
 <ArrowRight
 size={14}
 className="text-theme-primary flex-shrink-0"
 />
 <span>{item}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 );
 })}
 </motion.div>
 </div>
 </section>
 </div>
 );
}
