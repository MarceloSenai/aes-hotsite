'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  UserCircle,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/sobre',
    label: 'Sobre a AES',
    children: [
      { href: '/sobre/quem-somos', label: 'Quem Somos' },
      { href: '/sobre/administracao', label: 'Administração' },
    ],
  },
  { href: '/representantes', label: 'Representantes' },
  { href: '/associados', label: 'Associados' },
  {
    href: '/departamentos',
    label: 'Departamentos',
    children: [
      { href: '/departamentos/aposentados', label: 'Aposentados' },
      { href: '/departamentos/cultural-recreativo', label: 'Cultural e Recreativo' },
      { href: '/departamentos/esportivo-capital', label: 'Esportivo Capital' },
      { href: '/departamentos/esportivo-interior', label: 'Esportivo Interior' },
    ],
  },
  {
    href: '/documentos',
    label: 'Documentos',
    children: [
      { href: '/documentos/comunicados', label: 'Comunicados' },
      { href: '/documentos/estatuto-regulamentos', label: 'Estatuto e Regulamentos' },
      { href: '/documentos/relatorio-anual', label: 'Relatório Anual' },
      { href: '/documentos/formularios-reembolso', label: 'Formulários de Reembolso' },
    ],
  },
  { href: '/galeria', label: 'Galeria de Fotos' },
  {
    href: '/nucleo-de-lazer',
    label: 'Núcleo de Lazer',
    children: [
      { href: '/nucleo-de-lazer/clube-de-campo', label: 'Clube de Campo' },
      { href: '/nucleo-de-lazer/clube-nautico', label: 'Clube Náutico' },
      { href: '/nucleo-de-lazer/colonia-de-ferias', label: 'Colônia de Férias' },
    ],
  },
  {
    href: '/servicos',
    label: 'Serviços',
    children: [
      { href: '/servicos/assistencia-medica', label: 'Assistência Médica' },
      { href: '/servicos/assistencia-odontologica', label: 'Assistência Odontológica' },
      { href: '/servicos/fundo-mutuo', label: 'Fundo Mútuo' },
      { href: '/servicos/farmacias', label: 'Farmácias' },
      { href: '/servicos/seguros', label: 'Seguros' },
    ],
  },
  { href: '/parcerias', label: 'Parcerias' },
  { href: '/calendario', label: 'Eventos' },
  { href: '/boletim', label: 'Boletim' },
  { href: '/indusprev', label: 'INDUSPREV' },
];

/* ------------------------------------------------------------------ */
/*  Desktop dropdown                                                   */
/* ------------------------------------------------------------------ */

function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
        onClick={onOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div className="min-w-[220px] rounded-lg bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 overflow-hidden">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" style={{ color: 'var(--color-primary)' }} />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile accordion item                                              */
/* ------------------------------------------------------------------ */

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
      >
        {item.label}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <ChevronRight size={14} className="text-theme-primary" />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const a11y = useAccessibility();

  /* Track scroll for shadow effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-black/10' : ''
      }`}
    >
      {/* ── Top bar ── */}
      <div className="text-white" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs sm:text-sm">
          {/* Left: contact */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+551133679900"
              className="hidden sm:flex items-center gap-1.5 hover:text-theme-primary-light transition-colors"
            >
              <Phone size={13} />
              (11) 3367-9900
            </a>
            <a
              href="https://wa.me/551133679900"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-theme-primary-light transition-colors"
            >
              <MessageCircle size={13} />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:contato@aes.org.br"
              className="flex items-center gap-1.5 hover:text-theme-primary-light transition-colors"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>

          {/* Right: quick links */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="https://webmail.aes.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-theme-primary-light transition-colors"
            >
              <Mail size={13} />
              Webmail
            </a>
            <button
              onClick={() => a11y.setDarkMode(!a11y.darkMode)}
              className="flex items-center gap-1.5 hover:text-theme-primary-light transition-colors"
              aria-label={a11y.darkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {a11y.darkMode ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{a11y.darkMode ? 'Claro' : 'Escuro'}</span>
            </button>
            <Link
              href="/area-do-associado"
              className="flex items-center gap-1.5 font-semibold hover:text-theme-primary-light transition-colors"
            >
              <UserCircle size={14} />
              Área do Associado
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/images/aes-logo.svg"
                  alt="AES - Associação dos Empregados do SENAI"
                  fill
                  className="object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-200"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="block text-white font-bold text-base lg:text-lg tracking-tight">
                  AES
                </span>
                <span className="block text-theme-primary-light text-[10px] lg:text-xs font-medium leading-tight">
                  Associação dos Empregados do SENAI
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.href}
                    item={item}
                    isOpen={openDropdown === item.href}
                    onOpen={() => setOpenDropdown(item.href)}
                    onClose={() => setOpenDropdown(null)}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-2.5 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right: Admin + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium hover:text-white rounded-md transition-colors"
                style={{ color: 'color-mix(in srgb, var(--color-primary-light) 70%, transparent)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-primary-dark) 50%, transparent)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = 'color-mix(in srgb, var(--color-primary-light) 70%, transparent)'; }}
                title="Administração"
              >
                <Shield size={14} />
                <span className="hidden 2xl:inline">Admin</span>
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-primary-dark) 50%, transparent)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[100px] bg-black/40 z-40 xl:hidden"
              onClick={closeMobile}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-full z-50 xl:hidden bg-white shadow-2xl shadow-black/10 max-h-[calc(100dvh-100px)] overflow-y-auto"
            >
              {/* Quick links bar (mobile) */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b text-sm"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, white)', borderColor: 'color-mix(in srgb, var(--color-primary-light) 50%, white)' }}
              >
                <a
                  href="https://wa.me/551133679900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium"
                  style={{ color: 'var(--color-primary-dark)' }}
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <span style={{ color: 'var(--color-primary-light)' }}>|</span>
                <a
                  href="tel:+551133679900"
                  className="flex items-center gap-1.5 font-medium"
                  style={{ color: 'var(--color-primary-dark)' }}
                >
                  <Phone size={15} />
                  (11) 3367-9900
                </a>
              </div>

              {/* Nav items */}
              <nav className="px-2 py-3 space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem key={item.href} item={item} onNavigate={closeMobile} />
                ))}
              </nav>

              {/* Mobile footer links */}
              <div className="border-t border-gray-100 px-4 py-4 space-y-2">
                <Link
                  href="/area-do-associado"
                  onClick={closeMobile}
                  className="flex items-center gap-2 px-4 py-3 text-white rounded-lg font-medium text-sm transition-colors justify-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <UserCircle size={18} />
                  Área do Associado
                </Link>
                <Link
                  href="/admin"
                  onClick={closeMobile}
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-gray-700 rounded-lg text-xs transition-colors justify-center"
                >
                  <Shield size={14} />
                  Administração
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
