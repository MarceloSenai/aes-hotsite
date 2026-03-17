'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeManager, ThemeConfig, DEFAULT_THEME } from '@/lib/design/theme-system';
import { DesignManager, DesignLayoutId } from '@/lib/design/design-system';

interface ThemeContextValue {
  theme: ThemeConfig;
  designLayout: DesignLayoutId;
  setTheme: (theme: ThemeConfig) => void;
  setDesignLayout: (layout: DesignLayoutId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  designLayout: 'moderno',
  setTheme: () => {},
  setDesignLayout: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyCSSVariables(theme: ThemeConfig) {
  const cssVars = ThemeManager.generateCSSVariables(theme);
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(DEFAULT_THEME);
  const [designLayout, setDesignLayoutState] = useState<DesignLayoutId>('moderno');
  const [mounted, setMounted] = useState(false);

  // Load saved theme + design on mount
  useEffect(() => {
    const load = async () => {
      const savedTheme = await ThemeManager.getActiveTheme();
      const themeToApply = savedTheme || DEFAULT_THEME;
      setThemeState(themeToApply);
      applyCSSVariables(themeToApply);

      const savedLayout = DesignManager.getActiveLayout();
      setDesignLayoutState(savedLayout);

      setMounted(true);
    };
    load();
  }, []);

  // Listen for storage changes (cross-tab sync + admin page updates)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'aes-theme-config' && e.newValue) {
        try {
          const newTheme = JSON.parse(e.newValue) as ThemeConfig;
          setThemeState(newTheme);
          applyCSSVariables(newTheme);
        } catch { /* ignore parse errors */ }
      }
      if (e.key === 'aes-design-layout' && e.newValue) {
        setDesignLayoutState(e.newValue as DesignLayoutId);
      }
    };

    // Custom event for same-tab updates (admin page)
    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.theme) {
        setThemeState(detail.theme);
        applyCSSVariables(detail.theme);
      }
      if (detail?.design) {
        setDesignLayoutState(detail.design);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('aes-theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('aes-theme-change', handleThemeChange);
    };
  }, []);

  const setTheme = useCallback((newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    applyCSSVariables(newTheme);
    ThemeManager.saveTheme(newTheme);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: newTheme } }));
  }, []);

  const setDesignLayout = useCallback((layout: DesignLayoutId) => {
    setDesignLayoutState(layout);
    DesignManager.saveLayout(layout);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { design: layout } }));
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, designLayout, setTheme, setDesignLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}
