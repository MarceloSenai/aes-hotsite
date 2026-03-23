import { supabase } from './client';

export interface Acomodacao {
  id: string;
  nucleo_id: string;
  nome: string;
  tipo: string;
  capacidade: number;
  pcd: boolean;
  pet_friendly: boolean;
  ativo: boolean;
}

export interface Reserva {
  id: string;
  associado_id: string;
  acomodacao_id: string;
  nucleo_id: string;
  check_in: string;
  check_out: string;
  num_hospedes: number;
  valor_total: number | null;
  status: 'pendente' | 'confirmada' | 'cancelada' | 'concluida';
  observacoes: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  acomodacao?: Acomodacao;
  associado?: { nome: string; cpf: string; email: string };
}

export interface Avaliacao {
  id: string;
  reserva_id: string;
  nota: number;
  comentario: string | null;
  created_at: string;
}

// ─── Acomodações ────────────────────────────────────────

export async function getAcomodacoes(nucleoId?: string): Promise<Acomodacao[]> {
  let query = supabase.from('acomodacoes').select('*').eq('ativo', true);
  if (nucleoId) query = query.eq('nucleo_id', nucleoId);
  const { data, error } = await query.order('nome');
  if (error) return [];
  return (data ?? []) as Acomodacao[];
}

// ─── Disponibilidade ────────────────────────────────────

export async function verificarDisponibilidade(
  nucleoId: string,
  checkIn: string,
  checkOut: string,
): Promise<Acomodacao[]> {
  // Get all active acomodações for this núcleo
  const todas = await getAcomodacoes(nucleoId);

  // Get reservations that overlap with the requested dates
  const { data: reservasOcupadas } = await supabase
    .from('reservas')
    .select('acomodacao_id')
    .eq('nucleo_id', nucleoId)
    .in('status', ['pendente', 'confirmada'])
    .lt('check_in', checkOut)
    .gt('check_out', checkIn);

  const idsOcupados = new Set((reservasOcupadas ?? []).map((r: { acomodacao_id: string }) => r.acomodacao_id));

  // Return only available ones
  return todas.filter((a) => !idsOcupados.has(a.id));
}

// ─── Reservas CRUD ──────────────────────────────────────

export async function criarReserva(data: {
  associado_id: string;
  acomodacao_id: string;
  nucleo_id: string;
  check_in: string;
  check_out: string;
  num_hospedes: number;
  observacoes?: string;
}): Promise<{ ok: boolean; reserva?: Reserva; error?: string }> {
  const { data: reserva, error } = await supabase
    .from('reservas')
    .insert({
      ...data,
      status: 'pendente',
    })
    .select()
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, reserva: reserva as Reserva };
}

export async function getReservasDoAssociado(associadoId: string): Promise<Reserva[]> {
  const { data, error } = await supabase
    .from('reservas')
    .select('*, acomodacoes(*)')
    .eq('associado_id', associadoId)
    .order('check_in', { ascending: false });

  if (error) return [];
  return (data ?? []).map((r: Record<string, unknown>) => ({
    ...r,
    acomodacao: r.acomodacoes,
  })) as Reserva[];
}

export async function getTodasReservas(): Promise<Reserva[]> {
  const { data, error } = await supabase
    .from('reservas')
    .select('*, acomodacoes(*), associados(nome, cpf, email)')
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data ?? []).map((r: Record<string, unknown>) => ({
    ...r,
    acomodacao: r.acomodacoes,
    associado: r.associados,
  })) as Reserva[];
}

export async function atualizarStatusReserva(
  reservaId: string,
  status: Reserva['status'],
): Promise<boolean> {
  const { error } = await supabase
    .from('reservas')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', reservaId);
  return !error;
}

export async function cancelarReserva(reservaId: string): Promise<boolean> {
  return atualizarStatusReserva(reservaId, 'cancelada');
}

// ─── Avaliações ─────────────────────────────────────────

export async function avaliarReserva(
  reservaId: string,
  nota: number,
  comentario?: string,
): Promise<boolean> {
  const { error } = await supabase.from('avaliacoes').insert({
    reserva_id: reservaId,
    nota,
    comentario: comentario || null,
  });
  return !error;
}

export async function getAvaliacao(reservaId: string): Promise<Avaliacao | null> {
  const { data } = await supabase
    .from('avaliacoes')
    .select('*')
    .eq('reserva_id', reservaId)
    .single();
  return data as Avaliacao | null;
}

// ─── Núcleo helpers ─────────────────────────────────────

export const NUCLEOS = [
  { id: 'clube-campo', nome: 'Clube de Campo', local: 'Jundiaí/SP' },
  { id: 'clube-nautico', nome: 'Clube Náutico', local: 'Boracéia/SP' },
  { id: 'colonia-ferias', nome: 'Colônia de Férias', local: 'Itanhaém/SP' },
];
