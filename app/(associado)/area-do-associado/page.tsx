'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarDays, PlusCircle, Clock, CheckCircle,
  ArrowRight, Loader2, MapPin,
} from 'lucide-react';
import { getSession, type Associado } from '@/lib/supabase/auth-service';
import { getReservasDoAssociado, NUCLEOS, type Reserva } from '@/lib/supabase/reservas-service';

/* ─── Helpers ─────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getNucleoNome(nucleoId: string): string {
  return NUCLEOS.find((n) => n.id === nucleoId)?.nome ?? nucleoId;
}

/* ─── Dashboard Page ──────────────────────────────────── */

export default function DashboardPage() {
  const [session, setSession] = useState<Associado | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) return;
    setSession(s);

    getReservasDoAssociado(s.id).then((data) => {
      setReservas(data);
      setLoading(false);
    });
  }, []);

  const totalReservas = reservas.length;
  const reservasAtivas = reservas.filter((r) => r.status === 'confirmada' || r.status === 'pendente').length;
  const proximaReserva = reservas
    .filter((r) => (r.status === 'confirmada' || r.status === 'pendente') && new Date(r.check_in) >= new Date())
    .sort((a, b) => new Date(a.check_in).getTime() - new Date(b.check_in).getTime())[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Bem-vindo, {session?.nome.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gerencie suas reservas nos nucleos de lazer da AES.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-gray-400" />
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {/* Total reservas */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}
                >
                  <CalendarDays size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Reservas</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalReservas}</p>
            </motion.div>

            {/* Reservas ativas */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20">
                  <CheckCircle size={20} className="text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reservas Ativas</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{reservasAtivas}</p>
            </motion.div>

            {/* Proxima reserva */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
                  <Clock size={20} className="text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Proxima Reserva</span>
              </div>
              {proximaReserva ? (
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatDate(proximaReserva.check_in)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} />
                    {getNucleoNome(proximaReserva.nucleo_id)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Nenhuma reserva agendada</p>
              )}
            </motion.div>
          </div>

          {/* Quick actions */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/area-do-associado/nova-reserva"
              className="group flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
              >
                <PlusCircle size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">Nova Reserva</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reserve em um dos nossos nucleos</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors shrink-0" />
            </Link>

            <Link
              href="/area-do-associado/reservas"
              className="group flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-500">
                <CalendarDays size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">Minhas Reservas</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Veja e gerencie suas reservas</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors shrink-0" />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
