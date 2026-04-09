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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AccessibilitySettings>;
        setSettings((prev) => ({ ...prev, ...parsed })); // eslint-disable-line react-hooks/set-state-in-effect -- localStorage hydration
      }
    } catch { /* ignore */ }
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
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

  // VLibras — button opens local HTML page with VLibras widget as popup
  useEffect(() => {
    if (!mounted) return;
    const VLIBRAS_ID = 'vlibras-btn';

    if (settings.vlibras) {
      if (!document.getElementById(VLIBRAS_ID)) {
        const btn = document.createElement('button');
        btn.id = VLIBRAS_ID;
        btn.title = 'Abrir VLibras - Tradutor de Libras';
        btn.style.cssText = 'position:fixed;bottom:80px;left:16px;z-index:9000;width:56px;height:56px;border-radius:50%;background:#1B72C0;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.25);cursor:pointer;transition:transform 0.2s;border:none;';
        btn.innerHTML = '<span style="color:white;font-weight:bold;font-size:11px;line-height:1;text-align:center;">🤟<br>Libras</span>';
        btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';
        btn.onclick = () => {
          // Extract text from current page
          const main = document.querySelector('main');
          const pageTitle = document.title;
          const textContent = (main || document.body).innerText
            .replace(/\n{3,}/g, '\n\n')
            .substring(0, 5000);
          const pageUrl = window.location.pathname;

          // Build dynamic VLibras page with current content
          const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VLibras - ${pageTitle}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc}.header{background:#1e3a8a;color:white;padding:16px 24px;text-align:center}.header h1{font-size:16px;font-weight:600}.header p{font-size:12px;opacity:0.8;margin-top:4px}.content{max-width:800px;margin:20px auto;padding:0 24px}.info{background:white;border-radius:12px;padding:20px;border:1px solid #e2e8f0;margin-bottom:12px}.info h2{font-size:15px;color:#1e293b;margin-bottom:8px}.info p,.info div{font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap}.tip{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;font-size:12px;color:#1e40af}</style></head><body><div class="header"><h1>🤟 VLibras - Tradutor de Libras</h1><p>${pageTitle}</p></div><div class="content"><div class="tip">💡 Clique no ícone azul do VLibras (canto inferior direito) e selecione qualquer texto abaixo para ver a tradução em Libras.</div><div class="info" style="margin-top:12px"><h2>Página: ${pageUrl}</h2><div>${textContent}</div></div></div><div vw class="enabled"><div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div></div><script src="https://vlibras.gov.br/app/vlibras-plugin.js"><\/script><script>new window.VLibras.Widget("https://vlibras.gov.br/app");<\/script></body></html>`;

          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          window.open(url, 'vlibras', 'width=900,height=700,scrollbars=yes,resizable=yes');
        };
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
