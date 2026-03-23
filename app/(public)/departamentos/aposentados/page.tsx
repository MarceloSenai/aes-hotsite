'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, Heart, Coffee, Mail, Phone, ArrowRight } from 'lucide-react';

const atividades = [
  'Encontros mensais de confraternizacao',
  'Passeios culturais e turisticos',
  'Eventos comemorativos (Dia do Aposentado, festas de final de ano)',
  'Orientacao sobre direitos e beneficios',
  'Atividades recreativas nos nucleos de lazer',
  'Integracao com demais departamentos da AES',
];

const eventos = [
  { data: '23/08', titulo: 'Encontro de Aposentados', local: 'Sede AES - Sao Paulo' },
  { data: '15/10', titulo: 'Passeio Cultural', local: 'A definir' },
  { data: '13/12', titulo: 'Confraternizacao de Final de Ano', local: 'Clube de Campo - Jundiai' },
];

export default function AposentadosPage() {
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
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
              <Users size={32} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Aposentados</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Diretora: <span className="font-semibold text-gray-700 dark:text-gray-300">Dulceni Maria Paglione de Oliveira</span></p>
            </div>
          </div>
        </motion.div>

        {/* O que e */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Heart size={20} className="text-amber-500" /> O que e o Departamento
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            O Departamento de Aposentados e dedicado ao suporte, integracao e valorizacao dos associados aposentados do SENAI-SP. Promove atividades de convivencia, bem-estar e lazer, mantendo o vinculo dos aposentados com a associacao e garantindo que continuem usufruindo de todos os beneficios da AES.
          </p>
        </motion.div>

        {/* Atividades */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Coffee size={20} className="text-amber-500" /> O que faz
          </h2>
          <ul className="space-y-3">
            {atividades.map((a) => (
              <li key={a} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <ArrowRight size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* A quem se destina */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/40 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-amber-600" /> A quem se destina
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Todos os associados aposentados do SENAI-SP e seus dependentes. Aposentados que mantenham seu vinculo associativo tem acesso a todas as atividades e beneficios do departamento.
          </p>
        </motion.div>

        {/* Eventos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-amber-500" /> Eventos Programados
          </h2>
          <div className="space-y-3">
            {eventos.map((ev) => (
              <div key={ev.titulo} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold text-amber-600 dark:text-amber-400 w-16 text-sm">{ev.data}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{ev.titulo}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ev.local}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
          <h3 className="font-bold text-lg mb-3">Contato do Departamento</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="flex items-center gap-2 text-sm"><Mail size={16} /> aposentados@aessenai.org.br</span>
            <span className="flex items-center gap-2 text-sm"><Phone size={16} /> (11) 3367-9900</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
