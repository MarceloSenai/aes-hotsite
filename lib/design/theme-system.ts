/**
 * AES-HOTSITE Theme System
 * Interface Design System - Consistent, scalable theming
 * Persistent theme configuration with admin customization
 */

export type ThemeMode = 'light' | 'dark' | 'auto';
export type DesignPersonality = 'modern' | 'classic' | 'minimal' | 'vibrant' | 'professional' | 'educational';

export interface ThemeColors {
  // Primary palette
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Secondary palette
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  // Accent palette (for CTAs, highlights)
  accent: string;
  accentDark: string;
  accentLight: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Neutrals (text, backgrounds, borders)
  foreground: string;
  foregroundMuted: string;
  background: string;
  surface: string;
  border: string;

  // Dark mode overrides
  darkForeground: string;
  darkBackground: string;
  darkSurface: string;
  darkBorder: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  personality: DesignPersonality;
  colors: ThemeColors;
  typography?: {
    fontFamily: string;
    baseFontSize: number;
    headingScale: number;
  };
  spacing?: {
    baseUnit: number; // 4, 8, 16px base
  };
  depth?: 'borders-only' | 'elevation' | 'shadow';
  isActive: boolean;
}

/**
 * Predefined Theme Templates (Interface Design inspired)
 * Each personality has distinct visual characteristics
 */

export const THEME_PRESETS: Record<DesignPersonality, Omit<ThemeConfig, 'id' | 'isActive'>> = {
  // Modern: Bright, energetic, contemporary
  modern: {
    name: 'Moderno',
    personality: 'modern',
    colors: {
      primary: '#10B981', // Verde vibrante
      primaryDark: '#059669',
      primaryLight: '#A7F3D0',
      secondary: '#0EA5E9', // Azul claro
      secondaryDark: '#0284C7',
      secondaryLight: '#BAE6FD',
      accent: '#F59E0B', // Âmbar
      accentDark: '#D97706',
      accentLight: '#FCD34D',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0EA5E9',
      foreground: '#1F2937',
      foregroundMuted: '#6B7280',
      background: '#FFFFFF',
      surface: '#F3F4F6',
      border: '#E5E7EB',
      darkForeground: '#F9FAFB',
      darkBackground: '#111827',
      darkSurface: '#1F2937',
      darkBorder: '#374151',
    },
  },

  // Classic: Timeless, professional, formal
  classic: {
    name: 'Clássico',
    personality: 'classic',
    colors: {
      primary: '#1E40AF', // Azul profundo
      primaryDark: '#1E3A8A',
      primaryLight: '#DBEAFE',
      secondary: '#64748B', // Cinza slate
      secondaryDark: '#475569',
      secondaryLight: '#CBD5E1',
      accent: '#DC2626', // Vermelho
      accentDark: '#B91C1C',
      accentLight: '#FCA5A5',
      success: '#16A34A',
      warning: '#EA8C55',
      error: '#DC2626',
      info: '#0284C7',
      foreground: '#0F172A',
      foregroundMuted: '#64748B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      border: '#E2E8F0',
      darkForeground: '#F1F5F9',
      darkBackground: '#0F172A',
      darkSurface: '#1E293B',
      darkBorder: '#334155',
    },
  },

  // Minimal: Clean, simple, focused
  minimal: {
    name: 'Minimalista',
    personality: 'minimal',
    colors: {
      primary: '#000000',
      primaryDark: '#1F2937',
      primaryLight: '#F3F4F6',
      secondary: '#6B7280',
      secondaryDark: '#374151',
      secondaryLight: '#D1D5DB',
      accent: '#2563EB', // Azul destaque
      accentDark: '#1D4ED8',
      accentLight: '#93C5FD',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      foreground: '#111827',
      foregroundMuted: '#9CA3AF',
      background: '#FFFFFF',
      surface: '#FAFAFA',
      border: '#E5E7EB',
      darkForeground: '#F9FAFB',
      darkBackground: '#0A0A0A',
      darkSurface: '#1A1A1A',
      darkBorder: '#2A2A2A',
    },
  },

  // Vibrant: Bold, colorful, energetic
  vibrant: {
    name: 'Vibrante',
    personality: 'vibrant',
    colors: {
      primary: '#EC4899', // Rosa
      primaryDark: '#BE185D',
      primaryLight: '#FBE7F3',
      secondary: '#8B5CF6', // Roxo
      secondaryDark: '#6D28D9',
      secondaryLight: '#EDE9FE',
      accent: '#06B6D4', // Cyan
      accentDark: '#0891B2',
      accentLight: '#CFFAFE',
      success: '#14B8A6',
      warning: '#F97316',
      error: '#FF6B6B',
      info: '#06B6D4',
      foreground: '#1F2937',
      foregroundMuted: '#6B7280',
      background: '#FFFFFF',
      surface: '#F0F9FF',
      border: '#E0F2FE',
      darkForeground: '#F1F5F9',
      darkBackground: '#0C0A1A',
      darkSurface: '#1A1635',
      darkBorder: '#2D2749',
    },
  },

  // Professional: Corporate, trustworthy, stable
  professional: {
    name: 'Profissional',
    personality: 'professional',
    colors: {
      primary: '#1F2937', // Cinza escuro
      primaryDark: '#111827',
      primaryLight: '#F3F4F6',
      secondary: '#4F46E5', // Índigo
      secondaryDark: '#4338CA',
      secondaryLight: '#E0E7FF',
      accent: '#0D9488', // Teal
      accentDark: '#0F766E',
      accentLight: '#99F6E4',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#2563EB',
      foreground: '#111827',
      foregroundMuted: '#6B7280',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      border: '#E5E7EB',
      darkForeground: '#F3F4F6',
      darkBackground: '#0F172A',
      darkSurface: '#1E293B',
      darkBorder: '#334155',
    },
  },

  // Educational: Warm, approachable, informative
  educational: {
    name: 'Educacional',
    personality: 'educational',
    colors: {
      primary: '#059669', // Verde educacional
      primaryDark: '#047857',
      primaryLight: '#D1FAE5',
      secondary: '#F59E0B', // Âmbar caloroso
      secondaryDark: '#D97706',
      secondaryLight: '#FEF3C7',
      accent: '#0891B2', // Cyan
      accentDark: '#0E7490',
      accentLight: '#CFFAFE',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0284C7',
      foreground: '#065F46',
      foregroundMuted: '#6B7280',
      background: '#FFFFFF',
      surface: '#ECFDF5',
      border: '#D1FAE5',
      darkForeground: '#D1FAE5',
      darkBackground: '#064E3B',
      darkSurface: '#047857',
      darkBorder: '#10B981',
    },
  },
};

