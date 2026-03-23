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

  // VLibras — use standalone iframe approach (works with SPAs)
  useEffect(() => {
    if (!mounted) return;
    const VLIBRAS_ID = 'vlibras-iframe-widget';

    if (settings.vlibras) {
      if (!document.getElementById(VLIBRAS_ID)) {
        // Create a standalone iframe that loads VLibras independently
        const container = document.createElement('div');
        container.id = VLIBRAS_ID;
        container.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9000;';
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'width:100%;height:100%;border:none;pointer-events:auto;';
        iframe.setAttribute('allow', 'microphone');
        iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:transparent;overflow:hidden}</style></head><body><div vw class="enabled"><div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div></div><script src="https://vlibras.gov.br/app/vlibras-plugin.js"><\/script><script>new window.VLibras.Widget("https://vlibras.gov.br/app");<\/script></body></html>`;
        container.appendChild(iframe);
        document.body.appendChild(container);
      } else {
        const el = document.getElementById(VLIBRAS_ID);
        if (el) el.style.display = '';
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
