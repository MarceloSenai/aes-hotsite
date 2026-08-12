'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import {
 ArrowRight,
 Building2,
 Palette,
 Trophy,
 Users,
} from 'lucide-react';
import { useDiretores } from '@/lib/hooks/use-diretores';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/DataState';
import EsportivoModal from '@/components/departamentos/EsportivoModal';

interface DepartmentCard {
 icon: typeof Users;
 title: string;
 /**
  * Diretores do departamento. Os nomes vêm da tabela `representantes`
  * (categoria diretores-departamentos), casados pelo `cargo`. O Esportivo tem
  * dois — Capital e Interior —, e aí o `rotulo` distingue cada um no card.
  */
 diretores: { cargo: string; rotulo?: string }[];
 /**
  * Para onde o card leva ao ser clicado. O Esportivo não tem rota própria:
  * abre um modal para o visitante escolher entre Capital e Interior.
  */
 destino: { tipo: 'rota'; href: string } | { tipo: 'escolha-esportivo' };
 description: string;
 highlights: string[];
 gradient: string;
 bgIcon: string;
 textIcon: string;
}

/** Destinos do modal do Esportivo (item 27). */
export const ESPORTIVO_OPCOES = [
 { rotulo: 'Capital', cargo: 'Departamento Esportivo - Capital', href: '/departamentos/esportivo-capital' },
 { rotulo: 'Interior', cargo: 'Departamento Esportivo - Interior', href: '/departamentos/esportivo-interior' },
];

const departments: DepartmentCard[] = [
 {
 icon: Users,
 title: 'Aposentados',
 diretores: [{ cargo: 'Departamento de Aposentados' }],
 destino: { tipo: 'rota', href: '/departamentos/aposentados' },
 description:
 'Departamento dedicado a despertar e manter o espírito associativo entre seus associados aposentados, promovendo atividades de convivência, bem-estar e de valorização daqueles que contribuíram para construir a história do SENAI e da Associação.',
 highlights: [
 'Atividades culturais, musicais ou artísticas voltadas ao lazer',
 'Eventos de cunho social e educativo',
 'Passeios turísticos',
 'Programa de Saúde e Qualidade de Vida',
 ],
 gradient: 'linear-gradient(to bottom right, #f59e0b, #f97316)',
 bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
 textIcon: 'text-amber-600 dark:text-amber-400',
 },
 {
 icon: Palette,
 title: 'Cultural e Recreativo',
 diretores: [{ cargo: 'Departamento Cultural e Recreativo' }],
 destino: { tipo: 'rota', href: '/departamentos/cultural-recreativo' },
 description:
 'Planeja, organiza e promove atividades voltadas ao lazer, cultura e bem-estar dos associados e de seus familiares, a partir da implementação de atividades que possam fortalecer o relacionamento e o espírito de integração entre eles.',
 highlights: [
 'Eventos culturais em geral',
 'Apresentações artísticas',
 'Festas temáticas',
 'Passeios e Excursões',
 ],
 gradient: 'linear-gradient(to bottom right, #8b5cf6, #a855f7)',
 bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
 textIcon: 'text-violet-600 dark:text-violet-400',
 },
 {
 // Capital e Interior eram dois cards. Viraram um só: o departamento é um,
 // com duas diretorias regionais — a escolha entre elas acontece no clique.
 icon: Trophy,
 title: 'Esportivo',
 diretores: ESPORTIVO_OPCOES.map(({ cargo, rotulo }) => ({ cargo, rotulo })),
 destino: { tipo: 'escolha-esportivo' },
 description:
 'Organiza e coordena eventos, cujo foco principal é a celebração, a socialização, a integração e o bem-estar dos associados, envolvendo múltiplos esportes:',
 highlights: [
 'Basquete',
 'FARAES',
 'Futsal',
 'Futebol Society',
 'Natação',
 'Tênis de Mesa',
 'Voleibol',
 ],
 gradient: 'linear-gradient(to bottom right, #0ea5e9, #3b82f6)',
 bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
 textIcon: 'text-sky-600 dark:text-sky-400',
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
 const { porCargo, loading, error, reload } = useDiretores();
 const [esportivoAberto, setEsportivoAberto] = useState(false);

 return (
 <div className="min-h-screen">
 {/* Hero Section */}
 <PageHeader
 icone={Building2}
 titulo="Departamentos"
 subtitulo="Conheça os departamentos e seus diretores, responsáveis por promover atividades voltadas ao fortalecimento dos vínculos sociais e para a participação dos associados na AES."
 />

 {/* Departments Grid */}
 <section className="py-20 bg-white dark:bg-gray-900">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
 </motion.div>

 {loading ? (
 <SkeletonGrid count={4} />
 ) : error ? (
 <ErrorState onRetry={reload} />
 ) : (
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-50px' }}
 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
 >
 {departments.map((dept) => {
 const Icon = dept.icon;
 const diretores = dept.diretores
 .map((d) => ({ rotulo: d.rotulo, nome: porCargo[d.cargo]?.nome }))
 .filter((d) => d.nome);

 // O card inteiro é clicável (item 27). Link e button sao ramos separados
 // de proposito: como componente dinamico, o TypeScript nao consegue
 // conciliar `href` obrigatorio do Link com as props do button.
 const classeCard = `relative block h-full w-full overflow-hidden rounded-2xl bg-theme-primary-5 dark:bg-gray-800 border border-theme-light dark:border-gray-700/60 p-8 text-left transition-all duration-300 hover:border-theme-primary dark:hover:border-theme-primary hover:shadow-xl hover:shadow-theme-glow focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900 hover:-translate-y-1`;

 const conteudo = (
 <>
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
 {diretores.map((d) => (
 <p key={d.nome} className="text-sm text-gray-500 dark:text-gray-400">
 {d.rotulo ? `${d.rotulo} — Diretor(a): ` : 'Diretor(a): '}
 <span className="font-semibold text-gray-700 dark:text-gray-300">
 {d.nome}
 </span>
 </p>
 ))}
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
 </>
 );

 return (
 <motion.div key={dept.title} variants={cardVariants} className="group">
 {dept.destino.tipo === 'rota' ? (
 <Link
 href={dept.destino.href}
 aria-label={`${dept.title} — ver detalhes`}
 className={classeCard}
 >
 {conteudo}
 </Link>
 ) : (
 <button
 type="button"
 onClick={() => setEsportivoAberto(true)}
 aria-haspopup="dialog"
 aria-expanded={esportivoAberto}
 aria-label={`${dept.title} — escolher regional`}
 className={classeCard}
 >
 {conteudo}
 </button>
 )}
 </motion.div>
 );
 })}
 </motion.div>
 )}
 </div>
 </section>

 <EsportivoModal
 open={esportivoAberto}
 onClose={() => setEsportivoAberto(false)}
 opcoes={ESPORTIVO_OPCOES.map((o) => ({
 rotulo: o.rotulo,
 href: o.href,
 diretor: porCargo[o.cargo]?.nome,
 }))}
 />
 </div>
 );
}