/**
 * Theme Manager - Handle theme persistence and application
 */
export class ThemeManager {
  private static readonly STORAGE_KEY = 'aes-theme-config';
  private static readonly DB_TABLE = 'theme_configs'; // Supabase

  /**
   * Get saved theme from localStorage or Supabase
   */
  static async getActiveTheme(): Promise<ThemeConfig | null> {
    try {
      // Try localStorage first (client-side)
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }

      // TODO: Fetch from Supabase if needed (server-side)
      // const { data } = await supabase
      //   .from(this.DB_TABLE)
      //   .select('*')
      //   .eq('isActive', true)
      //   .single();

      return null;
    } catch (error) {
      console.error('[ThemeManager] Error loading theme:', error);
      return null;
    }
  }

  /**
   * Save theme configuration
   */
  static async saveTheme(theme: ThemeConfig): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
      }

      // TODO: Persist to Supabase
      // await supabase.from(this.DB_TABLE).update({ isActive: true }).eq('id', theme.id);
    } catch (error) {
      console.error('[ThemeManager] Error saving theme:', error);
    }
  }

  /**
   * Generate CSS variables from theme
   */
  static generateCSSVariables(theme: ThemeConfig): Record<string, string> {
    const { colors } = theme;
    return {
      '--color-primary': colors.primary,
      '--color-primary-dark': colors.primaryDark,
      '--color-primary-light': colors.primaryLight,
      '--color-secondary': colors.secondary,
      '--color-secondary-dark': colors.secondaryDark,
      '--color-secondary-light': colors.secondaryLight,
      '--color-accent': colors.accent,
      '--color-accent-dark': colors.accentDark,
      '--color-accent-light': colors.accentLight,
      '--color-success': colors.success,
      '--color-warning': colors.warning,
      '--color-error': colors.error,
      '--color-info': colors.info,
      '--color-foreground': colors.foreground,
      '--color-foreground-muted': colors.foregroundMuted,
      '--color-background': colors.background,
      '--color-surface': colors.surface,
      '--color-border': colors.border,
      '--color-dark-foreground': colors.darkForeground,
      '--color-dark-background': colors.darkBackground,
      '--color-dark-surface': colors.darkSurface,
      '--color-dark-border': colors.darkBorder,
    };
  }
}

/**
 * Default theme (fallback)
 */
export const DEFAULT_THEME: ThemeConfig = {
  id: 'modern-default',
  isActive: true,
  ...THEME_PRESETS.modern,
};
