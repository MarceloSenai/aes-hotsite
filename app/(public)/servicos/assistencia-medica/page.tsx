'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  HeartPulse,
  Phone,
  Clock,
  MapPin,
  Building2,
  Stethoscope,
  Baby,
  FlaskConical,
  Siren,
  ShieldCheck,
} from 'lucide-react';

const coverageItems = [
  {
    icon: FlaskConical,
    title: 'Laboratórios Credenciados FESP',
    description: 'Rede completa de laboratórios credenciados para exames e diagnósticos.',
  },
  {
    icon: Stethoscope,
    title: 'Atendimento Eletivo',
    description: 'Consultas e procedimentos agendados com especialistas da rede.',
  },
  {
    icon: Siren,
    title: 'Urgências e Emergências',
    description: 'Atendimento 24h em pronto-socorro para situações de urgência e emergência.',
  },
  {
    icon: Baby,
    title: 'Maternidade',
    description: 'Cobertura completa para gestação, parto e pós-parto.',
  },
];

const contacts = [
  {
    icon: Phone,
    label: 'Autorizações (24h)',
    value: '(11) 3385-6074',
    href: 'tel:+551133856074',
  },
  {
    icon: Phone,
    label: 'Fax',
    value: '(11) 2146-2624',
    href: null,
  },
  {
    icon: Phone,
    label: 'SAC UNIMED',
    value: '0800 772 3030',
    href: 'tel:08007723030',
  },
];

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

export default function AssistenciaMedicaPage() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:gap-3 transition-all duration-300 mb-8"
          >
            <ArrowLeft size={18} />
            Voltar para Serviços
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center">
              <HeartPulse className="text-rose-600 dark:text-rose-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Assistência{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Médica
                </span>
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            A AES oferece aos seus associados e dependentes o plano de saúde UNIMED FESP
            (Carteira 970 - UNIMED Paulistana), com acesso a uma ampla rede nacional de
            hospitais e clínicas credenciados.
          </p>
        </motion.div>

        {/* Partner Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                UNIMED FESP
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Carteira 970 &mdash; UNIMED Paulistana | Rede nacional de hospitais e clínicas credenciados
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coverage Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
          {coverageItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-green-500/5 hover:border-green-200 dark:hover:border-green-700/60 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Central NAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-12 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Central NAS 24h</h3>
              <p className="text-green-100 text-sm">
                Serviços de gestão em saúde e suporte 24 horas para associados
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contatos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-gray-900 dark:text-white font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Office */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Escritório de Atendimento
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Endereço</p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Rua José Getúlio, 78/90 - Aclimação, São Paulo - SP
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Horário</p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Segunda a Sexta, 8h às 17h
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
