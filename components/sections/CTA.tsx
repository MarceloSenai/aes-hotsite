'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefone',
    value: '(11) 3367-9900',
    href: 'tel:+551133679900',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(11) 3367-9900',
    href: 'https://wa.me/551133679900',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@aessenai.org.br',
    href: 'mailto:contato@aessenai.org.br',
  },
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Rua Correia de Andrade, 232, Brás, São Paulo - SP, CEP 03008-020',
    href: 'https://maps.google.com/?q=Rua+Correia+de+Andrade+232+Bras+Sao+Paulo+SP',
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CTA() {
  return (
    <section
      id="contato"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '-15%', right: '-10%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '-10%', left: '-5%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 15%, transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Associe-se à AES
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Faça parte da Associação dos Empregados do SENAI e aproveite todos
              os benefícios exclusivos para você e sua família.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <a
              href="https://associado.aessenai.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl duration-300 text-lg"
              style={{ color: 'var(--color-primary)' }}
            >
              Área do Associado
              <ExternalLink
                size={20}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <Link
              href="/contato"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/80 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Fale Conosco
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Contact Info Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-2.5 bg-white/15 rounded-xl group-hover:bg-white/20 transition-colors">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/70 mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm leading-snug break-words">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Working Hours */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 text-white/80"
          >
            <Clock size={18} className="flex-shrink-0" />
            <p className="text-sm sm:text-base">
              <span className="font-medium text-white">Horário de Atendimento:</span>{' '}
              Segunda à Sexta, 7:00h às 16:00h
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
