import { supabase } from './client';

// ─── Table whitelist ──────────────────────────────────────────────

const ALLOWED_TABLES = [
  'site_config', 'site_emails', 'social_links', 'carousel_slides',
  'eventos', 'boletins', 'representantes', 'nucleo_pricing', 'nucleo_precos',
  'planos_saude', 'plano_faixas', 'parceiros_seguro', 'farmacia',
  'galeria', 'documentos', 'parcerias', 'nucleo_videos',
  'associados', 'acomodacoes', 'reservas', 'avaliacoes',
] as const;
type AllowedTable = typeof ALLOWED_TABLES[number];

function validateTable(table: string): void {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    throw new Error(`Table "${table}" is not allowed`);
  }
}

// ─── Generic CRUD helpers ─────────────────────────────────────────

export async function getAll<T>(table: string, orderBy?: string): Promise<T[]> {
  validateTable(table);
  const query = supabase.from(table).select('*');
  if (orderBy) query.order(orderBy);
  const { data, error } = await query;
  if (error) {
    console.error(`getAll ${table}:`, error);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('supabase-error', { detail: { table, error: error.message } }));
    }
    return [];
  }
  return (data ?? []) as T[];
}

export async function getById<T>(table: string, id: string): Promise<T | null> {
  validateTable(table);
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
  if (error) return null;
  return data as T;
}

export async function create<T>(table: string, row: Partial<T>): Promise<T | null> {
  validateTable(table);
  const { data, error } = await supabase.from(table).insert(row as Record<string, unknown>).select().single();
  if (error) { console.error(`create ${table}:`, error); return null; }
  return data as T;
}

export async function update<T>(table: string, id: string, row: Partial<T>): Promise<T | null> {
  validateTable(table);
  const { data, error } = await supabase.from(table).update(row as Record<string, unknown>).eq('id', id).select().single();
  if (error) { console.error(`update ${table}:`, error); return null; }
  return data as T;
}

export async function remove(table: string, id: string): Promise<boolean> {
  validateTable(table);
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) { console.error(`delete ${table}:`, error); return false; }
  return true;
}

export async function upsert<T>(table: string, row: Partial<T>): Promise<T | null> {
  validateTable(table);
  const { data, error } = await supabase.from(table).upsert(row as Record<string, unknown>).select().single();
  if (error) { console.error(`upsert ${table}:`, error); return null; }
  return data as T;
}

// ─── File upload helpers ──────────────────────────────────────────

export async function uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) { console.error(`upload ${bucket}/${path}:`, error); return null; }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) { console.error(`delete file ${bucket}/${path}:`, error); return false; }
  return true;
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ─── Table-specific typed helpers ─────────────────────────────────

// Site Config (singleton)
export const siteConfigService = {
  get: () => getById<Record<string, string>>('site_config', 'main'),
  update: (data: Record<string, string>) => upsert('site_config', { id: 'main', ...data }),
};

// Site Emails
export const siteEmailsService = {
  getAll: () => getAll<{ id: string; label: string; email: string; sort_order: number }>('site_emails', 'sort_order'),
  create: (row: { label: string; email: string; sort_order?: number }) => create('site_emails', row),
  update: (id: string, row: { label?: string; email?: string; sort_order?: number }) => update('site_emails', id, row),
  remove: (id: string) => remove('site_emails', id),
};

// Social Links
export const socialLinksService = {
  getAll: () => getAll<{ id: string; platform: string; url: string; enabled: boolean; sort_order: number }>('social_links', 'sort_order'),
  create: (row: { platform: string; url: string; enabled?: boolean }) => create('social_links', row),
  update: (id: string, row: Record<string, unknown>) => update('social_links', id, row),
  remove: (id: string) => remove('social_links', id),
};

// Carousel
export const carouselService = {
  getAll: () => getAll<{ id: string; badge: string; badge_color: string; title: string; description: string; cta: string; href: string; enabled: boolean; sort_order: number }>('carousel_slides', 'sort_order'),
  create: (row: Record<string, unknown>) => create('carousel_slides', row),
  update: (id: string, row: Record<string, unknown>) => update('carousel_slides', id, row),
  remove: (id: string) => remove('carousel_slides', id),
};

// Eventos
export const eventosService = {
  getAll: () => getAll<{ id: string; titulo: string; data: string; local: string; departamento: string; horario: string; mes: string; enabled: boolean }>('eventos', 'created_at'),
  create: (row: Record<string, unknown>) => create('eventos', row),
  update: (id: string, row: Record<string, unknown>) => update('eventos', id, row),
  remove: (id: string) => remove('eventos', id),
};

