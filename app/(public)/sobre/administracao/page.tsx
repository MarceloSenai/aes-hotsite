'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import {
 Users,
 ShieldCheck,
 Briefcase,
 Building2,
 UserCircle,
} from 'lucide-react';
import { representantesService } from '@/lib/services/data-service';
import { ListaCarregando } from '@/components/ui/Skeleton';
import { ErrorState, EmptyState } from '@/components/ui/DataState';

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

const rowVariants = {
 hidden: { opacity: 0, x: -12 },
 visible: {
 opacity: 1,
 x: 0,
 transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
 },
};

/* ------------------------------------------------------------------ */
/* Data */
/* ------------------------------------------------------------------ */

interface Member {
 name: string;
 role: string;
}

interface Council {
 title: string;
 icon: typeof Users;
 color: string;
 bgColor: string;
 borderColor: string;
 members: Member[];
}

type CategoriaAdmin =
 | 'conselho-deliberativo'
 | 'conselho-fiscal'
 | 'diretoria-executiva'
 | 'diretores-departamentos';

interface RepresentanteAdmin {
 id: string;
 nome: string;
 cargo?: string;
 categoria: string;
 sort_order: number;
}

/**
 * Configuração visual de cada conselho (título, ícone e cores). Os membros
 * vêm da tabela `representantes` no banco, filtrados por categoria.
 */
const COUNCIL_CONFIG: {
 categoria: CategoriaAdmin;
 title: string;
 icon: typeof Users;
 color: string;
 bgColor: string;
 borderColor: string;
}[] = [
 {
  categoria: 'conselho-deliberativo',
  title: 'Conselho Deliberativo',
  icon: Users,
  color: 'text-theme-primary dark:text-theme-primary',
  bgColor: 'bg-theme-primary-5 dark:bg-theme-primary-10',
  borderColor: 'border-theme-light dark:border-theme-primary-dark',
 },
 {
  categoria: 'conselho-fiscal',
  title: 'Conselho Fiscal',
  icon: ShieldCheck,
  color: 'text-blue-600 dark:text-blue-400',
  bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  borderColor: 'border-blue-100 dark:border-blue-900/40',
 },
 {
  categoria: 'diretoria-executiva',
  title: 'Diretoria Executiva',
  icon: Briefcase,
  color: 'text-theme-primary dark:text-theme-primary',
  bgColor: 'bg-theme-primary-5 dark:bg-theme-primary-10',
  borderColor: 'border-theme-light dark:border-theme-primary-dark',
 },
];

const CATEGORIAS_ADMIN: CategoriaAdmin[] = [
 'conselho-deliberativo',
 'conselho-fiscal',
 'diretoria-executiva',
 'diretores-departamentos',
];

/* ------------------------------------------------------------------ */
/* Member table component */
/* ------------------------------------------------------------------ */

function MemberTable({ council }: { council: Council }) {
 const Icon = council.icon;

 return (
 <motion.div variants={itemVariants}>
 <div
 className={`rounded-2xl border ${council.borderColor} overflow-hidden`}
 >
 {/* Header */}
 <div className={`${council.bgColor} px-6 py-4 flex items-center gap-3`}>
 <div className="p-2 bg-white/60 dark:bg-white/10 rounded-lg">
 <Icon size={22} className={council.color} />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
 {council.title}
 </h3>
 <p className="text-xs text-gray-500 dark:text-gray-400">
 {council.members.length} membros
 </p>
 </div>
 </div>

 {/* Table */}
 <div className="bg-white dark:bg-gray-900">
 <table className="w-full">
 <thead>
 <tr className="border-b border-gray-100 dark:border-gray-800">
 <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
 Nome
 </th>
 <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
 Cargo
 </th>
 </tr>
 </thead>
 <motion.tbody
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 >
 {council.members.map((member, idx) => (
 <motion.tr
 key={member.name}
 variants={rowVariants}
 className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${
 idx === council.members.length - 1 ? 'border-b-0' : ''
 }`}
 >
 <td className="px-6 py-3.5">
 <div className="flex items-center gap-3">
 <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
 <UserCircle
 size={18}
 className="text-gray-400 dark:text-gray-500"
 />
 </div>
 <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
 {member.name}
 </span>
 </div>
 </td>
 <td className="px-6 py-3.5">
 <span
 className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
 member.role === 'Presidente'
 ? 'bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light'
 : member.role.includes('Vice') ||
 member.role.includes('Secretari')
 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
 : member.role.includes('Tesoureiro')
 ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
 : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
 }`}
 >
 {member.role}
 </span>
 </td>
 </motion.tr>
 ))}
 </motion.tbody>
 </table>
 </div>
 </div>
 </motion.div>
 );
}

