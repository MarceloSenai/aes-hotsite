'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { THEME_PRESETS, ThemeManager, ThemeConfig, DesignPersonality } from '@/lib/design/theme-system';
import { DESIGN_LAYOUTS, DesignManager, DesignLayoutId } from '@/lib/design/design-system';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Layout, Settings, Check, Eye, Save, RotateCcw,
  Monitor, Smartphone, Heart, Shield, TreePalm,
  Phone, MapPin, Users, Calendar, ArrowRight, ExternalLink,
  Sparkles, Trash2, Plus, ImageIcon, DollarSign,
  Menu, X, Upload, FileText, Camera, ChevronRight,
  Edit3, Loader2
} from 'lucide-react';
import {
  carouselService, eventosService, boletinsService, representantesService,
  galeriaService, documentosService, parceriasService, parceirosSeguroService,
  farmaciaService, nucleoPricingService, siteConfigService, siteEmailsService,
  socialLinksService, planosSaudeService, uploadFile, deleteFile, getPublicUrl,
  nucleoVideosService,
} from '@/lib/supabase/data-service';
import { getTodasReservas, atualizarStatusReserva, getAcomodacoes, NUCLEOS } from '@/lib/supabase/reservas-service';
import { listarAssociados, criarAssociado, atualizarAssociado } from '@/lib/supabase/auth-service';

// ─── Types ───────────────────────────────────────────────────────

type SectionId =
  | 'themes' | 'carousel' | 'boletim' | 'parcerias'
  | 'eventos' | 'representantes' | 'planos' | 'seguros'
  | 'galeria' | 'documentos' | 'precos' | 'config'
  | 'reservas' | 'associados' | 'acomodacoes' | 'videos';

interface NavCategory {
  label: string;
  icon: typeof Palette;
  items: { id: SectionId; label: string }[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Design',
    icon: Palette,
    items: [{ id: 'themes', label: 'Temas & Cores' }],
  },
  {
    label: 'Conteúdo',
    icon: FileText,
    items: [
      { id: 'carousel', label: 'Carrossel' },
      { id: 'boletim', label: 'Boletim' },
      { id: 'parcerias', label: 'Parcerias' },
    ],
  },
  {
    label: 'Eventos',
    icon: Calendar,
    items: [{ id: 'eventos', label: 'Eventos' }],
  },
  {
    label: 'Pessoas',
    icon: Users,
    items: [{ id: 'representantes', label: 'Representantes' }],
  },
  {
    label: 'Serviços',
    icon: Heart,
    items: [
      { id: 'planos', label: 'Planos Médicos' },
      { id: 'seguros', label: 'Seguros & Farmácia' },
    ],
  },
  {
    label: 'Galeria',
    icon: Camera,
    items: [{ id: 'galeria', label: 'Galeria' }, { id: 'videos', label: 'Vídeos' }],
  },
  {
    label: 'Documentos',
    icon: FileText,
    items: [{ id: 'documentos', label: 'Documentos' }],
  },
  {
    label: 'Preços',
    icon: DollarSign,
    items: [{ id: 'precos', label: 'Preços' }],
  },
  {
    label: 'Reservas',
    icon: Calendar,
    items: [
      { id: 'reservas', label: 'Reservas' },
      { id: 'associados', label: 'Associados' },
      { id: 'acomodacoes', label: 'Acomodações' },
    ],
  },
  {
    label: 'Configurações',
    icon: Settings,
    items: [{ id: 'config', label: 'Configurações' }],
  },
];

// ─── Loading Skeleton ────────────────────────────────────────────

function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-100 rounded-t-lg mb-px" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 border-b border-gray-50">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-gray-100 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Edit Modal ──────────────────────────────────────────────────

function EditModal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto mx-4"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="p-4 space-y-4">{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Field input helper ──────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows,
  options,
}: {
  label: string;
  value: string | number | boolean;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
  options?: string[];
}) {
  if (type === 'select' && options) {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }
  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
        <textarea
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
        />
      </div>
    );
  }
  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(String(e.target.checked))}
          className="rounded border-gray-300"
        />
        {label}
      </label>
    );
  }
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      />
    </div>
  );
}

// ─── File Upload Component ───────────────────────────────────────

