'use client';

import { useState, useEffect } from 'react';
import { THEME_PRESETS, ThemeManager, ThemeConfig, DesignPersonality } from '@/lib/design/theme-system';
import { motion } from 'framer-motion';

export default function AdminThemesPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingColors, setEditingColors] = useState(false);

  useEffect(() => {
    // Load active theme on mount
    const loadTheme = async () => {
      const theme = await ThemeManager.getActiveTheme();
      setActiveTheme(theme);
      setIsLoading(false);
    };
    loadTheme();
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

    // Apply theme to document
    const cssVars = ThemeManager.generateCSSVariables(newTheme);
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  const handleColorChange = (colorKey: keyof ThemeConfig['colors'], value: string) => {
    if (!activeTheme) return;

    const updatedTheme = {
      ...activeTheme,
      colors: {
        ...activeTheme.colors,
        [colorKey]: value,
      },
    };

    setActiveTheme(updatedTheme);
  };

  const handleSaveCustomTheme = async () => {
    if (!activeTheme) return;

    const customTheme: ThemeConfig = {
      ...activeTheme,
      id: `custom-${Date.now()}`,
      name: `Customizado ${new Date().toLocaleDateString('pt-BR')}`,
    };

    await ThemeManager.saveTheme(customTheme);

    const cssVars = ThemeManager.generateCSSVariables(customTheme);
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    alert('✓ Tema salvo com sucesso!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const personalities = Object.keys(THEME_PRESETS) as DesignPersonality[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎨 Customizador de Temas</h1>
          <p className="text-xl text-gray-600">
            Escolha um design pré-pronto ou customize as cores do seu site
          </p>
        </motion.div>

        {/* Preset Themes Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Temas Pré-Definidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalities.map((personality, idx) => {
              const preset = THEME_PRESETS[personality];
              const isSelected = activeTheme?.personality === personality;

              return (
                <motion.div
                  key={personality}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelectTheme(personality)}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{ backgroundColor: preset.colors.secondary }}
                    />
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{ backgroundColor: preset.colors.accent }}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{preset.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{preset.personality}</p>

                  {isSelected && (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <span>✓ Selecionado</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Color Customizer */}
        {activeTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Customizar Cores</h2>
                <p className="text-gray-600 mt-2">
                  Tema atual: <span className="font-semibold">{activeTheme.name}</span>
                </p>
              </div>
              <button
                onClick={() => setEditingColors(!editingColors)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {editingColors ? 'Ocultar Editor' : 'Editar Cores'}
              </button>
            </div>

            {editingColors && (
              <div className="space-y-8">
                {/* Primary Colors */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cor Primária</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['primary', 'primaryDark', 'primaryLight'].map((colorKey) => (
                      <div key={colorKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {colorKey.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="color"
                          value={activeTheme.colors[colorKey as keyof typeof activeTheme.colors]}
                          onChange={(e) =>
                            handleColorChange(
                              colorKey as keyof ThemeConfig['colors'],
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Colors */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cor Secundária</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['secondary', 'secondaryDark', 'secondaryLight'].map((colorKey) => (
                      <div key={colorKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {colorKey.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="color"
                          value={activeTheme.colors[colorKey as keyof typeof activeTheme.colors]}
                          onChange={(e) =>
                            handleColorChange(
                              colorKey as keyof ThemeConfig['colors'],
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cor de Destaque (CTA)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['accent', 'accentDark', 'accentLight'].map((colorKey) => (
                      <div key={colorKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {colorKey.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="color"
                          value={activeTheme.colors[colorKey as keyof typeof activeTheme.colors]}
                          onChange={(e) =>
                            handleColorChange(
                              colorKey as keyof ThemeConfig['colors'],
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Semantic Colors */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cores Semânticas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['success', 'warning', 'error', 'info'].map((colorKey) => (
                      <div key={colorKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {colorKey}
                        </label>
                        <input
                          type="color"
                          value={activeTheme.colors[colorKey as keyof typeof activeTheme.colors]}
                          onChange={(e) =>
                            handleColorChange(
                              colorKey as keyof ThemeConfig['colors'],
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveCustomTheme}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  💾 Salvar Tema Customizado
                </button>
              </div>
            )}

            {/* Preview */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Prévia do Tema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Light Preview */}
                <div className="p-6 rounded-lg border-2 border-gray-200" style={{ backgroundColor: activeTheme.colors.background }}>
                  <h4 className="text-sm font-bold text-gray-600 mb-4 uppercase">Modo Claro</h4>
                  <div className="space-y-4">
                    <button
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: activeTheme.colors.primary }}
                    >
                      Botão Primário
                    </button>
                    <button
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: activeTheme.colors.accent }}
                    >
                      Botão CTA
                    </button>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: activeTheme.colors.surface, color: activeTheme.colors.foreground }}
                    >
                      <p>Texto em superfície com cor de destaque primária</p>
                    </div>
                  </div>
                </div>

                {/* Dark Preview */}
                <div
                  className="p-6 rounded-lg border-2 border-gray-700"
                  style={{ backgroundColor: activeTheme.colors.darkBackground }}
                >
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase">Modo Escuro</h4>
                  <div className="space-y-4">
                    <button
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: activeTheme.colors.primary }}
                    >
                      Botão Primário
                    </button>
                    <button
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: activeTheme.colors.accent }}
                    >
                      Botão CTA
                    </button>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: activeTheme.colors.darkSurface,
                        color: activeTheme.colors.darkForeground,
                      }}
                    >
                      <p>Texto em superfície escura com destaque</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
