/**
 * AES Design System - Layout Templates
 * Different visual layouts for the site with real preview support
 */

export type DesignLayoutId = 'institucional' | 'moderno' | 'elegante' | 'dinamico';

export interface DesignLayout {
  id: DesignLayoutId;
  name: string;
  description: string;
  heroStyle: 'split' | 'centered' | 'fullwidth' | 'minimal';
  cardStyle: 'bordered' | 'elevated' | 'flat' | 'glass';
  navStyle: 'classic' | 'modern' | 'minimal' | 'bold';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  fontWeight: 'light' | 'normal' | 'bold';
  animation: 'subtle' | 'moderate' | 'dramatic';
  preview: {
    heroGradient: string;
    cardBg: string;
    accentColor: string;
    textColor: string;
  };
}

export const DESIGN_LAYOUTS: Record<DesignLayoutId, DesignLayout> = {
  institucional: {
    id: 'institucional',
    name: 'Institucional',
    description: 'Layout corporativo limpo e profissional. Ideal para transmitir seriedade e confiança.',
    heroStyle: 'split',
    cardStyle: 'bordered',
    navStyle: 'classic',
    sectionSpacing: 'normal',
    borderRadius: 'small',
    fontWeight: 'normal',
    animation: 'subtle',
    preview: {
      heroGradient: 'from-emerald-800 to-emerald-900',
      cardBg: 'bg-white border border-gray-200',
      accentColor: '#059669',
      textColor: '#1f2937',
    },
  },
  moderno: {
    id: 'moderno',
    name: 'Moderno',
    description: 'Cards com gradientes, sombras e efeitos visuais ricos. Visual contemporâneo e impactante.',
    heroStyle: 'centered',
    cardStyle: 'elevated',
    navStyle: 'modern',
    sectionSpacing: 'spacious',
    borderRadius: 'large',
    fontWeight: 'bold',
    animation: 'moderate',
    preview: {
      heroGradient: 'from-green-500 via-emerald-600 to-teal-700',
      cardBg: 'bg-white shadow-xl rounded-2xl',
      accentColor: '#10b981',
      textColor: '#111827',
    },
  },
  elegante: {
    id: 'elegante',
    name: 'Elegante',
    description: 'Tipografia refinada, espaçamento generoso. Minimalista e sofisticado.',
    heroStyle: 'minimal',
    cardStyle: 'flat',
    navStyle: 'minimal',
    sectionSpacing: 'spacious',
    borderRadius: 'none',
    fontWeight: 'light',
    animation: 'subtle',
    preview: {
      heroGradient: 'from-gray-900 to-gray-800',
      cardBg: 'bg-gray-50',
      accentColor: '#047857',
      textColor: '#374151',
    },
  },
  dinamico: {
    id: 'dinamico',
    name: 'Dinâmico',
    description: 'Full-width, seções bold com cores vibrantes. Energético e envolvente.',
    heroStyle: 'fullwidth',
    cardStyle: 'glass',
    navStyle: 'bold',
    sectionSpacing: 'compact',
    borderRadius: 'medium',
    fontWeight: 'bold',
    animation: 'dramatic',
    preview: {
      heroGradient: 'from-emerald-500 to-cyan-600',
      cardBg: 'bg-white/80 backdrop-blur-sm border border-white/20',
      accentColor: '#06b6d4',
      textColor: '#0f172a',
    },
  },
};

export class DesignManager {
  private static readonly STORAGE_KEY = 'aes-design-layout';

  static getActiveLayout(): DesignLayoutId {
    if (typeof window === 'undefined') return 'moderno';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored && stored in DESIGN_LAYOUTS) return stored as DesignLayoutId;
    return 'moderno';
  }

  static saveLayout(layoutId: DesignLayoutId): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, layoutId);
    }
  }

  static getLayout(id: DesignLayoutId): DesignLayout {
    return DESIGN_LAYOUTS[id];
  }
}
