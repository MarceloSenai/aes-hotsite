'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, CreditCard, Shield, Calendar,
} from 'lucide-react';
import { getSession, type Associado } from '@/lib/supabase/auth-service';

/* ─── Helpers ─────────────────────────────────────────── */

function maskCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return cpf;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getInitials(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function tipoBadgeStyle(tipo: string): { bg: string; text: string } {
  switch (tipo.toLowerCase()) {
    case 'titular':    return { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400' };
    case 'dependente': return { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400' };
    case 'agregado':   return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400' };
    default:           return { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-400' };
  }
}

/* ─── Info Row ────────────────────────────────────────── */

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}
      >
        <Icon size={18} style={{ color: 'var(--color-primary)' }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
          {value || 'Nao informado'}
        </p>
      </div>
    </div>
  );
}

/* ─── Meu Cadastro Page ──────────────────────────────── */

export default function MeuCadastroPage() {
  const [session, setSession] = useState<Associado | null>(null);

  useEffect(() => {
    const s = getSession();
    if (s) setSession(s);
  }, []);

  if (!session) return null;

  const badge = tipoBadgeStyle(session.tipo);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Meu Cadastro
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Seus dados cadastrais na AES.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Profile card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header with avatar */}
          <div
            className="px-6 py-8 flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold mb-3 backdrop-blur-sm border-2 border-white/30">
              {getInitials(session.nome)}
            </div>
            <h2 className="text-xl font-bold text-white">{session.nome}</h2>
            <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-white/20 text-white`}>
              {session.tipo}
            </span>
          </div>

          {/* Info fields */}
          <div className="px-6 py-2">
            <InfoRow icon={User} label="Nome Completo" value={session.nome} />
            <InfoRow icon={CreditCard} label="CPF" value={maskCPF(session.cpf)} />
            <InfoRow icon={Mail} label="E-mail" value={session.email} />
            <InfoRow icon={Phone} label="Telefone" value={session.telefone} />
            <InfoRow icon={Shield} label="Tipo de Associado" value={session.tipo} />
            <InfoRow icon={Calendar} label="Membro desde" value={formatDate(session.created_at)} />
          </div>
        </div>

        {/* Notice */}
        <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Para atualizar seus dados cadastrais, entre em contato com a administracao da AES
            pelo telefone{' '}
            <a href="tel:+551133679900" className="font-medium" style={{ color: 'var(--color-primary)' }}>
              (11) 3367-9900
            </a>
            {' '}ou pelo e-mail{' '}
            <a href="mailto:gerente@aessenai.org.br" className="font-medium" style={{ color: 'var(--color-primary)' }}>
              gerente@aessenai.org.br
            </a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
