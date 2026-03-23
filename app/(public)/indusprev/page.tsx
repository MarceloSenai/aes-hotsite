'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Globe,
  HelpCircle,
} from 'lucide-react';

const beneficios = [
  { icon: ShieldCheck, titulo: 'Seguranca Financeira', desc: 'Planejamento de longo prazo para uma aposentadoria tranquila e segura.' },
  { icon: TrendingUp, titulo: 'Rentabilidade', desc: 'Gestao profissional dos recursos com foco em rentabilidade e seguranca.' },
  { icon: Users, titulo: 'Para Todos', desc: 'Aberto a todos os empregados do SENAI-SP, ativos e aposentados.' },
];

const faqs = [
  { q: 'O que e o INDUSPREV?', a: 'O INDUSPREV e uma entidade fechada de previdencia complementar que administra planos de beneficios para empregados de empresas do Sistema Industria.' },
  { q: 'Quem pode participar?', a: 'Todos os empregados do SENAI-SP, tanto ativos quanto aposentados, podem aderir ao plano de previdencia complementar.' },
  { q: 'Como funciona a contribuicao?', a: 'O participante escolhe o percentual de contribuicao mensal, que e descontado diretamente em folha. A patrocinadora (SENAI) tambem contribui conforme regulamento.' },
  { q: 'Posso resgatar a qualquer momento?', a: 'O resgate esta sujeito as regras do regulamento do plano. Consulte o INDUSPREV para detalhes sobre carencia e condicoes de resgate.' },
  { q: 'Como aderir?', a: 'Entre em contato com o RH do SENAI-SP ou diretamente com o INDUSPREV pelos canais de atendimento listados abaixo.' },
];

export default function IndusprevPage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} />
            Voltar para Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
              <Landmark size={32} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              <span className="text-theme-gradient">INDUSPREV</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Previdencia Complementar para empregados do SENAI-SP. Planeje seu futuro com seguranca e tranquilidade.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {beneficios.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                  <Icon size={24} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{b.titulo}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <HelpCircle size={24} style={{ color: 'var(--color-primary)' }} />
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl p-6 sm:p-8 text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
          <h3 className="text-xl font-bold mb-4">Contato INDUSPREV</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-white/80" />
              <span className="text-sm">(11) 3146-7400</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-white/80" />
              <span className="text-sm">contato@indusprev.org.br</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-white/80" />
              <a href="https://www.indusprev.org.br" target="_blank" rel="noopener noreferrer" className="text-sm underline hover:text-white/80">
                www.indusprev.org.br
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
