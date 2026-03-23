'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FontSize = 'normal' | 'large' | 'extra-large';
export type ColorMode = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

interface AccessibilitySettings {
  fontSize: FontSize;
  colorMode: ColorMode;
  monochrome: boolean;
  highContrast: boolean;
  vlibras: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  lineSpacing: boolean;
}

interface AccessibilityContextValue extends AccessibilitySettings {
  setFontSize: (size: FontSize) => void;
  setColorMode: (mode: ColorMode) => void;
  setMonochrome: (on: boolean) => void;
  setHighContrast: (on: boolean) => void;
  setVlibras: (on: boolean) => void;
  setDarkMode: (on: boolean) => void;
  setReducedMotion: (on: boolean) => void;
  setLineSpacing: (on: boolean) => void;
  resetAll: () => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'aes-accessibility';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  colorMode: 'normal',
  monochrome: false,
  highContrast: false,
  vlibras: false,
  darkMode: false,
  reducedMotion: false,
  lineSpacing: false,
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AccessibilityContext = createContext<AccessibilityContextValue>({
  ...DEFAULT_SETTINGS,
  setFontSize: () => {},
  setColorMode: () => {},
  setMonochrome: () => {},
  setHighContrast: () => {},
  setVlibras: () => {},
  setDarkMode: () => {},
  setReducedMotion: () => {},
  setLineSpacing: () => {},
  resetAll: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

/* ------------------------------------------------------------------ */
/*  Font scale map                                                     */
/* ------------------------------------------------------------------ */

const FONT_SCALE: Record<FontSize, number> = {
  'normal': 1,
  'large': 1.15,
  'extra-large': 1.3,
};

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export default function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  // Load saved settings
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AccessibilitySettings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  // Persist settings
  const persist = useCallback((next: AccessibilitySettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
  }, []);

  // Apply settings to DOM
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;

    // Font size
    html.style.fontSize = `${FONT_SCALE[settings.fontSize] * 100}%`;

    // CSS classes on <html>
    html.classList.toggle('a11y-monochrome', settings.monochrome);
    html.classList.toggle('a11y-high-contrast', settings.highContrast);
    html.classList.toggle('a11y-deuteranopia', settings.colorMode === 'deuteranopia');
    html.classList.toggle('a11y-protanopia', settings.colorMode === 'protanopia');
    html.classList.toggle('a11y-tritanopia', settings.colorMode === 'tritanopia');
    html.classList.toggle('a11y-reduced-motion', settings.reducedMotion);
    html.classList.toggle('a11y-line-spacing', settings.lineSpacing);
    html.classList.toggle('dark', settings.darkMode);

    return () => {
      html.style.fontSize = '';
    };
  }, [settings, mounted]);

  // VLibras — fixed button that opens vlibras.gov.br translator
  useEffect(() => {
    if (!mounted) return;
    const VLIBRAS_ID = 'vlibras-btn';

    if (settings.vlibras) {
      if (!document.getElementById(VLIBRAS_ID)) {
        const btn = document.createElement('a');
        btn.id = VLIBRAS_ID;
        btn.href = 'https://vlibras.gov.br/app';
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.title = 'Abrir VLibras - Tradutor de Libras';
        btn.style.cssText = 'position:fixed;bottom:80px;left:16px;z-index:9000;width:56px;height:56px;border-radius:50%;background:#1B72C0;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.25);cursor:pointer;transition:transform 0.2s;text-decoration:none;';
        btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/></svg>';
        btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';
        document.body.appendChild(btn);
      } else {
        const el = document.getElementById(VLIBRAS_ID);
        if (el) el.style.display = 'flex';
      }
    } else {
      const el = document.getElementById(VLIBRAS_ID);
      if (el) el.style.display = 'none';
    }
  }, [settings.vlibras, mounted]);

  // Setter helpers
  const update = useCallback((patch: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  }, [persist]);

  const ctx: AccessibilityContextValue = {
    ...settings,
    setFontSize: (v) => update({ fontSize: v }),
    setColorMode: (v) => update({ colorMode: v }),
    setMonochrome: (v) => update({ monochrome: v }),
    setHighContrast: (v) => update({ highContrast: v }),
    setVlibras: (v) => update({ vlibras: v }),
    setDarkMode: (v) => update({ darkMode: v }),
    setReducedMotion: (v) => update({ reducedMotion: v }),
    setLineSpacing: (v) => update({ lineSpacing: v }),
    resetAll: () => {
      setSettings(DEFAULT_SETTINGS);
      persist(DEFAULT_SETTINGS);
    },
  };

  if (!mounted) return <>{children}</>;

  return (
    <AccessibilityContext.Provider value={ctx}>
      {children}
    </AccessibilityContext.Provider>
  );
}
