'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, CalendarDays, Home, Users, CheckCircle,
  ChevronLeft, ChevronRight, Loader2, TreePalm,
  Accessibility, PawPrint, ArrowRight, PartyPopper, Info, Clock,
} from 'lucide-react';
import { getSession } from '@/lib/services/auth-service';
import {
  verificarDisponibilidade, criarReserva,
  NUCLEOS, type Acomodacao,
} from '@/lib/services/reservas-service';

/* ─── Types ───────────────────────────────────────────── */

const STEP_LABELS = ['Núcleo', 'Datas', 'Acomodação', 'Confirmar'];

/* ─── Nova Reserva Page ───────────────────────────────── */

export default function NovaReservaPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedNucleo, setSelectedNucleo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [selectedAcomodacao, setSelectedAcomodacao] = useState<Acomodacao | null>(null);
  const [numHospedes, setNumHospedes] = useState(1);
  const [observacoes, setObservacoes] = useState('');
  const [loadingDispo, setLoadingDispo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getNucleoInfo = (id: string) => NUCLEOS.find((n) => n.id === id);

  // Today for min date
  const today = new Date().toISOString().split('T')[0];

  /* Step 2: check availability when dates are set */
  const checkAvailability = useCallback(async () => {
    if (!selectedNucleo || !checkIn || !checkOut) return;
    setLoadingDispo(true);
    setError('');
    try {
      const available = await verificarDisponibilidade(selectedNucleo, checkIn, checkOut);
      setAcomodacoes(available);
    } catch {
      setError('Erro ao verificar disponibilidade.');
    }
    setLoadingDispo(false);
  }, [selectedNucleo, checkIn, checkOut]);

  useEffect(() => {
    if (step === 2 && checkIn && checkOut) {
      checkAvailability(); // eslint-disable-line react-hooks/set-state-in-effect -- async data fetch
    }
  }, [step, checkAvailability, checkIn, checkOut]);

  /* Submit reservation */
  const handleSubmit = useCallback(async () => {
    const s = getSession();
    if (!s || !selectedAcomodacao) return;

    setSubmitting(true);
    setError('');
    try {
      const result = await criarReserva({
        associado_id: s.id,
        acomodacao_id: selectedAcomodacao.id,
        nucleo_id: selectedNucleo,
        check_in: checkIn,
        check_out: checkOut,
        num_hospedes: numHospedes,
        observacoes: observacoes || undefined,
      });

      if (result.ok) {
        setSuccess(true);
      } else {
        setError(result.error || 'Erro ao criar reserva.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    }
    setSubmitting(false);
  }, [selectedAcomodacao, selectedNucleo, checkIn, checkOut, numHospedes, observacoes]);

  /* Navigation */
  const canGoNext = (): boolean => {
    switch (step) {
      case 0: return !!selectedNucleo;
      case 1: return !!checkIn && !!checkOut && checkOut > checkIn;
      case 2: return !!selectedAcomodacao;
      case 3: return numHospedes > 0;
      default: return false;
    }
  };

  /* ─── Success Screen ─── */
  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}
          >
            <PartyPopper size={36} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reserva Enviada!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Sua reserva foi registrada com sucesso. Aguarde a aprovação da administração.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/area-do-associado/reservas')}
              className="px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:shadow-xl"
              style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
            >
              Ver Minhas Reservas
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setStep(0);
                setSelectedNucleo('');
                setCheckIn('');
                setCheckOut('');
                setSelectedAcomodacao(null);
                setNumHospedes(1);
                setObservacoes('');
              }}
              className="px-6 py-3 rounded-xl text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Nova Reserva
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Nova Reserva
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Reserve sua estadia em um dos nossos núcleos de lazer.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? 'text-white'
                    : i === step
                    ? 'text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
                style={
                  i <= step
                    ? { backgroundColor: 'var(--color-primary)' }
                    : undefined
                }
              >
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  i <= step ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-8 h-0.5 shrink-0 ${
                  i < step ? '' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={i < step ? { backgroundColor: 'var(--color-primary)' } : undefined}
              />
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400"
        >
          {error}
        </motion.div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ─── Step 1: Select Nucleo ─── */}
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {NUCLEOS.map((nucleo) => {
                const isSelected = selectedNucleo === nucleo.id;
                return (
                  <button
                    key={nucleo.id}
                    onClick={() => setSelectedNucleo(nucleo.id)}
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? 'bg-white dark:bg-gray-900 shadow-lg'
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                    style={isSelected ? { borderColor: 'var(--color-primary)' } : undefined}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        <CheckCircle size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}
                    >
                      <TreePalm size={24} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{nucleo.nome}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin size={12} />
                      {nucleo.local}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* ─── Step 2: Select Dates ─── */}
          {step === 1 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Selecione as Datas
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Núcleo: {getNucleoInfo(selectedNucleo)?.nome}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Check-in
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && e.target.value >= checkOut) setCheckOut('');
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Check-out
                  </label>
                  <input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                  />
                </div>
              </div>

              {checkIn && checkOut && checkOut <= checkIn && (
                <p className="mt-3 text-sm text-red-500">A data de check-out deve ser posterior ao check-in.</p>
              )}

              {checkIn && checkOut && checkOut > checkIn && (
                <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CalendarDays size={16} />
                  {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} diárias
                </div>
              )}
            </div>
          )}

          {/* ─── Step 3: Select Acomodacao ─── */}
          {step === 2 && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Acomodações Disponíveis
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getNucleoInfo(selectedNucleo)?.nome} | {checkIn && new Date(checkIn + 'T00:00:00').toLocaleDateString('pt-BR')} - {checkOut && new Date(checkOut + 'T00:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>

              {loadingDispo ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 size={28} className="animate-spin text-gray-400" />
                </div>
              ) : acomodacoes.length === 0 ? (
                <div className="text-center py-16">
                  <Home size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 font-medium">Nenhuma acomodação disponível neste período.</p>
                  <p className="text-sm text-gray-400 mt-1">Tente outras datas ou outro núcleo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {acomodacoes.map((acomodacao) => {
                    const isSelected = selectedAcomodacao?.id === acomodacao.id;
                    return (
                      <button
                        key={acomodacao.id}
                        onClick={() => setSelectedAcomodacao(acomodacao)}
                        className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                          isSelected
                            ? 'bg-white dark:bg-gray-900 shadow-lg'
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                        style={isSelected ? { borderColor: 'var(--color-primary)' } : undefined}
                      >
                        {isSelected && (
                          <div
                            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                          >
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        )}
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{acomodacao.nome}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{acomodacao.tipo}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                            <Users size={12} />
                            {acomodacao.capacidade} pessoas
                          </span>
                          {acomodacao.pcd && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-xs font-medium text-blue-600 dark:text-blue-400">
                              <Accessibility size={12} />
                              PcD
                            </span>
                          )}
                          {acomodacao.pet_friendly && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-xs font-medium text-amber-600 dark:text-amber-400">
                              <PawPrint size={12} />
                              Pet
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─── Step 4: Confirm ─── */}
          {step === 3 && selectedAcomodacao && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Confirmar Reserva
              </h3>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <MapPin size={18} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Núcleo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{getNucleoInfo(selectedNucleo)?.nome}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <Home size={18} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Acomodação</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedAcomodacao.nome} ({selectedAcomodacao.tipo})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <CalendarDays size={18} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Período</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(checkIn + 'T00:00:00').toLocaleDateString('pt-BR')} - {new Date(checkOut + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <Clock size={18} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Horários</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Check-in: 14:00 | Check-out: 12:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                  <Info size={16} className="shrink-0 mt-0.5" />
                  Política de cancelamento: Cancelamento gratuito até 7 dias antes do check-in. Após esse prazo, será cobrada 1 diária como taxa.
                </p>
              </div>

              {/* Guests */}
              <div className="mb-4">
                <label htmlFor="num-hospedes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Número de Hóspedes
                </label>
                <input
                  id="num-hospedes"
                  type="number"
                  min={1}
                  max={selectedAcomodacao.capacidade}
                  value={numHospedes}
                  onChange={(e) => setNumHospedes(Math.max(1, Math.min(selectedAcomodacao.capacidade, parseInt(e.target.value) || 1)))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                />
                <p className="text-xs text-gray-400 mt-1">Capacidade máxima: {selectedAcomodacao.capacidade} pessoas</p>
              </div>

              {/* Observations */}
              <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Observações (opcional)
                </label>
                <textarea
                  id="observacoes"
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Alguma observação especial..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all"
                  style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            step === 0
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600'
          }`}
        >
          <ChevronLeft size={16} />
          Voltar
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canGoNext()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl"
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
          >
            Próximo
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !canGoNext()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl"
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Confirmar Reserva
                <ArrowRight size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
