// ─── Auth Service (migrated from Supabase to API routes) ─────────

export interface Associado {
  id: string;
  cpf: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  tipo: string;
  ativo: boolean;
  created_at: string;
}

const SESSION_KEY = 'aes-session';
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

// ─── Login ──────────────────────────────────────────────

export async function login(cpf: string, senha: string): Promise<{ ok: boolean; associado?: Associado; error?: string }> {
  try {
    const res = await fetch('/api/auth/associado/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, senha }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || 'Erro ao fazer login.' };
    }

    // Save session with expiration
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data.associado, expiresAt: Date.now() + SESSION_TTL }));

    return { ok: true, associado: data.associado as Associado };
  } catch (error) {
    console.error('login error:', error);
    return { ok: false, error: 'Erro de conexão. Tente novamente.' };
  }
}

// ─── Session ────────────────────────────────────────────

export function getSession(): Associado | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return parsed as Associado;
    }
  } catch { /* ignore */ }
  return null;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}

// ─── Admin: create associado ────────────────────────────

export async function criarAssociado(data: {
  cpf: string;
  nome: string;
  email?: string;
  telefone?: string;
  senha: string;
  tipo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/associado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) return { ok: false, error: result.error || 'Erro ao criar associado.' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Erro de conexão.' };
  }
}

// ─── Admin: list associados ─────────────────────────────

export async function listarAssociados(): Promise<Associado[]> {
  try {
    const res = await fetch('/api/auth/associado');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ─── Admin: update associado ────────────────────────────

export async function atualizarAssociado(id: string, updates: {
  nome?: string;
  email?: string;
  telefone?: string;
  tipo?: string;
  ativo?: boolean;
  novaSenha?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/associado', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });

    const result = await res.json();
    if (!res.ok) return { ok: false, error: result.error || 'Erro ao atualizar.' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Erro de conexão.' };
  }
}
