'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Mail, Phone, ChevronDown, ChevronRight, MessageCircle,
  UserCircle, Shield, Sun, Moon, TreePalm, Building2, Briefcase,
  Heart, Stethoscope, Pill, Handshake, Calendar, Newspaper, Landmark,
  FileText, Camera, Users, Info,
} from 'lucide-react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

/* ─── Types ─────────────────────────────────────────────── */

interface NavChild {
  href: string;
  label: string;
  icon?: React.ElementType;
  desc?: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

/* ─── Navigation data ──────────────────────────────────── */

const NAV_ITEMS: NavItem[] = [
  {
    href: '/sobre',
    label: 'Institucional',
    children: [
      { href: '/sobre/quem-somos', label: 'Quem Somos', icon: Info, desc: 'Nossa história e missão' },
      { href: '/sobre/administracao', label: 'Administração', icon: Building2, desc: 'Corpo administrativo' },
      { href: '/representantes', label: 'Representantes', icon: Users, desc: 'Conselhos e diretoria' },
      { href: '/associados', label: 'Associados', icon: UserCircle, desc: 'Benefícios e como associar' },
    ],
  },
  {
    href: '/nucleo-de-lazer',
    label: 'Lazer',
    children: [
      { href: '/nucleo-de-lazer/clube-de-campo', label: 'Clube de Campo', icon: TreePalm, desc: 'Jundiaí/SP' },
      { href: '/nucleo-de-lazer/clube-nautico', label: 'Clube Náutico', icon: TreePalm, desc: 'Boracéia/SP' },
      { href: '/nucleo-de-lazer/colonia-de-ferias', label: 'Colônia de Férias', icon: TreePalm, desc: 'Itanhaém/SP' },
    ],
  },
  {
    href: '/servicos',
    label: 'Serviços',
    children: [
      { href: '/servicos/assistencia-medica', label: 'Assistência Médica', icon: Stethoscope, desc: 'Planos UNIMED' },
      { href: '/servicos/assistencia-odontologica', label: 'Assistência Odontológica', icon: Heart, desc: 'Planos MetLife' },
      { href: '/servicos/fundo-mutuo', label: 'Fundo Mútuo', icon: Shield, desc: 'FUMUS e FUMUA' },
      { href: '/servicos/farmacias', label: 'Farmácias', icon: Pill, desc: 'System Farma' },
      { href: '/servicos/seguros', label: 'Seguros', icon: Briefcase, desc: 'Vida, residencial e auto' },
    ],
  },
  { href: '/parcerias', label: 'Parcerias' },
  {
    href: '/informacoes',
    label: 'Informações',
    children: [
      { href: '/calendario', label: 'Calendário de Eventos', icon: Calendar, desc: 'Programação 2026' },
      { href: '/boletim', label: 'Boletim Informativo', icon: Newspaper, desc: 'Edições e novidades' },
      { href: '/indusprev', label: 'INDUSPREV', icon: Landmark, desc: 'Previdência complementar' },
      { href: '/documentos', label: 'Documentos', icon: FileText, desc: 'Comunicados e estatutos' },
      { href: '/galeria', label: 'Galeria de Fotos', icon: Camera, desc: 'Eventos e núcleos' },
    ],
  },
  { href: '/associe-se', label: 'Associe-se' },
];

/* ─── Mega menu dropdown ───────────────────────────────── */

function MegaDropdown({ item, isOpen, onOpen, onClose }: {
  item: NavItem; isOpen: boolean; onOpen: () => void; onClose: () => void;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); onOpen(); };
  const handleLeave = () => { timeoutRef.current = setTimeout(onClose, 180); };
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <button
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isOpen ? 'text-white bg-white/15' : 'text-white/85 hover:text-white hover:bg-white/10'
        }`}
        onClick={onOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          >
            <div role="menu" className="min-w-[280px] rounded-xl bg-white dark:bg-gray-800 shadow-2xl shadow-black/15 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden p-2">
              {item.children.map((child) => {
                const Icon = child.icon;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="group flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {Icon && (
                      <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
                        <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-gray-900">{child.label}</span>
                      {child.desc && (
                        <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">{child.desc}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile accordion ─────────────────────────────────── */

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.href} onClick={onNavigate}
        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
          item.label === 'Associe-se'
            ? 'text-white mt-2'
            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
        style={item.label === 'Associe-se' ? { backgroundColor: 'var(--color-primary)' } : undefined}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        {item.label}
        <ChevronDown size={18} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-3 pb-1 space-y-0.5">
              {item.children.map((child) => {
                const Icon = child.icon;
                return (
                  <Link key={child.href} href={child.href} onClick={onNavigate}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    {Icon && <Icon size={15} style={{ color: 'var(--color-primary)' }} />}
                    <span>{child.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Header ───────────────────────────────────────────── */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const a11y = useAccessibility();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-xl shadow-black/10' : ''}`}>
      {/* ── Top bar ── */}
      <div className="text-white/90 text-xs" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="tel:+551133679900" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} /> (11) 3367-9900
            </a>
            <a href="https://wa.me/551133679900" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MessageCircle size={12} /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href="mailto:gerente@aessenai.org.br" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} /> Email
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => a11y.setDarkMode(!a11y.darkMode)} className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label={a11y.darkMode ? 'Modo claro' : 'Modo escuro'}>
              {a11y.darkMode ? <Sun size={13} /> : <Moon size={13} />}
              <span className="hidden sm:inline">{a11y.darkMode ? 'Claro' : 'Escuro'}</span>
            </button>
            <span className="w-px h-3 bg-white/20" />
            <a href="https://associado.aessenai.org.br" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors">
              <UserCircle size={13} /> Área do Associado
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="backdrop-blur-md" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 95%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-11 lg:h-11">
                <Image src="/images/aes-logo.png" alt="AES" fill
                  className="object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-200" priority />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="block text-white font-bold text-base tracking-tight">AES</span>
                <span className="block text-white/60 text-[10px] font-medium">Associação dos Empregados do SENAI</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <MegaDropdown key={item.href} item={item}
                    isOpen={openDropdown === item.href}
                    onOpen={() => setOpenDropdown(item.href)}
                    onClose={() => setOpenDropdown(null)} />
                ) : item.label === 'Associe-se' ? (
                  <Link key={item.href} href={item.href}
                    className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 rounded-lg transition-all duration-200 border border-white/20">
                    {item.label}
                  </Link>
                ) : (
                  <Link key={item.href} href={item.href}
                    className="px-3 py-2 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <Link href="/admin"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all">
                <Shield size={13} />
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={mobileOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 top-24 bg-black/50 z-40 xl:hidden backdrop-blur-sm" onClick={closeMobile} />
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-full z-50 xl:hidden bg-white dark:bg-gray-900 shadow-2xl max-h-[calc(100dvh-96px)] overflow-y-auto rounded-b-2xl">
              <nav className="px-3 py-4 space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem key={item.href} item={item} onNavigate={closeMobile} />
                ))}
              </nav>
              <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4">
                <a href="https://associado.aessenai.org.br" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
                  <UserCircle size={18} /> Área do Associado
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
