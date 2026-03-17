'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { THEME_PRESETS, ThemeManager, ThemeConfig, DesignPersonality } from '@/lib/design/theme-system';
import { DESIGN_LAYOUTS, DesignManager, DesignLayoutId } from '@/lib/design/design-system';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Layout, Settings, Check, Eye, Save, RotateCcw,
  Monitor, Smartphone, Heart, Shield, TreePalm,
  Phone, MapPin, Users, Calendar, ArrowRight, ExternalLink,
  Sparkles
} from 'lucide-react';

type AdminTab = 'designs' | 'themes' | 'colors';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('designs');
  const [activeTheme, setActiveTheme] = useState<ThemeConfig | null>(null);
  const [activeDesign, setActiveDesign] = useState<DesignLayoutId>('moderno');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const theme = await ThemeManager.getActiveTheme();
      setActiveTheme(theme || { id: 'modern-default', isActive: true, ...THEME_PRESETS.modern });
      setActiveDesign(DesignManager.getActiveLayout());
      setIsLoading(false);
    };
    load();
  }, []);

  const applyTheme = useCallback((theme: ThemeConfig) => {
    const cssVars = ThemeManager.generateCSSVariables(theme);
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  const handleSelectTheme = async (personality: DesignPersonality) => {
    const preset = THEME_PRESETS[personality];
    const newTheme: ThemeConfig = {
      id: `${personality}-${Date.now()}`,
      isActive: true,
      ...preset,
    };
    setActiveTheme(newTheme);
    await ThemeManager.saveTheme(newTheme);
    applyTheme(newTheme);
    // Notify ThemeProvider
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: newTheme } }));
    showSaved();
  };

  const handleSelectDesign = (designId: DesignLayoutId) => {
    setActiveDesign(designId);
    DesignManager.saveLayout(designId);
    // Notify ThemeProvider
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { design: designId } }));
    showSaved();
  };

  const handleColorChange = (colorKey: keyof ThemeConfig['colors'], value: string) => {
    if (!activeTheme) return;
    setActiveTheme({
      ...activeTheme,
      colors: { ...activeTheme.colors, [colorKey]: value },
    });
  };

  const handleSaveCustom = async () => {
    if (!activeTheme) return;
    const custom: ThemeConfig = {
      ...activeTheme,
      id: `custom-${Date.now()}`,
      name: `Customizado ${new Date().toLocaleDateString('pt-BR')}`,
    };
    await ThemeManager.saveTheme(custom);
    applyTheme(custom);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: custom } }));
    showSaved();
  };

  const handleReset = async () => {
    const defaultTheme: ThemeConfig = { id: 'modern-default', isActive: true, ...THEME_PRESETS.modern };
    setActiveTheme(defaultTheme);
    setActiveDesign('moderno');
    await ThemeManager.saveTheme(defaultTheme);
    DesignManager.saveLayout('moderno');
    applyTheme(defaultTheme);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: defaultTheme, design: 'moderno' } }));
    showSaved();
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: typeof Palette }[] = [
    { id: 'designs', label: 'Layouts', icon: Layout },
    { id: 'themes', label: 'Temas de Cores', icon: Palette },
    { id: 'colors', label: 'Customizar Cores', icon: Settings },
  ];

  const designIds = Object.keys(DESIGN_LAYOUTS) as DesignLayoutId[];
  const personalities = Object.keys(THEME_PRESETS) as DesignPersonality[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Painel de Customização</h1>
                <p className="text-xs text-gray-500">AES - Associação dos Empregados do SENAI</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium"
                  >
                    <Check size={16} />
                    Salvo!
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
              >
                <RotateCcw size={16} />
                Resetar
              </button>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white shadow text-emerald-600' : 'text-gray-400'}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white shadow text-emerald-600' : 'text-gray-400'}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left: Options */}
          <div className="xl:col-span-1">
            <AnimatePresence mode="wait">
              {activeTab === 'designs' && (
                <motion.div
                  key="designs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Escolha o Layout</h2>
                  <p className="text-sm text-gray-500 mb-4">Cada layout altera o estilo visual do hero, cards, navegação e espaçamentos do site.</p>
                  {designIds.map((id) => {
                    const layout = DESIGN_LAYOUTS[id];
                    const isActive = activeDesign === id;
                    return (
                      <motion.button
                        key={id}
                        onClick={() => handleSelectDesign(id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{layout.name}</h3>
                          {isActive && (
                            <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-100 px-2 py-1 rounded-full">
                              <Check size={12} />
                              Ativo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{layout.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">Hero: {layout.heroStyle}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">Cards: {layout.cardStyle}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">Nav: {layout.navStyle}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">Raio: {layout.borderRadius}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'themes' && (
                <motion.div
                  key="themes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Paletas de Cores</h2>
                  <p className="text-sm text-gray-500 mb-4">Selecione uma paleta de cores pré-definida. O preview ao lado atualiza em tempo real.</p>
                  {personalities.map((personality) => {
                    const preset = THEME_PRESETS[personality];
                    const isActive = activeTheme?.personality === personality;
                    return (
                      <motion.button
                        key={personality}
                        onClick={() => handleSelectTheme(personality)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                          {isActive && (
                            <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-100 px-2 py-1 rounded-full">
                              <Check size={12} />
                              Ativo
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {[preset.colors.primary, preset.colors.secondary, preset.colors.accent, preset.colors.success, preset.colors.info].map((color, i) => (
                            <div key={i} className="w-8 h-8 rounded-lg border border-gray-200" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'colors' && activeTheme && (
                <motion.div
                  key="colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-semibold text-gray-900">Editar Cores</h2>
                  <p className="text-sm text-gray-500">
                    Tema base: <span className="font-medium text-gray-700">{activeTheme.name}</span>
                  </p>

                  {[
                    { label: 'Primária', keys: ['primary', 'primaryDark', 'primaryLight'] },
                    { label: 'Secundária', keys: ['secondary', 'secondaryDark', 'secondaryLight'] },
                    { label: 'Destaque', keys: ['accent', 'accentDark', 'accentLight'] },
                    { label: 'Semânticas', keys: ['success', 'warning', 'error', 'info'] },
                  ].map((group) => (
                    <div key={group.label} className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">{group.label}</h3>
                      <div className={`grid ${group.keys.length === 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
                        {group.keys.map((key) => (
                          <div key={key}>
                            <label className="block text-xs text-gray-500 mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={activeTheme.colors[key as keyof typeof activeTheme.colors]}
                                onChange={(e) => handleColorChange(key as keyof ThemeConfig['colors'], e.target.value)}
                                className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300"
                              />
                              <span className="text-xs text-gray-400 font-mono">
                                {activeTheme.colors[key as keyof typeof activeTheme.colors]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleSaveCustom}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                  >
                    <Save size={18} />
                    Salvar Tema Customizado
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Real Preview */}
          <div className="xl:col-span-2">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye size={18} />
                  Preview em Tempo Real
                </h2>
                <span className="text-xs text-gray-400">
                  Layout: {DESIGN_LAYOUTS[activeDesign].name} | Tema: {activeTheme?.name}
                </span>
              </div>

              <div
                className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 ${
                  previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                }`}
              >
                {/* Browser Chrome */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                      aessenai.org.br
                    </div>
                  </div>
                </div>

                {/* Rendered Preview */}
                <div className="overflow-y-auto max-h-[700px]" style={{ scrollbarWidth: 'thin' }}>
                  <SitePreview theme={activeTheme!} designId={activeDesign} isMobile={previewMode === 'mobile'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
/* Site Preview - Renders a real miniature site */
/* ============================================ */
function SitePreview({ theme, designId, isMobile }: { theme: ThemeConfig; designId: DesignLayoutId; isMobile: boolean }) {
  const design = DESIGN_LAYOUTS[designId];
  const c = theme.colors;

  const radius = { none: '0px', small: '8px', medium: '12px', large: '20px' }[design.borderRadius];
  const spacing = { compact: 'py-8', normal: 'py-12', spacious: 'py-16' }[design.sectionSpacing];

  return (
    <div className="text-sm" style={{ color: c.foreground }}>
      {/* HEADER */}
      <div style={{ backgroundColor: c.primary }} className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/20 rounded" />
            <span className="text-white font-bold text-xs">AES SENAI</span>
          </div>
          <div className="flex gap-3">
            {!isMobile && (
              <>
                <span className="text-white/80 text-[10px]">Sobre</span>
                <span className="text-white/80 text-[10px]">Serviços</span>
                <span className="text-white/80 text-[10px]">Lazer</span>
                <span className="text-white/80 text-[10px]">Contato</span>
              </>
            )}
            <Phone className="text-white/80" size={10} />
          </div>
        </div>
      </div>

      {/* HERO - Different styles per design */}
      {design.heroStyle === 'centered' && (
        <div className={`${spacing} px-6 text-center`} style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})` }}>
          <div className="relative w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center">
            <Image src="/images/aes-logo.svg" alt="AES" width={40} height={40} className="brightness-0 invert" />
          </div>
          <h1 className="text-white font-bold text-lg mb-2">Associação dos Empregados do SENAI</h1>
          <p className="text-white/80 text-xs mb-4 max-w-md mx-auto">Qualidade de vida para associados desde 1947</p>
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-1.5 bg-white text-xs font-semibold" style={{ color: c.primary, borderRadius: radius }}>Área do Associado</button>
            <button className="px-4 py-1.5 border border-white/50 text-white text-xs" style={{ borderRadius: radius }}>Fale Conosco</button>
          </div>
        </div>
      )}

      {design.heroStyle === 'split' && (
        <div className={`${spacing} px-6`} style={{ background: `linear-gradient(135deg, ${c.primary}15, ${c.primaryLight})` }}>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 items-center`}>
            <div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: c.primaryLight, color: c.primary }}>Desde 1947</span>
              <h1 className="font-bold text-xl mt-2 mb-2" style={{ color: c.foreground }}>Associação dos Empregados do SENAI</h1>
              <p className="text-xs mb-4" style={{ color: c.foregroundMuted }}>Qualidade de vida para associados e dependentes</p>
              <button className="px-4 py-1.5 text-white text-xs font-semibold" style={{ backgroundColor: c.primary, borderRadius: radius }}>Área do Associado</button>
            </div>
            {!isMobile && (
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl flex items-center justify-center" style={{ backgroundColor: c.primary }}>
                  <Image src="/images/aes-logo.svg" alt="AES" width={64} height={64} className="brightness-0 invert" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {design.heroStyle === 'fullwidth' && (
        <div className="py-16 px-6 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent || c.secondary})` }}>
          <div className="relative">
            <h1 className="text-white font-bold text-2xl mb-2">AES SENAI</h1>
            <p className="text-white/80 text-xs mb-6">Desde 1947 proporcionando qualidade de vida</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="px-5 py-2 bg-white text-xs font-bold" style={{ color: c.primary, borderRadius: radius }}>Associe-se</button>
              <button className="px-5 py-2 border-2 border-white text-white text-xs font-bold" style={{ borderRadius: radius }}>Saiba Mais</button>
            </div>
          </div>
        </div>
      )}

      {design.heroStyle === 'minimal' && (
        <div className={`${spacing} px-6`} style={{ backgroundColor: c.background }}>
          <div className="max-w-lg">
            <div className="w-1 h-12 mb-4" style={{ backgroundColor: c.primary }} />
            <h1 className="font-light text-2xl mb-3 tracking-tight" style={{ color: c.foreground }}>Associação dos Empregados do SENAI</h1>
            <p className="text-xs leading-relaxed mb-6" style={{ color: c.foregroundMuted }}>Proporcionando qualidade de vida aos associados, dependentes e agregados desde 1947.</p>
            <button className="text-xs font-medium flex items-center gap-1" style={{ color: c.primary }}>Conhecer a AES <ArrowRight size={12} /></button>
          </div>
        </div>
      )}

      {/* SERVICES */}
      <div className={`${spacing} px-6`} style={{ backgroundColor: c.surface }}>
        <h2 className="font-semibold text-base mb-1 text-center" style={{ color: c.foreground }}>Nossos Serviços</h2>
        <p className="text-[10px] text-center mb-6" style={{ color: c.foregroundMuted }}>Benefícios exclusivos para associados</p>
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
          {[
            { icon: Heart, label: 'Assistência Médica', desc: 'UNIMED FESP' },
            { icon: Shield, label: 'Fundo Mútuo', desc: 'FUMUS' },
            { icon: TreePalm, label: 'Lazer', desc: '3 Núcleos' },
            { icon: Users, label: 'Odontológico', desc: 'Rede credenciada' },
            { icon: Calendar, label: 'Eventos', desc: 'Cultural e esportivo' },
            { icon: ExternalLink, label: 'Parcerias', desc: '10+ parceiros' },
          ].map((svc, i) => {
            const Icon = svc.icon;
            const cardClass = { bordered: 'border', elevated: 'shadow-md', flat: '', glass: 'backdrop-blur-sm bg-opacity-80' }[design.cardStyle];
            return (
              <div key={i} className={`p-3 bg-white ${cardClass} transition-all hover:shadow-lg`} style={{ borderRadius: radius, borderColor: design.cardStyle === 'bordered' ? c.border : undefined }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: c.primaryLight }}>
                  <Icon size={14} style={{ color: c.primary }} />
                </div>
                <h3 className="font-semibold text-[11px] mb-0.5" style={{ color: c.foreground }}>{svc.label}</h3>
                <p className="text-[9px]" style={{ color: c.foregroundMuted }}>{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEISURE */}
      <div className={`${spacing} px-6`} style={{ backgroundColor: c.background }}>
        <h2 className="font-semibold text-base mb-4 text-center" style={{ color: c.foreground }}>Núcleos de Lazer</h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
          {[
            { name: 'Clube de Campo', loc: 'Jundiaí/SP', price: 'R$ 45' },
            { name: 'Clube Náutico', loc: 'Boraceia/SP', price: 'R$ 45' },
            { name: 'Colônia de Férias', loc: 'Itanhaém/SP', price: 'R$ 118' },
          ].map((club, i) => (
            <div key={i} className="overflow-hidden" style={{ borderRadius: radius }}>
              <div className="h-16" style={{ background: `linear-gradient(135deg, ${c.primary}${i === 0 ? '' : i === 1 ? '90' : '60'}, ${c.primaryDark})` }} />
              <div className="p-3 bg-white border border-gray-100" style={{ borderRadius: `0 0 ${radius} ${radius}` }}>
                <h3 className="font-semibold text-xs" style={{ color: c.foreground }}>{club.name}</h3>
                <p className="text-[9px] flex items-center gap-1 mt-0.5" style={{ color: c.foregroundMuted }}>
                  <MapPin size={8} /> {club.loc}
                </p>
                <span className="text-[9px] font-medium mt-1 inline-block px-2 py-0.5 rounded-full" style={{ backgroundColor: c.primaryLight, color: c.primary }}>
                  A partir de {club.price}/noite
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-10 px-6 text-center" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})` }}>
        <h2 className="text-white font-bold text-base mb-2">Associe-se à AES</h2>
        <p className="text-white/80 text-[10px] mb-4 max-w-sm mx-auto">Benefícios exclusivos para você e sua família</p>
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-1.5 bg-white text-xs font-semibold" style={{ color: c.primary, borderRadius: radius }}>Área do Associado</button>
          <button className="px-4 py-1.5 border border-white/50 text-white text-xs" style={{ borderRadius: radius }}>(11) 3367-9900</button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 px-4 py-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3 mb-3`}>
          <div>
            <div className="text-white font-bold text-[10px] mb-1">AES SENAI</div>
            <div className="text-gray-400 text-[8px]">Desde 1947</div>
          </div>
          <div>
            <div className="text-white font-bold text-[8px] mb-1">Links</div>
            <div className="text-gray-400 text-[8px] space-y-0.5">
              <div>Quem Somos</div>
              <div>Serviços</div>
              <div>Contato</div>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-[8px] mb-1">Serviços</div>
            <div className="text-gray-400 text-[8px] space-y-0.5">
              <div>Médico</div>
              <div>FUMUS</div>
              <div>Lazer</div>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-[8px] mb-1">Contato</div>
            <div className="text-gray-400 text-[8px] space-y-0.5">
              <div>(11) 3367-9900</div>
              <div>Brás, São Paulo</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-2 text-center text-gray-500 text-[7px]">
          © 2026 AES - Todos os direitos reservados
        </div>
      </div>
    </div>
  );
}