// Boletins
export const boletinsService = {
  getAll: () => getAll<{ id: string; numero: number; titulo: string; data: string; resumo: string; pdf_path: string }>('boletins', 'numero'),
  create: (row: Record<string, unknown>) => create('boletins', row),
  update: (id: string, row: Record<string, unknown>) => update('boletins', id, row),
  remove: (id: string) => remove('boletins', id),
};

// Representantes
export const representantesService = {
  getAll: () => getAll<{ id: string; nome: string; cargo: string; categoria: string; regional: string; unidade: string; email: string; telefone: string; sort_order: number }>('representantes', 'sort_order'),
  create: (row: Record<string, unknown>) => create('representantes', row),
  update: (id: string, row: Record<string, unknown>) => update('representantes', id, row),
  remove: (id: string) => remove('representantes', id),
};

// Galeria
export const galeriaService = {
  getAll: () => getAll<{ id: string; titulo: string; descricao: string; categoria: string; image_path: string; created_at: string }>('galeria', 'created_at'),
  create: (row: Record<string, unknown>) => create('galeria', row),
  update: (id: string, row: Record<string, unknown>) => update('galeria', id, row),
  remove: (id: string) => remove('galeria', id),
};

// Documentos
export const documentosService = {
  getAll: () => getAll<{ id: string; titulo: string; descricao: string; categoria: string; file_path: string; file_name: string; created_at: string }>('documentos', 'created_at'),
  create: (row: Record<string, unknown>) => create('documentos', row),
  update: (id: string, row: Record<string, unknown>) => update('documentos', id, row),
  remove: (id: string) => remove('documentos', id),
};

// Parcerias
export const parceriasService = {
  getAll: () => getAll<{ id: string; nome: string; categoria: string; descricao: string; contato: string; site: string; instagram: string; destaque: string; sort_order: number }>('parcerias', 'sort_order'),
  create: (row: Record<string, unknown>) => create('parcerias', row),
  update: (id: string, row: Record<string, unknown>) => update('parcerias', id, row),
  remove: (id: string) => remove('parcerias', id),
};

// Planos Saúde
export const planosSaudeService = {
  getAll: (tipoPlano?: string) => {
    const query = supabase.from('planos_saude').select('*, plano_faixas(*)');
    if (tipoPlano) query.eq('tipo_plano', tipoPlano);
    return query.then(({ data, error }) => {
      if (error) { console.error('planos_saude:', error); return []; }
      return data ?? [];
    });
  },
  create: (row: Record<string, unknown>) => create('planos_saude', row),
  update: (id: string, row: Record<string, unknown>) => update('planos_saude', id, row),
  remove: (id: string) => remove('planos_saude', id),
};

// Parceiros Seguro
export const parceirosSeguroService = {
  getAll: () => getAll<{ id: string; nome: string; tipo: string; descricao: string; contato: string }>('parceiros_seguro'),
  create: (row: Record<string, unknown>) => create('parceiros_seguro', row),
  update: (id: string, row: Record<string, unknown>) => update('parceiros_seguro', id, row),
  remove: (id: string) => remove('parceiros_seguro', id),
};

// Farmácia (singleton)
export const farmaciaService = {
  get: () => getById<{ id: string; rede: string; descricao: string; restricao: string; contato: string }>('farmacia', 'main'),
  update: (data: Record<string, string>) => upsert('farmacia', { id: 'main', ...data }),
};

// Nucleo Pricing
export const nucleoPricingService = {
  getAll: async () => {
    const { data, error } = await supabase.from('nucleo_pricing').select('*, nucleo_precos(*)');
    if (error) { console.error('nucleo_pricing:', error); return []; }
    return data ?? [];
  },
  update: (id: string, row: Record<string, unknown>) => update('nucleo_pricing', id, row),
};

export const nucleoPrecosService = {
  create: (row: Record<string, unknown>) => create('nucleo_precos', row),
  update: (id: string, row: Record<string, unknown>) => update('nucleo_precos', id, row),
  remove: (id: string) => remove('nucleo_precos', id),
};

// Núcleo Videos
export const nucleoVideosService = {
  getAll: (nucleoId?: string) => {
    const query = supabase.from('nucleo_videos').select('*').order('sort_order');
    if (nucleoId) query.eq('nucleo_id', nucleoId);
    return query.then(({ data, error }) => {
      if (error) { console.error('nucleo_videos:', error); return []; }
      return data ?? [];
    });
  },
  create: (row: Record<string, unknown>) => create('nucleo_videos', row),
  update: (id: string, row: Record<string, unknown>) => update('nucleo_videos', id, row),
  remove: (id: string) => remove('nucleo_videos', id),
};

export const planoFaixasService = {
  create: (row: Record<string, unknown>) => create('plano_faixas', row),
  update: (id: string, row: Record<string, unknown>) => update('plano_faixas', id, row),
  remove: (id: string) => remove('plano_faixas', id),
};
