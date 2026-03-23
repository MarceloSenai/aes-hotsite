'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  UserPlus,
  CheckCircle,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Heart,
  TreePalm,
  Shield,
  Stethoscope,
} from 'lucide-react';

const beneficios = [
  { icon: Stethoscope, label: 'Assistencia Medica e Odontologica' },
  { icon: TreePalm, label: '3 Nucleos de Lazer' },
  { icon: Shield, label: 'Fundo Mutuo (FUMUS e FUMUA)' },
  { icon: Heart, label: 'Parcerias exclusivas' },
];

const tipos = [
  { titulo: 'Socio Titular', desc: 'Empregado ativo ou aposentado do SENAI-SP.' },
  { titulo: 'Dependente', desc: 'Conjuge, filhos e pais do associado titular.' },
  { titulo: 'Agregado', desc: 'Familiares e indicados pelo associado titular, mediante aprovacao.' },
];

const passos = [
  'Preencha a ficha cadastral abaixo',
  'Aguarde a analise e aprovacao do Conselho',
  'Receba a confirmacao por e-mail',
  'Acesse a Area do Associado e aproveite os beneficios',
];

export default function AssocieSeSeePage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} /> Voltar para Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
              <UserPlus size={32} style={{ color: 'var(--color-primary)' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              <span className="text-theme-gradient">Associe-se</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Faca parte da AES e tenha acesso a todos os beneficios para voce e sua familia.
          </p>
        </motion.div>

        {/* Beneficios */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {beneficios.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                  <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{b.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Quem pode */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quem pode se associar</h2>
          <div className="space-y-4">
            {tipos.map((t) => (
              <div key={t.titulo} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-theme-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.titulo}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Como associar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText size={20} style={{ color: 'var(--color-primary)' }} /> Como se associar
          </h2>
          <div className="space-y-3">
            {passos.map((p, i) => (
              <div key={p} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
                  {i + 1}
                </span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{p}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA - Ficha cadastral */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl p-8 text-white text-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
          <h3 className="text-2xl font-bold mb-3">Pronto para se associar?</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Entre em contato conosco para receber a ficha cadastral ou acesse a Area do Associado para iniciar seu cadastro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://associado.aessenai.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-sm transition-colors hover:bg-gray-100"
              style={{ color: 'var(--color-primary-dark)' }}
            >
              <ArrowRight size={16} />
              Area do Associado
            </a>
            <a
              href="mailto:cadastro@aessenai.org.br?subject=Solicitar%20Ficha%20Cadastral"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/40 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              <Mail size={16} />
              Solicitar Ficha Cadastral
            </a>
          </div>
          <p className="mt-4 text-white/60 text-xs flex items-center justify-center gap-2">
            <Phone size={12} /> Duvidas? Ligue (11) 3367-9900
          </p>
        </motion.div>
      </div>
    </section>
  );
}
