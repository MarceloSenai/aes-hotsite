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

  // VLibras widget
  useEffect(() => {
    if (!mounted) return;

    if (settings.vlibras) {
      if (!document.getElementById('vlibras-container')) {
        // 1. Create container FIRST (must exist before script loads)
        const div = document.createElement('div');
        div.id = 'vlibras-container';
        div.setAttribute('vw', '');
        div.className = 'enabled';
        div.innerHTML = `<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>`;
        document.body.appendChild(div);

        // 2. Load script AFTER container exists
        const script = document.createElement('script');
        script.id = 'vlibras-script';
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.async = true;
        script.onload = () => {
          // @ts-expect-error VLibras global
          if (window.VLibras) {
            // @ts-expect-error VLibras global
            new window.VLibras.Widget('https://vlibras.gov.br/app');
          }
        };
        document.body.appendChild(script);
      } else {
        // Show existing widget
        const container = document.getElementById('vlibras-container');
        if (container) container.style.display = '';
        // Also show the access button
        const btn = document.querySelector('[vw-access-button]') as HTMLElement;
        if (btn) btn.style.display = '';
      }
    } else {
      // Hide widget
      const container = document.getElementById('vlibras-container');
      if (container) container.style.display = 'none';
      const btn = document.querySelector('[vw-access-button]') as HTMLElement;
      if (btn) btn.style.display = 'none';
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
