'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, PlusCircle, User,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { getSession, logout, type Associado } from '@/lib/services/auth-service';

/* ─── Nav items ───────────────────────────────────────── */

const NAV_ITEMS = [
  { href: '/area-do-associado', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/area-do-associado/reservas', label: 'Minhas Reservas', icon: CalendarDays },
  { href: '/area-do-associado/nova-reserva', label: 'Nova Reserva', icon: PlusCircle },
  { href: '/area-do-associado/meu-cadastro', label: 'Meu Cadastro', icon: User },
];

/* ─── Tipo badge colors ───────────────────────────────── */

function tipoBadgeClass(tipo: string): string {
  switch (tipo.toLowerCase()) {
    case 'titular': return 'bg-emerald-500/20 text-emerald-400';
    case 'dependente': return 'bg-blue-500/20 text-blue-400';
    case 'agregado': return 'bg-amber-500/20 text-amber-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}

/* ─── User initials ───────────────────────────────────── */

function getInitials(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/* ─── Layout ──────────────────────────────────────────── */

export default function AssociadoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session] = useState<Associado | null>(() => getSession());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!session) router.replace('/login');
  }, [session, router]);

  // Close sidebar on navigation
  useEffect(() => {
    if (sidebarOpen) setSidebarOpen(false); // eslint-disable-line react-hooks/set-state-in-effect -- intentional reset on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace('/login');
  }, [router]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}
          />
          <span className="text-sm text-gray-500">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-gray-900 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/images/aes-logo.png"
                alt="AES"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-bold text-sm">AES</span>
              <span className="block text-gray-500 text-[10px]">Área do Associado</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {getInitials(session.nome)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.nome}</p>
              <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${tipoBadgeClass(session.tipo)}`}>
                {session.tipo}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                style={isActive ? { backgroundColor: 'var(--color-primary)' } : undefined}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image src="/images/aes-logo.png" alt="AES" fill className="object-contain" />
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-white">AES</span>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {getInitials(session.nome)}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
