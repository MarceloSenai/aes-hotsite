/**
 * Site configuration — editable from admin panel.
 * Stored in localStorage, Supabase-ready.
 */

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

export interface CarouselSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  enabled: boolean;
}

export interface NucleoPreco {
  categoria: string;
  associado: string;
  dependente: string;
  convidado: string;
}

export interface NucleoPricing {
  id: string;
  nome: string;
  precos: NucleoPreco[];
  dayUse?: string;
  criançasInfo?: string;
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  local: string;
  departamento: string;
  horario?: string;
  mes: string;
  enabled: boolean;
}

export interface SiteConfig {
  socialLinks: SocialLink[];
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  address: string;
  workingHours: string;
  emails: { label: string; email: string }[];
  carouselSlides: CarouselSlide[];
  nucleoPricing: NucleoPricing[];
  eventos: Evento[];
}

const STORAGE_KEY = 'aes-site-config';

export const DEFAULT_CONFIG: SiteConfig = {
  socialLinks: [
    { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com/aessenai', enabled: true },
    { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com/aessenai', enabled: true },
    { id: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/aessenai', enabled: true },
    { id: 'whatsapp', platform: 'WhatsApp', url: 'https://wa.me/551133679900', enabled: true },
  ],
  contactPhone: '(11) 3367-9900',
  contactWhatsApp: 'https://wa.me/551133679900',
  contactEmail: 'gerente@aessenai.org.br',
  address: 'Rua Correia de Andrade, 232\nBrás, São Paulo - SP\nCEP 03008-020',
  workingHours: 'Seg-Sex 7:00 - 17:00',
  emails: [
    { label: 'Gerente', email: 'gerente@aessenai.org.br' },
    { label: 'Cadastro / Odonto / TotalPass', email: 'cadastro@aessenai.org.br' },
    { label: 'Planos de Saúde', email: 'rh@aessenai.org.br' },
    { label: 'Boletos e Cobranças', email: 'cobranca@aessenai.org.br' },
    { label: 'Contas a Receber', email: 'boletim.aes@aessenai.org.br' },
    { label: 'Contas a Pagar', email: 'financeiro@aessenai.org.br' },
  ],
  carouselSlides: [
    { id: 's1', badge: 'Eventos', badgeColor: '#8B5CF6', title: 'Calendário de Eventos 2026', description: 'Confira a programação completa de eventos, atividades culturais, esportivas e de lazer.', cta: 'Ver Calendário', href: '/calendario', enabled: true },
    { id: 's2', badge: 'Comunicado', badgeColor: '#EF4444', title: 'Novas Parcerias Exclusivas', description: 'A AES firmou novas parcerias com universidades e academias. Descontos especiais para associados.', cta: 'Saiba Mais', href: '/parcerias', enabled: true },
    { id: 's3', badge: 'Oferta', badgeColor: '#10B981', title: 'Reservas nos Núcleos de Lazer', description: 'Aproveite nos 3 núcleos: Clube de Campo, Clube Náutico e Colônia de Férias.', cta: 'Reservar Agora', href: '/nucleo-de-lazer', enabled: true },
    { id: 's4', badge: 'Boletim', badgeColor: '#0EA5E9', title: 'Boletim Informativo AES', description: 'Fique por dentro de todas as novidades, comunicados e informações da Associação.', cta: 'Ler Boletim', href: '/boletim', enabled: true },
  ],
  nucleoPricing: [
    {
      id: 'clube-campo', nome: 'Clube de Campo',
      precos: [
        { categoria: 'Hospedagem', associado: 'R$ 45,00', dependente: 'R$ 58,00', convidado: 'R$ 73,00' },
      ],
      dayUse: 'R$ 50,00',
      criançasInfo: 'Crianças até 6 anos: grátis | 7-12 anos: meia',
    },
    {
      id: 'clube-nautico', nome: 'Clube Náutico',
      precos: [
        { categoria: 'Hospedagem', associado: 'R$ 45,00', dependente: 'R$ 58,00', convidado: 'R$ 73,00' },
      ],
      criançasInfo: 'Crianças até 6 anos: grátis | 7-12 anos: meia',
    },
    {
      id: 'colonia-ferias', nome: 'Colônia de Férias',
      precos: [
        { categoria: 'Hospedagem', associado: 'R$ 118,00', dependente: 'R$ 146,00', convidado: 'R$ 169,00' },
        { categoria: 'Café da Manhã', associado: 'R$ 25,00', dependente: 'R$ 32,00', convidado: 'R$ 39,00' },
        { categoria: 'Almoço', associado: 'R$ 40,00', dependente: 'R$ 52,00', convidado: 'R$ 64,00' },
        { categoria: 'Sopa + Massa', associado: 'R$ 19,00', dependente: 'R$ 24,00', convidado: 'R$ 28,00' },
      ],
      criançasInfo: 'Crianças até 6 anos: grátis | 7-12 anos: meia',
    },
  ],
  eventos: [
    { id: 'e1', titulo: 'Confraternização de Início de Ano', data: '18/01', local: 'Clube de Campo - Jundiaí', departamento: 'Cultural e Recreativo', mes: 'Janeiro', enabled: true },
    { id: 'e2', titulo: 'Carnaval no Clube Náutico', data: '14-18/02', local: 'Clube Náutico - Boracéia', departamento: 'Cultural e Recreativo', mes: 'Fevereiro', enabled: true },
    { id: 'e3', titulo: 'Torneio de Verão', data: '22/02', local: 'Clube de Campo - Jundiaí', departamento: 'Esportivo Capital', horario: '09:00', mes: 'Fevereiro', enabled: true },
    { id: 'e4', titulo: 'Dia Internacional da Mulher', data: '08/03', local: 'Sede AES - São Paulo', departamento: 'Cultural e Recreativo', mes: 'Março', enabled: true },
    { id: 'e5', titulo: 'Assembleia Geral Ordinária', data: '22/03', local: 'Sede AES - São Paulo', departamento: 'Administração', horario: '10:00', mes: 'Março', enabled: true },
    { id: 'e6', titulo: 'Páscoa nos Núcleos', data: '05/04', local: 'Todos os Núcleos', departamento: 'Cultural e Recreativo', mes: 'Abril', enabled: true },
    { id: 'e7', titulo: 'Festa Junina AES', data: '14/06', local: 'Clube de Campo - Jundiaí', departamento: 'Cultural e Recreativo', horario: '14:00', mes: 'Junho', enabled: true },
    { id: 'e8', titulo: 'Colônia de Férias Infantil', data: '07-11/07', local: 'Colônia de Férias - Itanhaém', departamento: 'Cultural e Recreativo', mes: 'Julho', enabled: true },
    { id: 'e9', titulo: 'Encontro de Aposentados', data: '23/08', local: 'Sede AES - São Paulo', departamento: 'Aposentados', horario: '10:00', mes: 'Agosto', enabled: true },
    { id: 'e10', titulo: 'Dia das Crianças nos Núcleos', data: '11/10', local: 'Todos os Núcleos', departamento: 'Cultural e Recreativo', mes: 'Outubro', enabled: true },
    { id: 'e11', titulo: 'Confraternização de Final de Ano', data: '13/12', local: 'Clube de Campo - Jundiaí', departamento: 'Cultural e Recreativo', horario: '12:00', mes: 'Dezembro', enabled: true },
  ],
};

export class SiteConfigManager {
  static getConfig(): SiteConfig {
    if (typeof window === 'undefined') return DEFAULT_CONFIG;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch { /* ignore */ }
    return DEFAULT_CONFIG;
  }

  static saveConfig(config: SiteConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new CustomEvent('aes-config-change', { detail: config }));
    } catch { /* ignore */ }
  }

  static resetConfig(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('aes-config-change', { detail: DEFAULT_CONFIG }));
    } catch { /* ignore */ }
  }
}
