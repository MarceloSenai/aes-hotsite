import bcrypt from 'bcryptjs';
import { supabase } from './client';

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

// ─── Hash & verify ─────────────────────────────────────

export async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, 12);
}

export async function verifySenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash);
}

// ─── Login ──────────────────────────────────────────────

export async function login(cpf: string, senha: string): Promise<{ ok: boolean; associado?: Associado; error?: string }> {
  const cpfLimpo = cpf.replace(/\D/g, '');

  const { data, error } = await supabase
    .from('associados')
    .select('*')
    .eq('cpf', cpfLimpo)
    .single();

  if (error || !data) {
    return { ok: false, error: 'CPF não encontrado.' };
  }

  if (!data.ativo) {
    return { ok: false, error: 'Conta desativada. Entre em contato com a AES.' };
  }

  const senhaValida = await verifySenha(senha, data.senha_hash);
  if (!senhaValida) {
    return { ok: false, error: 'Senha incorreta.' };
  }

  // Save session with expiration
  const { senha_hash: _, ...associado } = data;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...associado, expiresAt: Date.now() + SESSION_TTL }));

  return { ok: true, associado: associado as Associado };
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
  const cpfLimpo = data.cpf.replace(/\D/g, '');
  const hash = await hashSenha(data.senha);

  const { error } = await supabase.from('associados').insert({
    cpf: cpfLimpo,
    nome: data.nome,
    email: data.email || null,
    telefone: data.telefone || null,
    senha_hash: hash,
    tipo: data.tipo || 'titular',
    ativo: true,
  });

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'CPF já cadastrado.' };
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

// ─── Admin: list associados ─────────────────────────────

export async function listarAssociados(): Promise<Associado[]> {
  const { data, error } = await supabase
    .from('associados')
    .select('id, cpf, nome, email, telefone, tipo, ativo, created_at')
    .order('nome');

  if (error) return [];
  return (data ?? []) as Associado[];
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
  const payload: Record<string, unknown> = {};
  if (updates.nome !== undefined) payload.nome = updates.nome;
  if (updates.email !== undefined) payload.email = updates.email;
  if (updates.telefone !== undefined) payload.telefone = updates.telefone;
  if (updates.tipo !== undefined) payload.tipo = updates.tipo;
  if (updates.ativo !== undefined) payload.ativo = updates.ativo;
  if (updates.novaSenha) payload.senha_hash = await hashSenha(updates.novaSenha);

  const { error } = await supabase.from('associados').update(payload).eq('id', id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
