'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, Users, MapPin, X, Star, Loader2,
  AlertCircle, CheckCircle, Clock, XCircle, Filter, Info,
} from 'lucide-react';
import { getSession } from '@/lib/supabase/auth-service';
import {
  getReservasDoAssociado, cancelarReserva, avaliarReserva,
  getAvaliacao, NUCLEOS, type Reserva, type Avaliacao,
} from '@/lib/supabase/reservas-service';

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

type StatusFilter = 'todas' | 'pendente' | 'confirmada' | 'concluida' | 'cancelada';

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  pendente:   { label: 'Pendente',   color: 'text-amber-700 dark:text-amber-400',  bgColor: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', icon: Clock },
  confirmada: { label: 'Confirmada', color: 'text-emerald-700 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800', icon: CheckCircle },
  concluida:  { label: 'Concluida',  color: 'text-blue-700 dark:text-blue-400',    bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', icon: CalendarDays },
  cancelada:  { label: 'Cancelada',  color: 'text-red-700 dark:text-red-400',      bgColor: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', icon: XCircle },
};

const FILTER_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'confirmada', label: 'Confirmadas' },
  { key: 'concluida', label: 'Concluidas' },
  { key: 'cancelada', label: 'Canceladas' },
];

/* ─── Rating Modal ────────────────────────────────────── */

function RatingModal({
  reserva,
  onClose,
  onSubmit,
}: {
  reserva: Reserva;
  onClose: () => void;
  onSubmit: (nota: number, comentario: string) => Promise<void>;
}) {
  const [nota, setNota] = useState(5);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(nota, comentario);
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Avaliar Estadia</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {getNucleoNome(reserva.nucleo_id)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatDate(reserva.check_in)} - {formatDate(reserva.check_out)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nota
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNota(star)}
                  onMouseEnter={() => setHoverNota(star)}
                  onMouseLeave={() => setHoverNota(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      (hoverNota || nota) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">{hoverNota || nota}/5</span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Comentario (opcional)
            </label>
            <textarea
              id="comentario"
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Conte-nos sobre sua experiencia..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200"
              style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Enviando...
                </span>
              ) : (
                'Enviar Avaliacao'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ─── Reservas Page ───────────────────────────────────── */

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('todas');
  const [ratingReserva, setRatingReserva] = useState<Reserva | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Record<string, Avaliacao>>({});
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadReservas = useCallback(async () => {
    const s = getSession();
    if (!s) return;
    const data = await getReservasDoAssociado(s.id);
    setReservas(data);
    setLoading(false);

    // Load avaliacoes for concluidas
    const concluidas = data.filter((r) => r.status === 'concluida');
    const avMap: Record<string, Avaliacao> = {};
    await Promise.all(
      concluidas.map(async (r) => {
        const av = await getAvaliacao(r.id);
        if (av) avMap[r.id] = av;
      })
    );
    setAvaliacoes(avMap);
  }, []);

  useEffect(() => {
    loadReservas();
  }, [loadReservas]);

  const handleCancel = useCallback(async (reservaId: string) => {
    setCancellingId(reservaId);
    const ok = await cancelarReserva(reservaId);
    if (ok) {
      setReservas((prev) =>
        prev.map((r) => (r.id === reservaId ? { ...r, status: 'cancelada' as const } : r))
      );
    }
    setCancellingId(null);
  }, []);

  const handleRating = useCallback(async (nota: number, comentario: string) => {
    if (!ratingReserva) return;
    const ok = await avaliarReserva(ratingReserva.id, nota, comentario);
    if (ok) {
      setAvaliacoes((prev) => ({
        ...prev,
        [ratingReserva.id]: {
          id: '',
          reserva_id: ratingReserva.id,
          nota,
          comentario: comentario || null,
          created_at: new Date().toISOString(),
        },
      }));
    }
    setRatingReserva(null);
  }, [ratingReserva]);

  const filtered = filter === 'todas' ? reservas : reservas.filter((r) => r.status === filter);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Minhas Reservas
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Acompanhe todas as suas reservas nos nucleos de lazer.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        <Filter size={16} className="text-gray-400 shrink-0 mr-1" />
        {FILTER_TABS.map((tab) => {
          const isActive = filter === tab.key;
          const count = tab.key === 'todas'
            ? reservas.length
            : reservas.filter((r) => r.status === tab.key).length;

          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={isActive ? { backgroundColor: 'var(--color-primary)' } : undefined}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reservas list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-gray-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <CalendarDays size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhuma reserva encontrada.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            {filter !== 'todas' ? 'Tente outro filtro ou ' : ''}
            <a href="/area-do-associado/nova-reserva" className="underline" style={{ color: 'var(--color-primary)' }}>
              faca uma nova reserva
            </a>.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((reserva, index) => {
              const statusConf = STATUS_CONFIG[reserva.status] || STATUS_CONFIG.pendente;
              const StatusIcon = statusConf.icon;
              const canCancel = reserva.status === 'pendente' || reserva.status === 'confirmada';
              const canRate = reserva.status === 'concluida' && !avaliacoes[reserva.id];
              const hasRating = !!avaliacoes[reserva.id];

              return (
                <motion.div
                  key={reserva.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {getNucleoNome(reserva.nucleo_id)}
                        </h3>
                      </div>
                      {reserva.acomodacao && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 ml-5 mb-2">
                          {reserva.acomodacao.nome} ({reserva.acomodacao.tipo})
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {formatDate(reserva.check_in)} (14:00) - {formatDate(reserva.check_out)} (12:00)
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {reserva.num_hospedes} {reserva.num_hospedes === 1 ? 'hospede' : 'hospedes'}
                        </span>
                      </div>
                      <div className="mt-2 ml-5 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                        <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                          <Info size={12} className="shrink-0 mt-0.5" />
                          Politica de cancelamento: Cancelamento gratuito ate 7 dias antes do check-in. Apos esse prazo, sera cobrada 1 diaria como taxa.
                        </p>
                      </div>
                      {hasRating && (
                        <div className="flex items-center gap-1 mt-2 ml-5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              className={
                                avaliacoes[reserva.id].nota >= star
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">Avaliado</span>
                        </div>
                      )}
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConf.bgColor} ${statusConf.color}`}>
                        <StatusIcon size={12} />
                        {statusConf.label}
                      </span>

                      <div className="flex items-center gap-2">
                        {canCancel && (
                          <button
                            onClick={() => handleCancel(reserva.id)}
                            disabled={cancellingId === reserva.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800 transition-colors disabled:opacity-50"
                          >
                            {cancellingId === reserva.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              'Cancelar'
                            )}
                          </button>
                        )}
                        {canRate && (
                          <button
                            onClick={() => setRatingReserva(reserva)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                          >
                            Avaliar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Rating modal */}
      <AnimatePresence>
        {ratingReserva && (
          <RatingModal
            reserva={ratingReserva}
            onClose={() => setRatingReserva(null)}
            onSubmit={handleRating}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
