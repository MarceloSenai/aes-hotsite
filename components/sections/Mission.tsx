'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

const cards = [
  {
    icon: Target,
    title: 'Missao',
    description:
      'Proporcionar qualidade de vida aos seus associados, dependentes e agregados, promovendo a integracao social, a solidariedade e a cidadania.',
  },
  {
    icon: Eye,
    title: 'Visao',
    description:
      'Ser referencia como associacao de empregados, promovendo o bem-estar e a qualidade de vida atraves de servicos de excelencia.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description:
      'Solidariedade, Cidadania, Integracao Social, Transparencia, Compromisso com o associado.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Mission() {
  return (
    <section id="missao" className="relative py-20 sm:py-24 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-40 dark:opacity-20" style={{ backgroundColor: 'var(--color-primary-light)' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-40 dark:opacity-20" style={{ backgroundColor: 'var(--color-primary-light)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
            Quem somos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Nossa{' '}
            <span style={{ color: 'var(--color-primary)' }}>Essencia</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
            Conheca os pilares que orientam todas as acoes da AES em prol dos nossos associados.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-900 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }} />

              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-13 h-13 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Icon className="w-7 h-7" strokeWidth={1.8} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>

              <div className="mt-5 flex gap-1.5">
                <span className="block w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12" style={{ backgroundColor: 'var(--color-primary)' }} />
                <span className="block w-2 h-1 rounded-full" style={{ backgroundColor: 'var(--color-primary-light)' }} />
                <span className="block w-2 h-1 rounded-full" style={{ backgroundColor: 'var(--color-primary-light)' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
