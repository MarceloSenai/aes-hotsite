'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Smile,
  Palmtree,
  Shield,
  Handshake,
  ExternalLink,
  Phone,
  CreditCard,
  CalendarCheck,
  UserPlus,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const benefits = [
  {
    icon: HeartPulse,
    title: 'Assistencia Medica',
    description:
      'Plano de saude UNIMED FESP com cobertura completa para voce e seus dependentes.',
    gradient: 'from-rose-500 to-red-500',
    bgIcon: 'bg-rose-100 dark:bg-rose-900/30',
    textIcon: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: Smile,
    title: 'Assistencia Odontologica',
    description:
      'Cuidado dental completo com rede credenciada de qualidade.',
    gradient: 'from-sky-500 to-blue-500',
    bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
    textIcon: 'text-sky-600 dark:text-sky-400',
  },
  {
    icon: Palmtree,
    title: 'Nucleos de Lazer',
    description:
      'Clube de Campo, Clube Nautico e Colonia de Ferias com estrutura completa.',
    gradient: 'from-teal-500 to-cyan-500',
    bgIcon: 'bg-teal-100 dark:bg-teal-900/30',
    textIcon: 'text-teal-600 dark:text-teal-400',
  },
  {
    icon: Shield,
    title: 'Fundo Mutuo (FUMUS)',
    description:
      'Auxilio financeiro solidario em caso de falecimento do associado ou dependente.',
    gradient: 'from-amber-500 to-orange-500',
    bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
    textIcon: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Handshake,
    title: 'Parcerias e Convenios',
    description:
      'Descontos e condicoes especiais em farmacias, seguros e servicos diversos.',
    gradient: 'from-violet-500 to-purple-500',
    bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
    textIcon: 'text-violet-600 dark:text-violet-400',
  },
];

const quickLinks = [
  {
    icon: ExternalLink,
    title: 'Area do Associado',
    description: 'Acesse sua conta, atualize dados e acompanhe seus beneficios.',
    href: 'https://associado.aessenai.org.br',
    color: 'green',
  },
  {
    icon: CreditCard,
    title: 'Boletos e Pagamentos',
    description: 'Consulte e emita seus boletos de contribuicao.',
    href: 'https://associado.aessenai.org.br/#/main/billing',
    color: 'emerald',
  },
  {
    icon: CalendarCheck,
    title: 'Reservas',
    description: 'Reserve espacos nos nucleos de lazer online.',
    href: 'https://associado.aessenai.org.br/#/main/booking',
    color: 'teal',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function AssociadosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Faca parte da AES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Associados
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Conheca os beneficios exclusivos para associados da AES SENAI e saiba como fazer parte
              desta comunidade que valoriza o bem-estar de seus membros e familiares.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to become a member */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
              Como Associar-se
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Torne-se um{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Associado
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Funcionarios e aposentados do SENAI-SP podem se associar e usufruir de todos os beneficios
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 md:p-12 border border-green-200/60 dark:border-green-700/40"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <UserPlus className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quem pode se associar?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Funcionarios ativos e aposentados do SENAI no Estado de Sao Paulo,
                  bem como seus dependentes diretos, podem se associar a AES e ter acesso
                  a todos os beneficios oferecidos pela entidade.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {[
                'Preencha o formulario de associacao',
                'Apresente documentos pessoais e vinculo com o SENAI',
                'Escolha os beneficios desejados',
                'Comece a usufruir imediatamente',
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://associado.aessenai.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
              >
                Acessar Area do Associado
                <ExternalLink size={18} />
              </a>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={18} />
                <span className="font-medium">(11) 3367-9900</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
              Vantagens
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beneficios{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Exclusivos
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Uma gama completa de servicos para cuidar de voce e sua familia
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={cardVariants}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-1">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-300`}
                    />
                    <div className="relative mb-5">
                      <div
                        className={`w-14 h-14 ${benefit.bgIcon} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={benefit.textIcon} size={28} />
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Acesso Rapido
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Links uteis para associados
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.title}
                  variants={cardVariants}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/60 dark:border-green-700/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {link.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Acessar
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Duvidas sobre como se associar?
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Entre em contato conosco pelo telefone ou visite nossa sede.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:1133679900"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors duration-300 shadow-lg"
              >
                <Phone size={20} />
                (11) 3367-9900
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-700/50 text-white font-semibold rounded-xl hover:bg-green-700/70 transition-colors duration-300 border border-white/20"
              >
                Fale Conosco
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
