'use client';

import { useEffect, useState } from 'react';
import { ThemeManager, DEFAULT_THEME } from '@/lib/design/theme-system';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadAndApplyTheme = async () => {
      const savedTheme = await ThemeManager.getActiveTheme();
      const themeToApply = savedTheme || DEFAULT_THEME;

      // Generate and apply CSS variables
      const cssVars = ThemeManager.generateCSSVariables(themeToApply);
      Object.entries(cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      setMounted(true);
    };

    loadAndApplyTheme();
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
