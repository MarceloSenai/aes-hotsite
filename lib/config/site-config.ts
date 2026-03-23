/**
 * Site configuration — editable from admin panel.
 * Stored in localStorage, Supabase-ready.
 */

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

export interface SiteConfig {
  socialLinks: SocialLink[];
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  address: string;
  workingHours: string;
  emails: {
    label: string;
    email: string;
  }[];
}

const STORAGE_KEY = 'aes-site-config';

export const DEFAULT_CONFIG: SiteConfig = {
  socialLinks: [
    { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com/aessenai', enabled: true },
    { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com/aessenai', enabled: true },
    { id: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/aessenai', enabled: true },
    { id: 'whatsapp', platform: 'WhatsApp', url: 'https://wa.me/551133679900', enabled: true },
  ],
  contactPhone: '(11) 3367-9900',
  contactWhatsApp: 'https://wa.me/551133679900',
  contactEmail: 'gerente@aessenai.org.br',
  address: 'Rua Correia de Andrade, 232\nBrás, São Paulo - SP\nCEP 03008-020',
  workingHours: 'Seg-Sex 7:00 - 17:00',
  emails: [
    { label: 'Gerente', email: 'gerente@aessenai.org.br' },
    { label: 'Cadastro / Odonto / TotalPass', email: 'cadastro@aessenai.org.br' },
    { label: 'Planos de Saúde', email: 'rh@aessenai.org.br' },
    { label: 'Boletos e Cobranças', email: 'cobranca@aessenai.org.br' },
    { label: 'Contas a Receber', email: 'boletim.aes@aessenai.org.br' },
    { label: 'Contas a Pagar', email: 'financeiro@aessenai.org.br' },
  ],
};

export class SiteConfigManager {
  static getConfig(): SiteConfig {
    if (typeof window === 'undefined') return DEFAULT_CONFIG;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch { /* ignore */ }
    return DEFAULT_CONFIG;
  }

  static saveConfig(config: SiteConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new CustomEvent('aes-config-change', { detail: config }));
    } catch { /* ignore */ }
  }

  static resetConfig(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('aes-config-change', { detail: DEFAULT_CONFIG }));
    } catch { /* ignore */ }
  }
}
