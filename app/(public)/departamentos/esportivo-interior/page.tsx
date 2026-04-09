'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Users, Mail, Phone, ArrowRight, Trophy } from 'lucide-react';

const atividades = [
  'Eventos esportivos regionais no interior paulista',
  'Torneios intermunicipais entre associados',
  'Esportes ao ar livre nos núcleos de lazer',
  'Integração esportiva regional',
  'Campeonatos de pesca, vôlei e futebol',
  'Caminhadas e atividades na natureza',
];

const eventos = [
  { data: '28/06', titulo: 'Torneio de Inverno', local: 'Clube de Campo - Jundiaí' },
  { data: '25/10', titulo: 'Campeonato de Pesca', local: 'Clube Náutico - Boracéia' },
  { data: '08/11', titulo: 'Torneio Regional de Vôlei', local: 'Clube de Campo - Jundiaí' },
];

export default function EsportivoInteriorPage() {
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
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
              <MapPin size={32} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Esportivo Interior</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Diretor: <span className="font-semibold text-gray-700 dark:text-gray-300">Edison Simon</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Trophy size={20} style={{ color: 'var(--color-primary)' }} /> O que é o Departamento
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            O Departamento Esportivo Interior é responsável pelas atividades esportivas nas cidades do interior de São Paulo. Garante que associados de todas as regiões tenham acesso a prática esportiva, integração e lazer, com eventos nos núcleos de lazer da AES.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={20} style={{ color: 'var(--color-primary)' }} /> O que faz
          </h2>
          <ul className="space-y-3">
            {atividades.map((a) => (
              <li key={a} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <ArrowRight size={16} className="text-theme-primary mt-0.5 shrink-0" /> <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border p-6 sm:p-8 mb-6" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, white)', borderColor: 'color-mix(in srgb, var(--color-primary-light) 60%, transparent)' }}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} style={{ color: 'var(--color-primary)' }} /> A quem se destina
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Associados da AES residentes no interior de São Paulo e seus dependentes. Os eventos sao realizados nos núcleos de lazer (Jundiaí, Boracéia, Itanhaém) e em outras localidades do interior.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} style={{ color: 'var(--color-primary)' }} /> Eventos Programados
          </h2>
          <div className="space-y-3">
            {eventos.map((ev) => (
              <div key={ev.titulo} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold w-16 text-sm" style={{ color: 'var(--color-primary)' }}>{ev.data}</span>
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
          className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
          <h3 className="font-bold text-lg mb-3">Contato do Departamento</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="flex items-center gap-2 text-sm"><Mail size={16} /> esportivo.interior@aessenai.org.br</span>
            <span className="flex items-center gap-2 text-sm"><Phone size={16} /> (11) 3367-9900</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
