'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Mail, Phone, ChevronDown, MessageCircle,
  UserCircle, Shield, TreePalm, Building2, Briefcase,
  Heart, Stethoscope, Pill, Calendar, Newspaper, Landmark,
  FileText, Camera, Users, Info, MapPin, Clock, Instagram, Facebook,
} from 'lucide-react';
import { CONTACT } from '@/lib/config/contact';

/* ─── Types ─────────────────────────────────────────────── */

interface NavChild {
  href: string;
  label: string;
  icon?: React.ElementType;
  desc?: string;
  external?: boolean;
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
      { href: '/historia/index.html', label: 'Museu AES', icon: Landmark, desc: 'Conheça a nossa história', external: true },
      { href: '/sobre/administracao', label: 'Administração', icon: Building2, desc: 'Corpo administrativo' },
      { href: '/representantes', label: 'Representantes', icon: Users, desc: 'Representantes regionais' },
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
  { href: '/contato', label: 'Contato' },
  { href: '/associe-se', label: 'Associe-se' },
];

/* ─── Mega menu dropdown ───────────────────────────────── */

function MegaDropdown({ item, isOpen, onOpen, onClose }: {
  item: NavItem; isOpen: boolean; onOpen: () => void; onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose} onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
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
                const cls = "group flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors";
                const inner = (
                  <>
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
                  </>
                );
                return child.external ? (
                  <a key={child.href} href={child.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link key={child.href} href={child.href} onClick={onClose} className={cls}>
                    {inner}
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
                const cls = "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors";
                const inner = (<>{Icon && <Icon size={15} style={{ color: 'var(--color-primary)' }} />}<span>{child.label}</span></>);
                return child.external ? (
                  <a key={child.href} href={child.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={cls}>{inner}</a>
                ) : (
                  <Link key={child.href} href={child.href} onClick={onNavigate} className={cls}>{inner}</Link>
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

  // Fechamento do mega-menu centralizado (um timeout só) — evita que o timeout
  // pendente de um item derrube o dropdown recém-aberto de outro (bug do hover
  // que "não resetava" ao sair e voltar).
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = useCallback((href: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenDropdown(href);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  }, []);
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="w-full">
      {/* ── Bar 1: logo, address, social ──
          Tudo numa linha só. Em 1920px o layout antigo (endereço empilhado em
          3 linhas à esquerda + grid 2×2 de contatos à direita, com
          justify-between) deixava ~1000px de vazio no meio e ~92px de altura.
          Aqui o endereço é flex-1 e ocupa esse meio, os contatos viram fileira,
          e a faixa cai para ~60px (logo h-11 = 44px + py-2). A altura passa a
          ser regida pelo logo, não mais pelas 3 linhas de endereço.
          Os ícones já separam visualmente os itens,
          então não há divisores — que quebrariam no wrap. */}
      <div style={{ backgroundColor: 'var(--color-brand-surface)' }}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
          <Link href="/" className="shrink-0">
            <Image src="/images/aes-logo-white.svg" alt="AES" width={150} height={58} className="object-contain h-10 w-auto sm:h-11" priority />
          </Link>

          <div className="hidden md:flex flex-1 flex-wrap items-center gap-x-6 gap-y-1 text-white/75 text-xs border-l border-white/15 pl-5 lg:pl-8">
            <span className="flex items-center gap-1.5"><MapPin size={13} className="shrink-0 text-white/50" /> Rua Correia de Andrade, 232 - Brás - São Paulo/SP 1º Andar - CEP: 03008-020</span>
            <span className="flex items-center gap-1.5"><Phone size={13} className="shrink-0 text-white/50" /> Tel. 3367-9900</span>
            <span className="flex items-center gap-1.5"><Clock size={13} className="shrink-0 text-white/50" /> Expediente: 2ª a 6ª Feira, das 07h às 17h</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm shrink-0">
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <MessageCircle size={16} className="text-white" /> WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Mail size={16} className="text-white" /> E-mail
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Instagram size={16} className="text-white" /> Instagram
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Facebook size={16} className="text-white" /> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* ── Bar 3: main nav ── */}
      <div className="relative">
      {/* Fundo 100% opaco, igual ao da Bar 1. Com alpha < 1 (o antigo
          color-mix 95% + backdrop-blur) os 5% restantes compõem com o body
          (branco no claro, gray-950 no escuro), então as duas faixas
          declaravam a mesma cor e renderizavam tons diferentes — emendava.

          Sem sombra: a faixa tem que emendar sem costura com o banner logo
          abaixo, e qualquer sombra desenha justamente a linha de separação
          que ela deveria disfarçar. */}
      <div className="sticky top-0 z-50" style={{ backgroundColor: 'var(--color-brand-surface)' }}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <MegaDropdown key={item.href} item={item}
                    isOpen={openDropdown === item.href}
                    onOpen={() => openMenu(item.href)}
                    onClose={scheduleClose} />
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
              <a href={CONTACT.associadoPortal} target="_blank" rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <UserCircle size={16} /> Área do Associado
              </a>
              <Link href="/admin"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all">
                <Shield size={20} />
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
              className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm" onClick={closeMobile} />
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
      </div>
    </header>
  );
}
