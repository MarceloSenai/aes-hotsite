'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, Users, Mail, Phone, ArrowRight, Dumbbell } from 'lucide-react';
import { CONTACT } from '@/lib/config/contact';

const atividades = [
  'Campeonatos internos de futebol, vôlei e outras modalidades',
  'Torneios esportivos para associados e dependentes',
  'Atividades esportivas em grupo nos núcleos de lazer',
  'Promoção da saúde e bem-estar através do esporte',
  'Organização de competições intersetoriais',
  'Apoio a prática esportiva para todas as idades',
];

const eventos = [
  { data: '22/02', titulo: 'Torneio de Verão', local: 'Clube de Campo - Jundiaí' },
  { data: '12/04', titulo: 'Campeonato de Futebol', local: 'Clube de Campo - Jundiaí' },
  { data: '15/09', titulo: 'Semana do Associado - Atividades Esportivas', local: 'Sede AES' },
];

export default function EsportivoCapitalPage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/departamentos" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} /> Voltar para Departamentos
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center">
              <Trophy size={32} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Esportivo Capital</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Diretor: <span className="font-semibold text-gray-700 dark:text-gray-300">Rubens da Silva Moreira</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Dumbbell size={20} className="text-sky-500" /> O que é o Departamento
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            O Departamento Esportivo Capital coordena todas as atividades esportivas na região da capital paulista. Organiza campeonatos, torneios e eventos esportivos para associados de todas as idades, promovendo saude, integração e espírito esportivo.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-sky-500" /> O que faz
          </h2>
          <ul className="space-y-3">
            {atividades.map((a) => (
              <li key={a} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <ArrowRight size={16} className="text-sky-500 mt-0.5 shrink-0" /> <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800/40 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-sky-600" /> A quem se destina
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Associados da AES residentes na capital de São Paulo e Grande São Paulo, seus dependentes e agregados. Atividades para todas as faixas etárias.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-sky-500" /> Eventos Programados
          </h2>
          <div className="space-y-3">
            {eventos.map((ev) => (
              <div key={ev.titulo} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold text-sky-600 dark:text-sky-400 w-16 text-sm">{ev.data}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{ev.titulo}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ev.local}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regulamentos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Regulamentos</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Para consultar o regulamento completo do departamento, entre em contato com a diretoria pelo e-mail ou telefone informados abaixo.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
          className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' }}>
          <h3 className="font-bold text-lg mb-3">Contato do Departamento</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="flex items-center gap-2 text-sm"><Mail size={16} /> {CONTACT.esportivo}</span>
            <span className="flex items-center gap-2 text-sm"><Phone size={16} /> {CONTACT.phone}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
