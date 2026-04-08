// ─── Data Service (migrated from Supabase to API routes) ─────────

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function patchJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function deleteJson(url: string, id: string): Promise<boolean> {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.ok;
}

// ─── Generic CRUD helpers ─────────────────────────────────────────

export async function getAll<T>(table: string, _orderBy?: string): Promise<T[]> {
  try {
    return await fetchJson<T[]>(`/api/data/${table}`);
  } catch (error) {
    console.error(`getAll ${table}:`, error);
    return [];
  }
}

export async function getById<T>(table: string, _id: string): Promise<T | null> {
  try {
    const data = await fetchJson<T>(`/api/data/${table}`);
    return data;
  } catch {
    return null;
  }
}

export async function create<T>(table: string, row: Partial<T>): Promise<T | null> {
  try {
    return await postJson<T>(`/api/data/${table}`, row);
  } catch (error) {
    console.error(`create ${table}:`, error);
    return null;
  }
}

export async function update<T>(table: string, id: string, row: Partial<T>): Promise<T | null> {
  try {
    return await patchJson<T>(`/api/data/${table}`, { id, ...row });
  } catch (error) {
    console.error(`update ${table}:`, error);
    return null;
  }
}

export async function remove(table: string, id: string): Promise<boolean> {
  try {
    return await deleteJson(`/api/data/${table}`, id);
  } catch (error) {
    console.error(`delete ${table}:`, error);
    return false;
  }
}

export async function upsert<T>(table: string, row: Partial<T>): Promise<T | null> {
  try {
    return await postJson<T>(`/api/data/${table}`, row);
  } catch (error) {
    console.error(`upsert ${table}:`, error);
    return null;
  }
}

// ─── File helpers (Azure Blob Storage) ───────────────────────────

export async function uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('container', bucket);
    formData.append('path', path);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!res.ok) return null;
    const { url } = await res.json();
    return url;
  } catch (error) {
    console.error(`upload ${bucket}/${path}:`, error);
    return null;
  }
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const res = await fetch('/api/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ container: bucket, path }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function getPublicUrl(bucket: string, path: string): string {
  return `https://aeshotsitefiles.blob.core.windows.net/${bucket}/${path}`;
}

// ─── Table-specific typed helpers ─────────────────────────────────

// Site Config (singleton)
export const siteConfigService = {
  get: () => getById<Record<string, string>>('site_config', 'main'),
  update: (data: Record<string, string>) => upsert('site_config', { id: 'main', ...data }),
};

// Site Emails
export const siteEmailsService = {
  getAll: () => getAll<{ id: string; label: string; email: string; sort_order: number }>('site_emails'),
  create: (row: { label: string; email: string; sort_order?: number }) => create('site_emails', row),
  update: (id: string, row: { label?: string; email?: string; sort_order?: number }) => update('site_emails', id, row),
  remove: (id: string) => remove('site_emails', id),
};

// Social Links
export const socialLinksService = {
  getAll: () => getAll<{ id: string; platform: string; url: string; enabled: boolean; sort_order: number }>('social_links'),
  create: (row: { platform: string; url: string; enabled?: boolean }) => create('social_links', row),
  update: (id: string, row: Record<string, unknown>) => update('social_links', id, row),
  remove: (id: string) => remove('social_links', id),
};

// Carousel
export const carouselService = {
  getAll: () => getAll<{ id: string; badge: string; badge_color: string; title: string; description: string; cta: string; href: string; enabled: boolean; sort_order: number }>('carousel_slides'),
  create: (row: Record<string, unknown>) => create('carousel_slides', row),
  update: (id: string, row: Record<string, unknown>) => update('carousel_slides', id, row),
  remove: (id: string) => remove('carousel_slides', id),
};

// Eventos
export const eventosService = {
  getAll: () => getAll<{ id: string; titulo: string; data: string; local: string; departamento: string; horario: string; mes: string; enabled: boolean }>('eventos'),
  create: (row: Record<string, unknown>) => create('eventos', row),
  update: (id: string, row: Record<string, unknown>) => update('eventos', id, row),
  remove: (id: string) => remove('eventos', id),
};

// Boletins
export const boletinsService = {
  getAll: () => getAll<{ id: string; numero: number; titulo: string; data: string; resumo: string; pdf_path: string }>('boletins'),
  create: (row: Record<string, unknown>) => create('boletins', row),
  update: (id: string, row: Record<string, unknown>) => update('boletins', id, row),
  remove: (id: string) => remove('boletins', id),
};

// Representantes
export const representantesService = {
  getAll: () => getAll<{ id: string; nome: string; cargo: string; categoria: string; regional: string; unidade: string; email: string; telefone: string; sort_order: number }>('representantes'),
  create: (row: Record<string, unknown>) => create('representantes', row),
  update: (id: string, row: Record<string, unknown>) => update('representantes', id, row),
  remove: (id: string) => remove('representantes', id),
};

// Galeria
export const galeriaService = {
  getAll: () => getAll<{ id: string; titulo: string; descricao: string; categoria: string; image_path: string; created_at: string }>('galeria'),
  create: (row: Record<string, unknown>) => create('galeria', row),
  update: (id: string, row: Record<string, unknown>) => update('galeria', id, row),
  remove: (id: string) => remove('galeria', id),
};

// Documentos
export const documentosService = {
  getAll: () => getAll<{ id: string; titulo: string; descricao: string; categoria: string; file_path: string; file_name: string; created_at: string }>('documentos'),
  create: (row: Record<string, unknown>) => create('documentos', row),
  update: (id: string, row: Record<string, unknown>) => update('documentos', id, row),
  remove: (id: string) => remove('documentos', id),
};

// Parcerias
export const parceriasService = {
  getAll: () => getAll<{ id: string; nome: string; categoria: string; descricao: string; contato: string; site: string; instagram: string; destaque: string; sort_order: number }>('parcerias'),
  create: (row: Record<string, unknown>) => create('parcerias', row),
  update: (id: string, row: Record<string, unknown>) => update('parcerias', id, row),
  remove: (id: string) => remove('parcerias', id),
};

// Planos Saúde
export const planosSaudeService = {
  getAll: async (tipoPlano?: string) => {
    try {
      const url = tipoPlano ? `/api/data/planos-saude?tipo_plano=${tipoPlano}` : '/api/data/planos-saude';
      return await fetchJson<unknown[]>(url);
    } catch (error) {
      console.error('planos_saude:', error);
      return [];
    }
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
    try {
      return await fetchJson<unknown[]>('/api/data/nucleo-pricing');
    } catch (error) {
      console.error('nucleo_pricing:', error);
      return [];
    }
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
  getAll: async (nucleoId?: string) => {
    try {
      const url = nucleoId ? `/api/data/nucleo_videos?nucleo_id=${nucleoId}` : '/api/data/nucleo_videos';
      return await fetchJson<unknown[]>(url);
    } catch (error) {
      console.error('nucleo_videos:', error);
      return [];
    }
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
