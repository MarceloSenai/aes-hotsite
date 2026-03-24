'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Type,
  Contrast,
  Hand,
  RotateCcw,
  ChevronDown,
  Pause,
  AlignJustify,
} from 'lucide-react';
import { useAccessibility, type FontSize, type ColorMode } from '@/components/providers/AccessibilityProvider';

/* ------------------------------------------------------------------ */
/*  Toggle switch                                                      */
/* ------------------------------------------------------------------ */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        checked
          ? 'bg-theme-primary'
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
      style={checked ? { backgroundColor: 'var(--color-primary)' } : undefined}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section card                                                       */
/* ------------------------------------------------------------------ */

function Section({
  icon: Icon,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: iconColor }}
          >
            <Icon size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Font size selector                                                 */
/* ------------------------------------------------------------------ */

const FONT_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Grande' },
  { value: 'extra-large', label: 'Extra Grande' },
];

function FontSizeSelect({
  value,
  onChange,
}: {
  value: FontSize;
  onChange: (v: FontSize) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = FONT_OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        {current.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 z-10 w-36 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg overflow-hidden"
          >
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  opt.value === value
                    ? 'font-semibold text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                style={opt.value === value ? { backgroundColor: 'var(--color-primary)' } : undefined}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color mode selector                                                */
/* ------------------------------------------------------------------ */

const COLOR_MODE_OPTIONS: { value: ColorMode; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
];

function ColorModeSelect({
  value,
  onChange,
}: {
  value: ColorMode;
  onChange: (v: ColorMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = COLOR_MODE_OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        {current.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 z-10 w-40 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg overflow-hidden"
          >
            {COLOR_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  opt.value === value
                    ? 'font-semibold text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                style={opt.value === value ? { backgroundColor: 'var(--color-primary)' } : undefined}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main panel                                                         */
/* ------------------------------------------------------------------ */

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const a11y = useAccessibility();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      // Delay to prevent the button click from immediately closing
      const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handler);
      };
    }
  }, [open]);

  const hasChanges =
    a11y.fontSize !== 'normal' ||
    a11y.colorMode !== 'normal' ||
    a11y.monochrome ||
    a11y.highContrast ||
    a11y.vlibras ||
    a11y.darkMode ||
    a11y.reducedMotion ||
    a11y.lineSpacing;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Acessibilidade"
        aria-expanded={open}
        className={`fixed right-4 bottom-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          open ? 'rotate-0' : ''
        }`}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <Accessibility size={28} />
        {hasChanges && (
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-white" />
        )}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/30"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[9999] w-full max-w-md bg-gray-50 dark:bg-gray-900 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Accessibility size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Acessibilidade</h2>
                  <p className="text-xs text-white/70">
                    Personalize sua experiência
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Fechar painel de acessibilidade"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 space-y-6">
              {/* ── Fonte ── */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                  Fonte
                </h3>
                <Section
                  icon={Type}
                  iconColor="#EF4444"
                  title="Tamanho da fonte"
                  description="Aumentar ou reduzir o tamanho dos textos para melhor leitura."
                >
                  <FontSizeSelect
                    value={a11y.fontSize}
                    onChange={a11y.setFontSize}
                  />
                </Section>
              </div>

              {/* ── Interação e leitura ── */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                  Interação e leitura
                </h3>
                <div className="space-y-3">
                  <Section
                    icon={Hand}
                    iconColor="#3B82F6"
                    title="VLibras"
                    description="Tradutor virtual para Libras (Língua Brasileira de Sinais)."
                  >
                    <Toggle
                      checked={a11y.vlibras}
                      onChange={a11y.setVlibras}
                      label="Ativar VLibras"
                    />
                  </Section>

                  <Section
                    icon={AlignJustify}
                    iconColor="#8B5CF6"
                    title="Espaçamento entre linhas"
                    description="Aumenta o espacamento entre linhas para facilitar a leitura."
                  >
                    <Toggle
                      checked={a11y.lineSpacing}
                      onChange={a11y.setLineSpacing}
                      label="Ativar espacamento entre linhas"
                    />
                  </Section>

                  <Section
                    icon={Pause}
                    iconColor="#F59E0B"
                    title="Reduzir animações"
                    description="Reduz ou desativa animações e transições."
                  >
                    <Toggle
                      checked={a11y.reducedMotion}
                      onChange={a11y.setReducedMotion}
                      label="Reduzir animações"
                    />
                  </Section>
                </div>
              </div>

              {/* ── Visibilidade ── */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                  Opções de visibilidade
                </h3>
                <div className="space-y-3">
                  <Section
                    icon={a11y.darkMode ? Moon : Sun}
                    iconColor="#6366F1"
                    title="Modo escuro"
                    description="Alterna entre tema claro e escuro."
                  >
                    <Toggle
                      checked={a11y.darkMode}
                      onChange={a11y.setDarkMode}
                      label="Ativar modo escuro"
                    />
                  </Section>

                  <Section
                    icon={Eye}
                    iconColor="#10B981"
                    title="Modo daltônico"
                    description="Ajusta as cores para facilitar a visualização."
                  >
                    <ColorModeSelect
                      value={a11y.colorMode}
                      onChange={a11y.setColorMode}
                    />
                  </Section>

                  <Section
                    icon={EyeOff}
                    iconColor="#6B7280"
                    title="Modo monocromático"
                    description="Transforma as cores em tons de cinza para melhor contraste."
                  >
                    <Toggle
                      checked={a11y.monochrome}
                      onChange={a11y.setMonochrome}
                      label="Ativar modo monocromático"
                    />
                  </Section>

                  <Section
                    icon={Contrast}
                    iconColor="#0EA5E9"
                    title="Alto contraste"
                    description="Aumenta o contraste entre textos e fundos."
                  >
                    <Toggle
                      checked={a11y.highContrast}
                      onChange={a11y.setHighContrast}
                      label="Ativar alto contraste"
                    />
                  </Section>
                </div>
              </div>

              {/* ── Reset ── */}
              {hasChanges && (
                <button
                  onClick={a11y.resetAll}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <RotateCcw size={16} />
                  Restaurar configurações padrão
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
              As preferências são salvas automaticamente no seu navegador.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
