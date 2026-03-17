'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

const cards = [
  {
    icon: Target,
    title: 'Missão',
    description:
      'Proporcionar qualidade de vida aos seus associados, dependentes e agregados, promovendo a integração social, a solidariedade e a cidadania, construindo a consciência coletiva.',
  },
  {
    icon: Eye,
    title: 'Visão',
    description:
      'Ser referência como associação de empregados, promovendo o bem-estar e a qualidade de vida através de serviços de excelência e integração social.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description:
      'Solidariedade, Cidadania, Integração Social, Transparência, Compromisso com o associado.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export default function Mission() {
  return (
    <section id="missao" className="relative py-24 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-60" style={{ backgroundColor: 'var(--color-primary-light)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-60" style={{ backgroundColor: 'var(--color-primary-light)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
            Quem somos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Nossa{' '}
            <span style={{ color: 'var(--color-primary)' }}>Essência</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-lg">
            Conheça os pilares que orientam todas as ações da AES em prol dos
            nossos associados.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {cards.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }} />

              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl transition-colors duration-300 group-hover:text-white" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Icon className="w-7 h-7" strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed">{description}</p>

              {/* Bottom decorative dots */}
              <div className="mt-6 flex gap-1.5">
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
