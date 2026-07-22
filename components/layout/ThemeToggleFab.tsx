'use client';

import { Sun, Moon } from 'lucide-react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

/**
 * Atalho flutuante de tema (claro/escuro) no canto inferior direito, logo acima
 * do botão de acessibilidade. A animação de transição é disparada pelo próprio
 * AccessibilityProvider.setDarkMode (classe .theme-anim), então funciona também
 * pelo toggle dentro do painel de acessibilidade.
 */
export default function ThemeToggleFab() {
  const { darkMode, setDarkMode } = useAccessibility();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={darkMode}
      className="fixed right-4 bottom-[76px] z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-gray-800 dark:text-gray-100 dark:ring-white/10"
    >
      {darkMode ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