/* ------------------------------------------------------------------ */
/* Department directors table */
/* ------------------------------------------------------------------ */

function DepartmentDirectorsTable({ directors }: { directors: Member[] }) {
 if (directors.length === 0) return null;

 return (
 <motion.div variants={itemVariants}>
 <div className="rounded-2xl border border-amber-100 dark:border-amber-900/40 overflow-hidden">
 <div className="bg-amber-50 dark:bg-amber-950/30 px-6 py-4 flex items-center gap-3">
 <div className="p-2 bg-white/60 dark:bg-white/10 rounded-lg">
 <Building2
 size={22}
 className="text-amber-600 dark:text-amber-400"
 />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
 Diretores de Departamentos
 </h3>
 <p className="text-xs text-gray-500 dark:text-gray-400">
 {directors.length} diretores
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900">
 <table className="w-full">
 <thead>
 <tr className="border-b border-gray-100 dark:border-gray-800">
 <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
 Nome
 </th>
 <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
 Departamento
 </th>
 </tr>
 </thead>
 <motion.tbody
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 >
 {directors.map((dir, idx) => (
 <motion.tr
 key={dir.name}
 variants={rowVariants}
 className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${
 idx === directors.length - 1
 ? 'border-b-0'
 : ''
 }`}
 >
 <td className="px-6 py-3.5">
 <div className="flex items-center gap-3">
 <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
 <UserCircle
 size={18}
 className="text-gray-400 dark:text-gray-500"
 />
 </div>
 <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
 {dir.name}
 </span>
 </div>
 </td>
 <td className="px-6 py-3.5">
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
 {dir.role}
 </span>
 </td>
 </motion.tr>
 ))}
 </motion.tbody>
 </table>
 </div>
 </div>
 </motion.div>
 );
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function AdministracaoPage() {
 const [reps, setReps] = useState<RepresentanteAdmin[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 const load = async () => {
 setError(false);
 setLoading(true);
 try {
 const data = await representantesService.getAll();
 const admin = (data as unknown as RepresentanteAdmin[]).filter((r) =>
 (CATEGORIAS_ADMIN as string[]).includes(r.categoria),
 );
 setReps(admin);
 } catch (err) {
 console.error('Failed to load administracao:', err);
 setError(true);
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 load();
 }, []);

 // Agrupa representantes por categoria, montando os conselhos e os diretores.
 const { councils, directors } = useMemo(() => {
 const byCategoria = (cat: CategoriaAdmin) =>
 reps
 .filter((r) => r.categoria === cat)
 .map((r) => ({ name: r.nome, role: r.cargo || '—' }));

 const builtCouncils: Council[] = COUNCIL_CONFIG.map((cfg) => ({
 title: cfg.title,
 icon: cfg.icon,
 color: cfg.color,
 bgColor: cfg.bgColor,
 borderColor: cfg.borderColor,
 members: byCategoria(cfg.categoria),
 }));

 return {
 councils: builtCouncils,
 directors: byCategoria('diretores-departamentos'),
 };
 }, [reps]);

 const totalMembros = councils.reduce((acc, c) => acc + c.members.length, 0);

 return (
 <>
 {/* ── Hero Banner ── */}
 <PageHeader
 icone={Users}
 titulo="Administração"
 subtitulo="Corpo diretivo distribuído em Conselho Deliberativo, Conselho Fiscal e Diretoria Executiva."
 />

 {/* ── Content ──
     Largura contida (max-w-4xl) em vez dos 1920px do resto do site: são
     listas de nome + cargo, e esticadas na tela toda deixavam metros de
     vazio entre as duas colunas. */}
 <section className="bg-white dark:bg-gray-950 py-16 sm:py-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 {loading ? (
 <ListaCarregando titulo="Carregando o corpo administrativo…" linhas={8} />
 ) : error ? (
 <ErrorState onRetry={load} />
 ) : totalMembros === 0 && directors.length === 0 ? (
 <EmptyState message="Nenhum membro da administração cadastrado." />
 ) : (
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.05 }}
 className="space-y-10"
 >
 {/* Council tables */}
 {councils
 .filter((c) => c.members.length > 0)
 .map((council) => (
 <MemberTable key={council.title} council={council} />
 ))}

 {/* Department Directors */}
 <DepartmentDirectorsTable directors={directors} />
 </motion.div>
 )}
 </div>
 </section>
 </>
 );
}