function FileUpload({
  bucket,
  accept,
  label,
  onUploaded,
}: {
  bucket: string;
  accept: string;
  label: string;
  onUploaded: (url: string, fileName: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const MAX_SIZE = bucket === 'aes-galeria' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    const ALLOWED = bucket === 'aes-galeria' ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] : ['application/pdf', 'image/jpeg', 'image/png'];
    if (file.size > MAX_SIZE) { alert(`Arquivo muito grande. Máximo: ${MAX_SIZE / 1024 / 1024}MB`); return; }
    if (!ALLOWED.includes(file.type)) { alert('Tipo de arquivo não permitido.'); return; }
    setUploading(true);
    try {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const url = await uploadFile(bucket, path, file);
      if (url) {
        onUploaded(url, file.name);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
        dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {uploading ? (
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Enviando...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Upload size={20} />
          <span className="text-xs">{label}</span>
          <span className="text-[10px]">Arraste ou clique para selecionar</span>
        </div>
      )}
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────

function SectionHeader({
  title,
  onAdd,
  addLabel = 'Novo',
}: {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
}

// ─── Toast Notification ──────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg shadow-lg text-sm font-medium"
        >
          <Check size={16} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN ADMIN PAGE ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('themes');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Theme state (localStorage-based)
  const [activeTheme, setActiveTheme] = useState<ThemeConfig | null>(null);
  const [activeDesign, setActiveDesign] = useState<DesignLayoutId>('moderno');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [themeSubTab, setThemeSubTab] = useState<'layouts' | 'themes' | 'colors'>('layouts');

  // Supabase data states
  const [carouselData, setCarouselData] = useState<Record<string, unknown>[]>([]);
  const [eventosData, setEventosData] = useState<Record<string, unknown>[]>([]);
  const [boletinsData, setBoletinsData] = useState<Record<string, unknown>[]>([]);
  const [representantesData, setRepresentantesData] = useState<Record<string, unknown>[]>([]);
  const [galeriaData, setGaleriaData] = useState<Record<string, unknown>[]>([]);
  const [documentosData, setDocumentosData] = useState<Record<string, unknown>[]>([]);
  const [parceriasData, setParceriasData] = useState<Record<string, unknown>[]>([]);
  const [precosData, setPrecosData] = useState<Record<string, unknown>[]>([]);
  const [planosData, setPlanosData] = useState<Record<string, unknown>[]>([]);
  const [segurosData, setSegurosData] = useState<Record<string, unknown>[]>([]);
  const [farmaciaData, setFarmaciaData] = useState<Record<string, string> | null>(null);
  const [socialLinksData, setSocialLinksData] = useState<Record<string, unknown>[]>([]);
  const [emailsData, setEmailsData] = useState<Record<string, unknown>[]>([]);
  const [reservasData, setReservasData] = useState<Record<string, unknown>[]>([]);
  const [associadosData, setAssociadosData] = useState<Record<string, unknown>[]>([]);
  const [acomodacoesData, setAcomodacoesData] = useState<Record<string, unknown>[]>([]);
  const [novoAssociadoSenha, setNovoAssociadoSenha] = useState('');
  const [videosData, setVideosData] = useState<Record<string, unknown>[]>([]);
  const [siteConfigData, setSiteConfigData] = useState<Record<string, string> | null>(null);

  // Loading states
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [isInitLoading, setIsInitLoading] = useState(true);

  // Modal states
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalSection, setEditModalSection] = useState<SectionId | ''>('');

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, []);

  // ─── Theme handlers (localStorage) ────────────────────────────

  useEffect(() => {
    const load = async () => {
      const theme = await ThemeManager.getActiveTheme();
      setActiveTheme(theme || { id: 'modern-default', isActive: true, ...THEME_PRESETS.modern });
      setActiveDesign(DesignManager.getActiveLayout());
      setIsInitLoading(false);
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
    const newTheme: ThemeConfig = { id: `${personality}-${Date.now()}`, isActive: true, ...preset };
    setActiveTheme(newTheme);
    await ThemeManager.saveTheme(newTheme);
    applyTheme(newTheme);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: newTheme } }));
    showToast('Tema aplicado');
  };

  const handleSelectDesign = (designId: DesignLayoutId) => {
    setActiveDesign(designId);
    DesignManager.saveLayout(designId);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { design: designId } }));
    showToast('Layout aplicado');
  };

  const handleColorChange = (colorKey: keyof ThemeConfig['colors'], value: string) => {
    if (!activeTheme) return;
    setActiveTheme({ ...activeTheme, colors: { ...activeTheme.colors, [colorKey]: value } });
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
    showToast('Tema customizado salvo');
  };

  const handleReset = async () => {
    const defaultTheme: ThemeConfig = { id: 'modern-default', isActive: true, ...THEME_PRESETS.modern };
    setActiveTheme(defaultTheme);
    setActiveDesign('moderno');
    await ThemeManager.saveTheme(defaultTheme);
    DesignManager.saveLayout('moderno');
    applyTheme(defaultTheme);
    window.dispatchEvent(new CustomEvent('aes-theme-change', { detail: { theme: defaultTheme, design: 'moderno' } }));
    showToast('Resetado para padrao');
  };

  // ─── Data loaders ─────────────────────────────────────────────

  const loadSection = useCallback(async (section: SectionId) => {
    setLoading((p) => ({ ...p, [section]: true }));
    try {
      switch (section) {
        case 'carousel': {
          const data = await carouselService.getAll();
          setCarouselData(data as Record<string, unknown>[]);
          break;
        }
        case 'eventos': {
          const data = await eventosService.getAll();
          setEventosData(data as Record<string, unknown>[]);
          break;
        }
        case 'boletim': {
          const data = await boletinsService.getAll();
          setBoletinsData(data as Record<string, unknown>[]);
          break;
        }
        case 'representantes': {
          const data = await representantesService.getAll();
          setRepresentantesData(data as Record<string, unknown>[]);
          break;
        }
        case 'galeria': {
          const data = await galeriaService.getAll();
          setGaleriaData(data as Record<string, unknown>[]);
          break;
        }
        case 'documentos': {
          const data = await documentosService.getAll();
          setDocumentosData(data as Record<string, unknown>[]);
          break;
        }
        case 'parcerias': {
          const data = await parceriasService.getAll();
          setParceriasData(data as Record<string, unknown>[]);
          break;
        }
        case 'precos': {
          const data = await nucleoPricingService.getAll();
          setPrecosData(data as Record<string, unknown>[]);
          break;
        }
        case 'planos': {
          const data = await planosSaudeService.getAll();
          setPlanosData(data as Record<string, unknown>[]);
          break;
        }
        case 'seguros': {
          const data = await parceirosSeguroService.getAll();
          setSegurosData(data as Record<string, unknown>[]);
          const farm = await farmaciaService.get();
          setFarmaciaData(farm as Record<string, string> | null);
          break;
        }
        case 'config': {
          const links = await socialLinksService.getAll();
          setSocialLinksData(links as Record<string, unknown>[]);
          const emails = await siteEmailsService.getAll();
          setEmailsData(emails as Record<string, unknown>[]);
          const cfg = await siteConfigService.get();
          setSiteConfigData(cfg);
          break;
        }
        case 'reservas': {
          const res = await getTodasReservas();
          setReservasData(res as unknown as Record<string, unknown>[]);
          break;
        }
        case 'associados': {
          const assoc = await listarAssociados();
          setAssociadosData(assoc as unknown as Record<string, unknown>[]);
          break;
        }
        case 'acomodacoes': {
          const acom = await getAcomodacoes();
          setAcomodacoesData(acom as unknown as Record<string, unknown>[]);
          break;
        }
        case 'videos': {
          const vids = await nucleoVideosService.getAll();
          setVideosData(vids as Record<string, unknown>[]);
          break;
        }
      }
    } catch (err) {
      console.error(`Error loading ${section}:`, err);
    } finally {
      setLoading((p) => ({ ...p, [section]: false }));
    }
  }, []);

  useEffect(() => {
    if (activeSection !== 'themes') {
      loadSection(activeSection);
    }
  }, [activeSection, loadSection]);

  // ─── Generic CRUD handlers ────────────────────────────────────

  const handleDelete = async (section: SectionId, id: string) => {
    try {
      let ok = false;
      switch (section) {
        case 'carousel': ok = !!(await carouselService.remove(id)); break;
        case 'eventos': ok = !!(await eventosService.remove(id)); break;
        case 'boletim': ok = !!(await boletinsService.remove(id)); break;
        case 'representantes': ok = !!(await representantesService.remove(id)); break;
        case 'galeria': ok = !!(await galeriaService.remove(id)); break;
        case 'documentos': ok = !!(await documentosService.remove(id)); break;
        case 'parcerias': ok = !!(await parceriasService.remove(id)); break;
        case 'seguros': ok = !!(await parceirosSeguroService.remove(id)); break;
        case 'planos': ok = !!(await planosSaudeService.remove(id)); break;
        case 'videos': ok = !!(await nucleoVideosService.remove(id)); break;
        default: break;
      }
      if (ok) {
        showToast('Removido com sucesso');
        loadSection(section);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const openEditModal = (section: SectionId, item: Record<string, unknown> | null) => {
    setEditModalSection(section);
    setEditingItem(item ? { ...item } : null);
    setEditModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!editingItem || !editModalSection) return;
    try {
      const section = editModalSection as SectionId;
      const isNew = !editingItem.id;
      const { id, created_at: _ca, updated_at: _ua, ...rest } = editingItem;

      let ok = false;
      switch (section) {
        case 'carousel':
          ok = isNew
            ? !!(await carouselService.create(rest))
            : !!(await carouselService.update(id as string, rest));
          break;
        case 'eventos':
          ok = isNew
            ? !!(await eventosService.create(rest))
            : !!(await eventosService.update(id as string, rest));
          break;
        case 'boletim':
          ok = isNew
            ? !!(await boletinsService.create(rest))
            : !!(await boletinsService.update(id as string, rest));
          break;
        case 'representantes':
          ok = isNew
            ? !!(await representantesService.create(rest))
            : !!(await representantesService.update(id as string, rest));
          break;
        case 'galeria':
          ok = isNew
            ? !!(await galeriaService.create(rest))
            : !!(await galeriaService.update(id as string, rest));
          break;
        case 'documentos':
          ok = isNew
            ? !!(await documentosService.create(rest))
            : !!(await documentosService.update(id as string, rest));
          break;
        case 'parcerias':
          ok = isNew
            ? !!(await parceriasService.create(rest))
            : !!(await parceriasService.update(id as string, rest));
          break;
        case 'seguros':
          ok = isNew
            ? !!(await parceirosSeguroService.create(rest))
            : !!(await parceirosSeguroService.update(id as string, rest));
          break;
        case 'planos':
          ok = isNew
            ? !!(await planosSaudeService.create(rest))
            : !!(await planosSaudeService.update(id as string, rest));
          break;
        case 'videos':
          ok = isNew
            ? !!(await nucleoVideosService.create(rest))
            : !!(await nucleoVideosService.update(id as string, rest));
          break;
        case 'associados': {
          if (isNew) {
            const senha = novoAssociadoSenha || 'aes2026';
            const result = await criarAssociado({
              cpf: (rest.cpf as string) || '',
              nome: (rest.nome as string) || '',
              email: rest.email as string,
              telefone: rest.telefone as string,
              senha,
              tipo: rest.tipo as string,
            });
            ok = result.ok;
            if (!ok) showToast(result.error || 'Erro ao criar associado');
          } else {
            const result = await atualizarAssociado(id as string, {
              nome: rest.nome as string,
              email: rest.email as string,
              telefone: rest.telefone as string,
              tipo: rest.tipo as string,
              ativo: rest.ativo as boolean,
              novaSenha: novoAssociadoSenha || undefined,
            });
            ok = result.ok;
          }
          break;
        }
      }

      if (ok) {
        showToast(isNew ? 'Criado com sucesso' : 'Atualizado com sucesso');
        setEditModalOpen(false);
        setEditingItem(null);
        loadSection(section);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const updateEditingField = (field: string, value: unknown) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [field]: value });
  };

  // ─── Initial loading ──────────────────────────────────────────

  if (isInitLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const designIds = Object.keys(DESIGN_LAYOUTS) as DesignLayoutId[];
  const personalities = Object.keys(THEME_PRESETS) as DesignPersonality[];

  // ─── Render ────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate">Painel Admin</h1>
            <p className="text-[10px] text-gray-400 truncate">AES SENAI</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-800 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.label} className="mb-3">
                <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  <CatIcon size={12} />
                  {cat.label}
                </div>
                {cat.items.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <ChevronRight size={14} className={isActive ? 'text-blue-200' : 'text-gray-600'} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-gray-800 text-[10px] text-gray-500">
          AES Hotsite Admin v2.0
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {NAV_CATEGORIES.flatMap((c) => c.items).find((i) => i.id === activeSection)?.label || activeSection}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {activeSection === 'themes' && (
              <>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  <RotateCcw size={14} />
                  Resetar
                </button>
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}
                  >
                    <Monitor size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {/* ═══ THEMES & DESIGN SECTION ═══ */}
              {activeSection === 'themes' && (
                <div>
                  {/* Sub-tabs */}
                  <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
                    {([
                      { id: 'layouts' as const, label: 'Layouts', icon: Layout },
                      { id: 'themes' as const, label: 'Paletas', icon: Palette },
                      { id: 'colors' as const, label: 'Customizar', icon: Settings },
                    ]).map((tab) => {
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setThemeSubTab(tab.id)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            themeSubTab === tab.id
                              ? 'bg-white shadow text-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <TabIcon size={14} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left: Options */}
                    <div className="xl:col-span-1 space-y-4">
                      {themeSubTab === 'layouts' && (
                        <>
                          <p className="text-sm text-gray-500 mb-4">Cada layout altera o estilo visual do hero, cards, navegacao e espacamentos do site.</p>
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
                                  isActive ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold text-gray-900">{layout.name}</h3>
                                  {isActive && (
                                    <span className="flex items-center gap-1 text-blue-600 text-xs font-medium bg-blue-100 px-2 py-1 rounded-full">
                                      <Check size={12} /> Ativo
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
                        </>
                      )}

                      {themeSubTab === 'themes' && (
                        <>
                          <p className="text-sm text-gray-500 mb-4">Selecione uma paleta de cores pre-definida. O preview ao lado atualiza em tempo real.</p>
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
                                  isActive ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                                  {isActive && (
                                    <span className="flex items-center gap-1 text-blue-600 text-xs font-medium bg-blue-100 px-2 py-1 rounded-full">
                                      <Check size={12} /> Ativo
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
                        </>
                      )}

                      {themeSubTab === 'colors' && activeTheme && (
                        <div className="space-y-6">
                          <p className="text-sm text-gray-500">
                            Tema base: <span className="font-medium text-gray-700">{activeTheme.name}</span>
                          </p>
                          {[
                            { label: 'Primaria', keys: ['primary', 'primaryDark', 'primaryLight'] },
                            { label: 'Secundaria', keys: ['secondary', 'secondaryDark', 'secondaryLight'] },
                            { label: 'Destaque', keys: ['accent', 'accentDark', 'accentLight'] },
                            { label: 'Semanticas', keys: ['success', 'warning', 'error', 'info'] },
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
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                          >
                            <Save size={18} />
                            Salvar Tema Customizado
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Right: Preview */}
                    <div className="xl:col-span-2">
                      <div className="sticky top-20">
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
                          <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400" />
                              <div className="w-3 h-3 rounded-full bg-yellow-400" />
                              <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center">aessenai.org.br</div>
                            </div>
                          </div>
                          <div className="overflow-y-auto max-h-[700px]" style={{ scrollbarWidth: 'thin' }}>
                            <SitePreview theme={activeTheme!} designId={activeDesign} isMobile={previewMode === 'mobile'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ CARROSSEL SECTION ═══ */}
              {activeSection === 'carousel' && (
                <div>
                  <SectionHeader
                    title="Slides do Carrossel"
                    onAdd={() => openEditModal('carousel', {
                      badge: 'Novo', badge_color: '#10B981', title: 'Novo Slide',
                      description: '', cta: 'Saiba Mais', href: '/', enabled: true, sort_order: carouselData.length,
                    })}
                  />
                  {loading.carousel ? <TableSkeleton cols={5} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Badge</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Link</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Ativo</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carouselData.map((slide) => (
                            <tr key={slide.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: (slide.badge_color as string) || '#6366F1' }}>
                                  {slide.badge as string}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-900 font-medium">{slide.title as string}</td>
                              <td className="px-4 py-3 text-gray-500 font-mono text-xs">{slide.href as string}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${slide.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {slide.enabled ? 'Sim' : 'Nao'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('carousel', slide)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('carousel', slide.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {carouselData.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum slide cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ EVENTOS SECTION ═══ */}
              {activeSection === 'eventos' && (
                <div>
                  <SectionHeader
                    title="Calendário de Eventos"
                    onAdd={() => openEditModal('eventos', {
                      titulo: '', data: '', local: '', departamento: 'Cultural e Recreativo',
                      horario: '', mes: 'Janeiro', enabled: true,
                    })}
                  />
                  {loading.eventos ? <TableSkeleton cols={6} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Data</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Local</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Mes</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Ativo</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventosData.map((ev) => (
                            <tr key={ev.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-600 font-mono text-xs">{ev.data as string}</td>
                              <td className="px-4 py-3 text-gray-900 font-medium">{ev.titulo as string}</td>
                              <td className="px-4 py-3 text-gray-500">{ev.local as string}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                  {ev.mes as string}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ev.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {ev.enabled ? 'Sim' : 'Nao'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('eventos', ev)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('eventos', ev.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {eventosData.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum evento cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ BOLETIM SECTION ═══ */}
              {activeSection === 'boletim' && (
                <div>
                  <SectionHeader
                    title="Edições do Boletim"
                    addLabel="Nova Edição"
                    onAdd={() => openEditModal('boletim', {
                      numero: (boletinsData.length > 0 ? Math.max(...boletinsData.map((b) => Number(b.numero) || 0)) + 1 : 1),
                      titulo: '', data: '', resumo: '', pdf_path: '',
                    })}
                  />
                  {loading.boletim ? <TableSkeleton cols={5} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">No.</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Data</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">PDF</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {boletinsData.map((bol) => (
                            <tr key={bol.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-bold text-blue-600">#{bol.numero as number}</td>
                              <td className="px-4 py-3 text-gray-900 font-medium">{bol.titulo as string}</td>
                              <td className="px-4 py-3 text-gray-500">{bol.data as string}</td>
                              <td className="px-4 py-3">
                                {bol.pdf_path ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                    <FileText size={12} /> Enviado
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-400">Sem PDF</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('boletim', bol)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('boletim', bol.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {boletinsData.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum boletim cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ REPRESENTANTES SECTION ═══ */}
              {activeSection === 'representantes' && (
                <div>
                  <SectionHeader
                    title="Representantes"
                    onAdd={() => openEditModal('representantes', {
                      nome: '', cargo: '', categoria: 'conselho-deliberativo',
                      regional: '', unidade: '', email: '', telefone: '', sort_order: representantesData.length,
                    })}
                  />
                  {loading.representantes ? <TableSkeleton cols={4} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Cargo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Categoria</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {representantesData.map((rep) => (
                            <tr key={rep.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900 font-medium">{rep.nome as string}</td>
                              <td className="px-4 py-3 text-gray-500">{rep.cargo as string}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                                  {(rep.categoria as string)?.replace(/-/g, ' ')}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('representantes', rep)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('representantes', rep.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {representantesData.length === 0 && (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum representante cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ GALERIA SECTION ═══ */}
              {activeSection === 'galeria' && (
                <div>
                  <SectionHeader
                    title="Galeria de Fotos"
                    addLabel="Nova Foto"
                    onAdd={() => openEditModal('galeria', {
                      titulo: '', descricao: '', categoria: 'Eventos', image_path: '',
                    })}
                  />
                  {loading.galeria ? <TableSkeleton cols={4} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Foto</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Categoria</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {galeriaData.map((foto) => (
                            <tr key={foto.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">
                                {foto.image_path ? (
                                  <img src={foto.image_path as string} alt={foto.titulo as string} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                                    <ImageIcon size={16} className="text-gray-300" />
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-900 font-medium">{foto.titulo as string}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                  {foto.categoria as string}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('galeria', foto)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('galeria', foto.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {galeriaData.length === 0 && (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhuma foto cadastrada</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ DOCUMENTOS SECTION ═══ */}
              {activeSection === 'documentos' && (
                <div>
                  <SectionHeader
                    title="Documentos"
                    addLabel="Novo Documento"
                    onAdd={() => openEditModal('documentos', {
                      titulo: '', descricao: '', categoria: 'Comunicados', file_path: '', file_name: '',
                    })}
                  />
                  {loading.documentos ? <TableSkeleton cols={5} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Categoria</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Arquivo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Data</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentosData.map((doc) => (
                            <tr key={doc.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900 font-medium">{doc.titulo as string}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                  {doc.categoria as string}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {doc.file_name ? (
                                  <span className="inline-flex items-center gap-1 text-xs text-green-700">
                                    <FileText size={12} /> {doc.file_name as string}
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-400">Sem arquivo</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs">
                                {doc.created_at ? new Date(doc.created_at as string).toLocaleDateString('pt-BR') : '-'}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('documentos', doc)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('documentos', doc.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {documentosData.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum documento cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ PARCERIAS SECTION ═══ */}
              {activeSection === 'parcerias' && (
                <div>
                  <SectionHeader
                    title="Parcerias e Convênios"
                    addLabel="Nova Parceria"
                    onAdd={() => openEditModal('parcerias', {
                      nome: '', categoria: 'Outros', descricao: '', contato: '', site: '', instagram: '', destaque: '', sort_order: parceriasData.length,
                    })}
                  />
                  {loading.parcerias ? <TableSkeleton cols={4} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Categoria</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Destaque</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parceriasData.map((parc) => (
                            <tr key={parc.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900 font-medium">{parc.nome as string}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                                  {parc.categoria as string}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs">{(parc.destaque as string) || '-'}</td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('parcerias', parc)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('parcerias', parc.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {parceriasData.length === 0 && (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhuma parceria cadastrada</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ PRECOS SECTION ═══ */}
              {activeSection === 'precos' && (
                <div>
                  <SectionHeader title="Preços - Núcleos de Lazer" />
                  {loading.precos ? <TableSkeleton cols={6} /> : (
                    <div className="space-y-6">
                      {precosData.map((nucleo) => (
                        <div key={nucleo.id as string} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">{nucleo.nome as string || nucleo.nucleo as string}</h3>
                          </div>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-100">
                                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Categoria</th>
                                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Associado</th>
                                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Dependente</th>
                                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Convidado</th>
                                <th className="text-right px-4 py-2 text-xs font-semibold text-gray-600">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((nucleo.nucleo_precos as Record<string, unknown>[]) || []).map((preco) => (
                                <tr key={preco.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                  <td className="px-4 py-2 text-gray-900">{preco.categoria as string}</td>
                                  <td className="px-4 py-2 text-gray-600 font-mono text-xs">{preco.associado as string}</td>
                                  <td className="px-4 py-2 text-gray-600 font-mono text-xs">{preco.dependente as string}</td>
                                  <td className="px-4 py-2 text-gray-600 font-mono text-xs">{preco.convidado as string}</td>
                                  <td className="px-4 py-2 text-right">
                                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                      <Edit3 size={12} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                      {precosData.length === 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                          Nenhum núcleo de preço cadastrado
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ═══ PLANOS MEDICOS SECTION ═══ */}
              {activeSection === 'planos' && (
                <div>
                  <SectionHeader
                    title="Planos Médicos e Odontológicos"
                    onAdd={() => openEditModal('planos', {
                      tipo_plano: 'odontologico', tipo: '', operadora: '', cobertura: '', aberto: true,
                    })}
                  />
                  {loading.planos ? <TableSkeleton cols={6} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome do Plano</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Tipo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Operadora</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Aberto</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Faixas</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {planosData.map((plano) => (
                            <tr key={plano.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-gray-900 font-medium">{plano.tipo as string}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${(plano.tipo_plano as string) === 'medico' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                  {(plano.tipo_plano as string) === 'medico' ? 'Médico' : 'Odontológico'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-500">{plano.operadora as string}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${plano.aberto ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                  {plano.aberto ? 'Aberto' : 'Fechado'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  {((plano.plano_faixas as unknown[]) || []).length} faixas
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right flex justify-end gap-1">
                                <button onClick={() => openEditModal('planos', plano)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => handleDelete('planos', plano.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {planosData.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum plano cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ SEGUROS & FARMACIA SECTION ═══ */}
              {activeSection === 'seguros' && (
                <div className="space-y-8">
                  <div>
                    <SectionHeader
                      title="Parceiros de Seguros"
                      onAdd={() => openEditModal('seguros', {
                        nome: '', tipo: 'Seguro', descricao: '', contato: '',
                      })}
                    />
                    {loading.seguros ? <TableSkeleton cols={4} /> : (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Tipo</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Descrição</th>
                              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {segurosData.map((seg) => (
                              <tr key={seg.id as string} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-gray-900 font-medium">{seg.nome as string}</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                    {seg.tipo as string}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{seg.descricao as string}</td>
                                <td className="px-4 py-3 text-right">
                                  <button onClick={() => openEditModal('seguros', seg)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Edit3 size={14} />
                                  </button>
                                  <button onClick={() => handleDelete('seguros', seg.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {segurosData.length === 0 && (
                              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum parceiro de seguro cadastrado</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Farmácia */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Farmácia Conveniada</h3>
                    {farmaciaData && (
                      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                        <Field label="Rede" value={farmaciaData.rede || ''} onChange={(v) => setFarmaciaData({ ...farmaciaData, rede: v })} />
                        <Field label="Descrição" value={farmaciaData.descricao || ''} onChange={(v) => setFarmaciaData({ ...farmaciaData, descricao: v })} type="textarea" />
                        <Field label="Restrição" value={farmaciaData.restricao || ''} onChange={(v) => setFarmaciaData({ ...farmaciaData, restricao: v })} />
                        <Field label="Contato" value={farmaciaData.contato || ''} onChange={(v) => setFarmaciaData({ ...farmaciaData, contato: v })} />
                        <button
                          onClick={async () => {
                            if (!farmaciaData) return;
                            await farmaciaService.update(farmaciaData);
                            showToast('Farmácia atualizada');
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Save size={16} />
                          Salvar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ CONFIGURACOES SECTION ═══ */}
              {activeSection === 'config' && (
                <div className="space-y-8">
                  <SectionHeader title="Configurações do Site" />

                  {loading.config ? <TableSkeleton cols={3} /> : (
                    <>
                      {/* Social Links */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-semibold text-gray-900">Redes Sociais</h3>
                          <button
                            onClick={async () => {
                              await socialLinksService.create({ platform: 'Nova Rede', url: 'https://', enabled: true });
                              loadSection('config');
                              showToast('Rede social adicionada');
                            }}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Plus size={14} /> Adicionar
                          </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Plataforma</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">URL</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Ativo</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {socialLinksData.map((link) => (
                                <tr key={link.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                  <td className="px-4 py-3 text-gray-900 font-medium">{link.platform as string}</td>
                                  <td className="px-4 py-3 text-gray-500 font-mono text-xs max-w-xs truncate">{link.url as string}</td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${link.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                      {link.enabled ? 'Sim' : 'Nao'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      onClick={async () => {
                                        await socialLinksService.remove(link.id as string);
                                        loadSection('config');
                                        showToast('Rede social removida');
                                      }}
                                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Emails */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-semibold text-gray-900">E-mails por Setor</h3>
                          <button
                            onClick={async () => {
                              await siteEmailsService.create({ label: 'Novo Setor', email: 'email@aessenai.org.br', sort_order: emailsData.length });
                              loadSection('config');
                              showToast('Email adicionado');
                            }}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Plus size={14} /> Adicionar
                          </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Setor</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Email</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {emailsData.map((em) => (
                                <tr key={em.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                  <td className="px-4 py-3 text-gray-900 font-medium">{em.label as string}</td>
                                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{em.email as string}</td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      onClick={async () => {
                                        await siteEmailsService.remove(em.id as string);
                                        loadSection('config');
                                        showToast('Email removido');
                                      }}
                                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Site Config fields */}
                      {siteConfigData && (
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-3">Informacoes Gerais</h3>
                          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                            <Field label="Telefone" value={siteConfigData.phone || ''} onChange={(v) => setSiteConfigData({ ...siteConfigData, phone: v })} />
                            <Field label="WhatsApp URL" value={siteConfigData.whatsapp || ''} onChange={(v) => setSiteConfigData({ ...siteConfigData, whatsapp: v })} />
                            <Field label="Horario de Funcionamento" value={siteConfigData.working_hours || ''} onChange={(v) => setSiteConfigData({ ...siteConfigData, working_hours: v })} />
                            <Field label="Endereco" value={siteConfigData.address || ''} onChange={(v) => setSiteConfigData({ ...siteConfigData, address: v })} type="textarea" />
                            <button
                              onClick={async () => {
                                if (!siteConfigData) return;
                                await siteConfigService.update(siteConfigData);
                                showToast('Configurações salvas');
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Save size={16} />
                              Salvar Configurações
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ═══ RESERVAS SECTION ═══ */}
              {activeSection === 'reservas' && (
                <div>
                  <SectionHeader title="Gerenciar Reservas" />
                  {loading.reservas ? <TableSkeleton cols={7} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Associado</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Núcleo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Acomodação</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Check-in</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Check-out</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Status</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservasData.map((r) => {
                            const assoc = r.associado as Record<string, string> | undefined;
                            const acom = r.acomodacao as Record<string, string> | undefined;
                            const nucleo = NUCLEOS.find(n => n.id === r.nucleo_id);
                            const status = r.status as string;
                            const statusColors: Record<string, string> = { pendente: 'bg-amber-50 text-amber-700', confirmada: 'bg-emerald-50 text-emerald-700', cancelada: 'bg-red-50 text-red-600', concluida: 'bg-blue-50 text-blue-700' };
                            return (
                              <tr key={r.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{assoc?.nome || '—'}</td>
                                <td className="px-4 py-3 text-gray-500">{nucleo?.nome || r.nucleo_id as string}</td>
                                <td className="px-4 py-3 text-gray-500">{acom?.nome || '—'}</td>
                                <td className="px-4 py-3 text-gray-500">{r.check_in as string}</td>
                                <td className="px-4 py-3 text-gray-500">{r.check_out as string}</td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {status === 'pendente' && (
                                    <div className="flex justify-end gap-1">
                                      <button onClick={async () => { await atualizarStatusReserva(r.id as string, 'confirmada'); showToast('Reserva aprovada'); loadSection('reservas'); }} className="px-2 py-1 text-xs font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700">Aprovar</button>
                                      <button onClick={async () => { await atualizarStatusReserva(r.id as string, 'cancelada'); showToast('Reserva rejeitada'); loadSection('reservas'); }} className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">Rejeitar</button>
                                    </div>
                                  )}
                                  {status === 'confirmada' && (
                                    <button onClick={async () => { await atualizarStatusReserva(r.id as string, 'concluida'); showToast('Reserva concluída'); loadSection('reservas'); }} className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">Concluir</button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          {reservasData.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhuma reserva encontrada</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ ASSOCIADOS SECTION ═══ */}
              {activeSection === 'associados' && (
                <div>
                  <SectionHeader title="Associados" onAdd={() => {
                    setNovoAssociadoSenha('');
                    openEditModal('associados', { cpf: '', nome: '', email: '', telefone: '', tipo: 'titular', ativo: true });
                  }} />
                  {loading.associados ? <TableSkeleton cols={5} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">CPF</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Tipo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Ativo</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {associadosData.map((a) => (
                            <tr key={a.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900">{a.nome as string}</td>
                              <td className="px-4 py-3 text-gray-500 font-mono text-xs">{(a.cpf as string).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
                              <td className="px-4 py-3"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{a.tipo as string}</span></td>
                              <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{a.ativo ? 'Sim' : 'Não'}</span></td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => openEditModal('associados', a)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={14} /></button>
                              </td>
                            </tr>
                          ))}
                          {associadosData.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum associado cadastrado</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ ACOMODAÇÕES SECTION ═══ */}
              {activeSection === 'acomodacoes' && (
                <div>
                  <SectionHeader title="Acomodações" />
                  {loading.acomodacoes ? <TableSkeleton cols={6} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Nome</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Núcleo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Tipo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Capacidade</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Tags</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Ativo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {acomodacoesData.map((ac) => {
                            const nucleo = NUCLEOS.find(n => n.id === ac.nucleo_id);
                            return (
                              <tr key={ac.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{ac.nome as string}</td>
                                <td className="px-4 py-3 text-gray-500">{nucleo?.nome || ac.nucleo_id as string}</td>
                                <td className="px-4 py-3 text-gray-500 capitalize">{ac.tipo as string}</td>
                                <td className="px-4 py-3 text-gray-500">{ac.capacidade as number} pessoas</td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1">
                                    {!!ac.pcd && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-700 rounded">PcD</span>}
                                    {!!ac.pet_friendly && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-50 text-green-700 rounded">Pet</span>}
                                  </div>
                                </td>
                                <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ac.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{ac.ativo ? 'Sim' : 'Não'}</span></td>
                              </tr>
                            );
                          })}
                          {acomodacoesData.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhuma acomodação cadastrada</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ VÍDEOS SECTION ═══ */}
              {activeSection === 'videos' && (
                <div>
                  <SectionHeader
                    title="Vídeos dos Núcleos"
                    onAdd={() => openEditModal('videos', {
                      nucleo_id: 'clube-campo', titulo: '', youtube_url: '', sort_order: 0,
                    })}
                  />
                  {loading.videos ? <TableSkeleton cols={4} /> : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Núcleo</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">URL YouTube</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videosData.map((v) => {
                            const nucleo = NUCLEOS.find(n => n.id === v.nucleo_id);
                            return (
                              <tr key={v.id as string} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{v.titulo as string}</td>
                                <td className="px-4 py-3 text-gray-500">{nucleo?.nome || v.nucleo_id as string}</td>
                                <td className="px-4 py-3 text-blue-600 text-xs font-mono truncate max-w-[200px]">
                                  <a href={v.youtube_url as string} target="_blank" rel="noopener noreferrer">{v.youtube_url as string}</a>
                                </td>
                                <td className="px-4 py-3 text-right flex justify-end gap-1">
                                  <button onClick={() => openEditModal('videos', v)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={14} /></button>
                                  <button onClick={() => handleDelete('videos', v.id as string)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                                </td>
                              </tr>
                            );
                          })}
                          {videosData.length === 0 && (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum vídeo cadastrado. Adicione URLs do YouTube para cada núcleo.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ─── Edit Modal ─────────────────────────────────────── */}
      <EditModal
        title={editingItem?.id ? 'Editar' : 'Novo'}
        open={editModalOpen}
        onClose={() => { setEditModalOpen(false); setEditingItem(null); }}
      >
        {editingItem && (
          <div className="space-y-4">
            {/* CAROUSEL MODAL */}
            {editModalSection === 'carousel' && (
              <>
                <Field label="Título" value={(editingItem.title as string) || ''} onChange={(v) => updateEditingField('title', v)} />
                <Field label="Badge" value={(editingItem.badge as string) || ''} onChange={(v) => updateEditingField('badge', v)} />
                <div className="flex items-center gap-3">
                  <Field label="Cor do Badge" value={(editingItem.badge_color as string) || '#6366F1'} onChange={(v) => updateEditingField('badge_color', v)} type="color" />
                </div>
                <Field label="Descrição" value={(editingItem.description as string) || ''} onChange={(v) => updateEditingField('description', v)} type="textarea" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Botao CTA" value={(editingItem.cta as string) || ''} onChange={(v) => updateEditingField('cta', v)} />
                  <Field label="Link" value={(editingItem.href as string) || ''} onChange={(v) => updateEditingField('href', v)} placeholder="/" />
                </div>
                <Field label="Ativo" value={editingItem.enabled as boolean} onChange={(v) => updateEditingField('enabled', v === 'true')} type="checkbox" />
              </>
            )}

            {/* EVENTOS MODAL */}
            {editModalSection === 'eventos' && (
              <>
                <Field label="Título" value={(editingItem.titulo as string) || ''} onChange={(v) => updateEditingField('titulo', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Data" value={(editingItem.data as string) || ''} onChange={(v) => updateEditingField('data', v)} placeholder="Ex: 18/01" />
                  <Field label="Horario" value={(editingItem.horario as string) || ''} onChange={(v) => updateEditingField('horario', v)} placeholder="Ex: 14:00" />
                </div>
                <Field label="Local" value={(editingItem.local as string) || ''} onChange={(v) => updateEditingField('local', v)} />
                <Field
                  label="Mes"
                  value={(editingItem.mes as string) || 'Janeiro'}
                  onChange={(v) => updateEditingField('mes', v)}
                  type="select"
                  options={['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']}
                />
                <Field label="Departamento" value={(editingItem.departamento as string) || ''} onChange={(v) => updateEditingField('departamento', v)} />
                <Field label="Ativo" value={editingItem.enabled as boolean} onChange={(v) => updateEditingField('enabled', v === 'true')} type="checkbox" />
              </>
            )}

            {/* BOLETIM MODAL */}
            {editModalSection === 'boletim' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Numero" value={(editingItem.numero as number) || 0} onChange={(v) => updateEditingField('numero', parseInt(v) || 0)} type="number" />
                  <Field label="Data" value={(editingItem.data as string) || ''} onChange={(v) => updateEditingField('data', v)} placeholder="Marco 2026" />
                </div>
                <Field label="Título" value={(editingItem.titulo as string) || ''} onChange={(v) => updateEditingField('titulo', v)} />
                <Field label="Resumo" value={(editingItem.resumo as string) || ''} onChange={(v) => updateEditingField('resumo', v)} type="textarea" />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">PDF do Boletim</label>
                  {!!editingItem.pdf_path && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-green-50 rounded-lg text-xs text-green-700">
                      <FileText size={14} />
                      PDF enviado
                    </div>
                  )}
                  <FileUpload
                    bucket="aes-boletins"
                    accept=".pdf"
                    label="Arraste o PDF do boletim aqui"
                    onUploaded={(url) => updateEditingField('pdf_path', url)}
                  />
                </div>
              </>
            )}

            {/* REPRESENTANTES MODAL */}
            {editModalSection === 'representantes' && (
              <>
                <Field label="Nome" value={(editingItem.nome as string) || ''} onChange={(v) => updateEditingField('nome', v)} />
                <Field label="Cargo" value={(editingItem.cargo as string) || ''} onChange={(v) => updateEditingField('cargo', v)} />
                <Field
                  label="Categoria"
                  value={(editingItem.categoria as string) || 'conselho-deliberativo'}
                  onChange={(v) => updateEditingField('categoria', v)}
                  type="select"
                  options={['conselho-deliberativo','conselho-fiscal','diretoria-executiva','diretores-departamentos','representantes-regionais']}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Regional" value={(editingItem.regional as string) || ''} onChange={(v) => updateEditingField('regional', v)} />
                  <Field label="Unidade" value={(editingItem.unidade as string) || ''} onChange={(v) => updateEditingField('unidade', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" value={(editingItem.email as string) || ''} onChange={(v) => updateEditingField('email', v)} type="email" />
                  <Field label="Telefone" value={(editingItem.telefone as string) || ''} onChange={(v) => updateEditingField('telefone', v)} />
                </div>
              </>
            )}

            {/* GALERIA MODAL */}
            {editModalSection === 'galeria' && (
              <>
                <Field label="Título" value={(editingItem.titulo as string) || ''} onChange={(v) => updateEditingField('titulo', v)} />
                <Field label="Descrição" value={(editingItem.descricao as string) || ''} onChange={(v) => updateEditingField('descricao', v)} type="textarea" />
                <Field
                  label="Categoria"
                  value={(editingItem.categoria as string) || 'Eventos'}
                  onChange={(v) => updateEditingField('categoria', v)}
                  type="select"
                  options={['Eventos','Clube de Campo','Clube Náutico','Colônia de Férias','Esportivo','Institucional']}
                />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Imagem</label>
                  {!!editingItem.image_path && (
                    <div className="mb-2">
                      <img src={editingItem.image_path as string} alt="" className="w-24 h-24 rounded-lg object-cover border border-gray-200" />
                    </div>
                  )}
                  <FileUpload
                    bucket="aes-galeria"
                    accept="image/*"
                    label="Arraste a imagem aqui (JPG, PNG, WebP)"
                    onUploaded={(url) => updateEditingField('image_path', url)}
                  />
                </div>
              </>
            )}

            {/* DOCUMENTOS MODAL */}
            {editModalSection === 'documentos' && (
              <>
                <Field label="Título" value={(editingItem.titulo as string) || ''} onChange={(v) => updateEditingField('titulo', v)} />
                <Field label="Descrição" value={(editingItem.descricao as string) || ''} onChange={(v) => updateEditingField('descricao', v)} type="textarea" />
                <Field
                  label="Categoria"
                  value={(editingItem.categoria as string) || 'Comunicados'}
                  onChange={(v) => updateEditingField('categoria', v)}
                  type="select"
                  options={['Comunicados','Estatuto e Regulamentos','Relatorios','Formularios']}
                />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Arquivo</label>
                  {!!editingItem.file_name && (
                    <div className="flex items-center gap-2 mb-2 p-2 bg-green-50 rounded-lg text-xs text-green-700">
                      <FileText size={14} />
                      {editingItem.file_name as string}
                    </div>
                  )}
                  <FileUpload
                    bucket="aes-documentos"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    label="Arraste o arquivo aqui"
                    onUploaded={(url, fileName) => {
                      updateEditingField('file_path', url);
                      updateEditingField('file_name', fileName);
                    }}
                  />
                </div>
              </>
            )}

            {/* PARCERIAS MODAL */}
            {editModalSection === 'parcerias' && (
              <>
                <Field label="Nome do Parceiro" value={(editingItem.nome as string) || ''} onChange={(v) => updateEditingField('nome', v)} />
                <Field
                  label="Categoria"
                  value={(editingItem.categoria as string) || 'Outros'}
                  onChange={(v) => updateEditingField('categoria', v)}
                  type="select"
                  options={['Idiomas','Fitness','Hospedagem','Educacao','Eletrodomesticos','Bem-estar','Instituto','Outros']}
                />
                <Field label="Descrição" value={(editingItem.descricao as string) || ''} onChange={(v) => updateEditingField('descricao', v)} type="textarea" />
                <Field label="Destaque" value={(editingItem.destaque as string) || ''} onChange={(v) => updateEditingField('destaque', v)} placeholder="Ex: 40% desconto" />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Contato" value={(editingItem.contato as string) || ''} onChange={(v) => updateEditingField('contato', v)} placeholder="Tel / WhatsApp" />
                  <Field label="Site" value={(editingItem.site as string) || ''} onChange={(v) => updateEditingField('site', v)} placeholder="site.com.br" />
                  <Field label="Instagram" value={(editingItem.instagram as string) || ''} onChange={(v) => updateEditingField('instagram', v)} placeholder="@perfil" />
                </div>
              </>
            )}

            {/* SEGUROS MODAL */}
            {editModalSection === 'seguros' && (
              <>
                <Field label="Nome" value={(editingItem.nome as string) || ''} onChange={(v) => updateEditingField('nome', v)} />
                <Field label="Tipo" value={(editingItem.tipo as string) || ''} onChange={(v) => updateEditingField('tipo', v)} />
                <Field label="Descrição" value={(editingItem.descricao as string) || ''} onChange={(v) => updateEditingField('descricao', v)} type="textarea" />
                <Field label="Contato" value={(editingItem.contato as string) || ''} onChange={(v) => updateEditingField('contato', v)} />
              </>
            )}

            {editModalSection === 'planos' && (
              <>
                <Field label="Nome do Plano" value={(editingItem.tipo as string) || ''} onChange={(v) => updateEditingField('tipo', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo do Plano</label>
                    <select value={(editingItem.tipo_plano as string) || 'odontologico'} onChange={(e) => updateEditingField('tipo_plano', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="odontologico">Odontológico</option>
                      <option value="medico">Médico</option>
                    </select>
                  </div>
                  <Field label="Operadora" value={(editingItem.operadora as string) || ''} onChange={(v) => updateEditingField('operadora', v)} />
                </div>
                <Field label="Cobertura" value={(editingItem.cobertura as string) || ''} onChange={(v) => updateEditingField('cobertura', v)} type="textarea" />
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={!!editingItem.aberto} onChange={(e) => updateEditingField('aberto', e.target.checked)} className="rounded" />
                    Aberto para novas adesões
                  </label>
                </div>
              </>
            )}

            {editModalSection === 'videos' && (
              <>
                <Field label="Título do Vídeo" value={(editingItem.titulo as string) || ''} onChange={(v) => updateEditingField('titulo', v)} />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Núcleo</label>
                  <select value={(editingItem.nucleo_id as string) || 'clube-campo'} onChange={(e) => updateEditingField('nucleo_id', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="clube-campo">Clube de Campo</option>
                    <option value="clube-nautico">Clube Náutico</option>
                    <option value="colonia-ferias">Colônia de Férias</option>
                  </select>
                </div>
                <Field label="URL do YouTube" value={(editingItem.youtube_url as string) || ''} onChange={(v) => updateEditingField('youtube_url', v)} />
                <p className="text-xs text-gray-400">Ex: https://www.youtube.com/watch?v=XXXXX ou https://youtu.be/XXXXX</p>
              </>
            )}

            {editModalSection === 'associados' && (
              <>
                <Field label="Nome completo" value={(editingItem.nome as string) || ''} onChange={(v) => updateEditingField('nome', v)} />
                <Field label="CPF (apenas números)" value={(editingItem.cpf as string) || ''} onChange={(v) => updateEditingField('cpf', v.replace(/\D/g, ''))} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="E-mail" value={(editingItem.email as string) || ''} onChange={(v) => updateEditingField('email', v)} />
                  <Field label="Telefone" value={(editingItem.telefone as string) || ''} onChange={(v) => updateEditingField('telefone', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
                    <select value={(editingItem.tipo as string) || 'titular'} onChange={(e) => updateEditingField('tipo', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="titular">Titular</option>
                      <option value="dependente">Dependente</option>
                      <option value="agregado">Agregado</option>
                    </select>
                  </div>
                  <Field label={editingItem.id ? 'Nova senha (deixe vazio para manter)' : 'Senha inicial'} value={novoAssociadoSenha} onChange={setNovoAssociadoSenha} />
                </div>
                {editingItem.id && (
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={!!editingItem.ativo} onChange={(e) => updateEditingField('ativo', e.target.checked)} className="rounded" />
                    Associado ativo
                  </label>
                )}
              </>
            )}

            {/* Save button */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleSaveModal}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                Salvar
              </button>
              <button
                onClick={() => { setEditModalOpen(false); setEditingItem(null); }}
                className="px-4 py-2.5 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </EditModal>

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} />
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
          <h1 className="text-white font-bold text-lg mb-2">Associacao dos Empregados do SENAI</h1>
          <p className="text-white/80 text-xs mb-4 max-w-md mx-auto">Qualidade de vida para associados desde 1947</p>
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-1.5 bg-white text-xs font-semibold" style={{ color: c.primary, borderRadius: radius }}>Area do Associado</button>
            <button className="px-4 py-1.5 border border-white/50 text-white text-xs" style={{ borderRadius: radius }}>Fale Conosco</button>
          </div>
        </div>
      )}

      {design.heroStyle === 'split' && (
        <div className={`${spacing} px-6`} style={{ background: `linear-gradient(135deg, ${c.primary}15, ${c.primaryLight})` }}>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 items-center`}>
            <div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: c.primaryLight, color: c.primary }}>Desde 1947</span>
              <h1 className="font-bold text-xl mt-2 mb-2" style={{ color: c.foreground }}>Associacao dos Empregados do SENAI</h1>
              <p className="text-xs mb-4" style={{ color: c.foregroundMuted }}>Qualidade de vida para associados e dependentes</p>
              <button className="px-4 py-1.5 text-white text-xs font-semibold" style={{ backgroundColor: c.primary, borderRadius: radius }}>Area do Associado</button>
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
            <h1 className="font-light text-2xl mb-3 tracking-tight" style={{ color: c.foreground }}>Associacao dos Empregados do SENAI</h1>
            <p className="text-xs leading-relaxed mb-6" style={{ color: c.foregroundMuted }}>Proporcionando qualidade de vida aos associados, dependentes e agregados desde 1947.</p>
            <button className="text-xs font-medium flex items-center gap-1" style={{ color: c.primary }}>Conhecer a AES <ArrowRight size={12} /></button>
          </div>
        </div>
      )}

      {/* SERVICES */}
      <div className={`${spacing} px-6`} style={{ backgroundColor: c.surface }}>
        <h2 className="font-semibold text-base mb-1 text-center" style={{ color: c.foreground }}>Nossos Serviços</h2>
        <p className="text-[10px] text-center mb-6" style={{ color: c.foregroundMuted }}>Beneficios exclusivos para associados</p>
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
          {[
            { icon: Heart, label: 'Assistencia Medica', desc: 'UNIMED FESP' },
            { icon: Shield, label: 'Fundo Mutuo', desc: 'FUMUS' },
            { icon: TreePalm, label: 'Lazer', desc: '3 Núcleos' },
            { icon: Users, label: 'Odontologico', desc: 'Rede credenciada' },
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
            { name: 'Clube de Campo', loc: 'Jundiai/SP', price: 'R$ 45' },
            { name: 'Clube Náutico', loc: 'Boraceia/SP', price: 'R$ 45' },
            { name: 'Colônia de Férias', loc: 'Itanhaem/SP', price: 'R$ 118' },
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
        <h2 className="text-white font-bold text-base mb-2">Associe-se a AES</h2>
        <p className="text-white/80 text-[10px] mb-4 max-w-sm mx-auto">Beneficios exclusivos para voce e sua familia</p>
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-1.5 bg-white text-xs font-semibold" style={{ color: c.primary, borderRadius: radius }}>Area do Associado</button>
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
              <div>Medico</div>
              <div>FUMUS</div>
              <div>Lazer</div>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-[8px] mb-1">Contato</div>
            <div className="text-gray-400 text-[8px] space-y-0.5">
              <div>(11) 3367-9900</div>
              <div>Bras, Sao Paulo</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-2 text-center text-gray-500 text-[7px]">
          &copy; 2026 AES - Todos os direitos reservados
        </div>
      </div>
    </div>
  );
}
