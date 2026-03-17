'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Users,
  ShieldCheck,
  Briefcase,
  Building2,
  UserCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
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
/*  Data                                                               */
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

const councils: Council[] = [
  {
    title: 'Conselho Deliberativo',
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-100 dark:border-emerald-900/40',
    members: [
      { name: 'Marcio Vieira Marinho', role: 'Presidente' },
      { name: 'Fernando Manoel Goncalves', role: 'Vice Presidente' },
      { name: 'Ygor Ferreira Fabre', role: 'Secretario' },
      { name: 'Carlos Alberto Lopes Fagundes', role: 'Membro' },
      { name: 'Danilo Kazuhire Shimoda', role: 'Membro' },
      { name: 'Joao Domingos Chiari Sanchez', role: 'Membro' },
      { name: 'Jose Luis Leme Candido Teixeira', role: 'Membro' },
      { name: 'Josivaldo Ferreira dos Santos', role: 'Membro' },
      { name: 'Ronaldo Sotrate Junior', role: 'Membro' },
      { name: 'Thiago de Souza Santos', role: 'Membro' },
      { name: 'Valdeir Doniz', role: 'Membro' },
    ],
  },
  {
    title: 'Conselho Fiscal',
    icon: ShieldCheck,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-100 dark:border-blue-900/40',
    members: [
      { name: 'Fulvia Alves da Silva', role: 'Presidente' },
      { name: 'Adriano Cesar Cardoso', role: 'Secretario' },
      { name: 'Caiza Carla Herbella', role: 'Membro' },
      { name: 'Jose Antonio Espelho', role: 'Membro' },
    ],
  },
  {
    title: 'Diretoria Executiva',
    icon: Briefcase,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-100 dark:border-green-900/40',
    members: [
      { name: 'Marcel Adriano Pereira Porto', role: 'Presidente' },
      { name: 'Ademir Redondo', role: '1. Vice Presidente' },
      { name: 'Everson de Aro Capobianco', role: '2. Vice Presidente' },
      { name: 'Maria Eugenia Cioffi', role: '1. Secretaria' },
      { name: 'Selma Maria Rossi Ganzarolli', role: '2. Secretaria' },
      { name: 'Jose Heroino de Sousa', role: '1. Tesoureiro' },
      { name: 'Denise Riguero Gallego', role: '2. Tesoureiro' },
      { name: 'Jose Marlito Benicio Ricarte', role: '3. Tesoureiro' },
    ],
  },
];

const departmentDirectors: Member[] = [
  { name: 'Dulceni Maria Paglione de Oliveira', role: 'Aposentados' },
  { name: 'Alessandra Angelim da Silva', role: 'Cultural/Recreativo' },
  { name: 'Rubens da Silva Moreira', role: 'Esportivo Capital' },
  { name: 'Edison Simon', role: 'Esportivo Interior' },
];

/* ------------------------------------------------------------------ */
/*  Member table component                                             */
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
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdministracaoPage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '-10%', right: '-5%' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-emerald-200/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link href="/sobre" className="hover:text-white transition-colors">
                Sobre a AES
              </Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">Administracao</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Administracao
            </h1>
            <p className="text-lg text-emerald-100/90 max-w-2xl">
              Corpo diretivo composto por 18 membros eleitos, organizados em
              Conselho Deliberativo, Conselho Fiscal e Diretoria Executiva.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-white dark:bg-gray-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-10"
          >
            {/* Council tables */}
            {councils.map((council) => (
              <MemberTable key={council.title} council={council} />
            ))}

            {/* Department Directors */}
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
                      {departmentDirectors.length} diretores
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
                      {departmentDirectors.map((dir, idx) => (
                        <motion.tr
                          key={dir.name}
                          variants={rowVariants}
                          className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${
                            idx === departmentDirectors.length - 1
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
