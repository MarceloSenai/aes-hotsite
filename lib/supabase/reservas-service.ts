// ─── Reservas Service (migrated from Supabase to API routes) ─────

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
  try {
    const url = nucleoId ? `/api/reservas/acomodacoes?nucleo_id=${nucleoId}` : '/api/reservas/acomodacoes';
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ─── Disponibilidade ────────────────────────────────────

export async function verificarDisponibilidade(
  nucleoId: string,
  checkIn: string,
  checkOut: string,
): Promise<Acomodacao[]> {
  try {
    const params = new URLSearchParams({ nucleo_id: nucleoId, check_in: checkIn, check_out: checkOut });
    const res = await fetch(`/api/reservas/disponibilidade?${params}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
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
  try {
    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) return { ok: false, error: result.error || 'Erro ao criar reserva.' };
    return { ok: true, reserva: result as Reserva };
  } catch {
    return { ok: false, error: 'Erro de conexão.' };
  }
}

export async function getReservasDoAssociado(associadoId: string): Promise<Reserva[]> {
  try {
    const res = await fetch(`/api/reservas?associado_id=${associadoId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getTodasReservas(): Promise<Reserva[]> {
  try {
    const res = await fetch('/api/reservas?all=true');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function atualizarStatusReserva(
  reservaId: string,
  status: Reserva['status'],
): Promise<boolean> {
  try {
    const res = await fetch('/api/reservas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reservaId, status }),
    });
    return res.ok;
  } catch {
    return false;
  }
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
  try {
    const res = await fetch('/api/reservas/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reserva_id: reservaId, nota, comentario: comentario || null }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getAvaliacao(reservaId: string): Promise<Avaliacao | null> {
  try {
    const res = await fetch(`/api/reservas/avaliacoes?reserva_id=${reservaId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Núcleo helpers ─────────────────────────────────────

export const NUCLEOS = [
  { id: 'clube-campo', nome: 'Clube de Campo', local: 'Jundiaí/SP' },
  { id: 'clube-nautico', nome: 'Clube Náutico', local: 'Boracéia/SP' },
  { id: 'colonia-ferias', nome: 'Colônia de Férias', local: 'Itanhaém/SP' },
];
