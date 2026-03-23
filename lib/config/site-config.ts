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

export interface BoletimEdicao {
  id: string;
  numero: number;
  titulo: string;
  data: string;
  resumo: string;
  pdfFileName?: string;
  pdfData?: string; // base64
}

export type CategoriaRepresentante = 'conselho-deliberativo' | 'conselho-fiscal' | 'diretoria-executiva' | 'diretores-departamentos' | 'representantes-regionais';

export interface Representante {
  id: string;
  nome: string;
  cargo?: string;
  categoria: CategoriaRepresentante;
  regional?: string;
  unidade?: string;
  email?: string;
  telefone?: string;
}

export interface PlanoSaude {
  id: string;
  tipo: string;
  operadora: string;
  cobertura: string;
  faixas: { faixa: string; valor: string }[];
  aberto: boolean;
}

export interface ParceiroSeguro {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  contato: string;
}

export interface FarmaciaInfo {
  rede: string;
  descricao: string;
  restricao: string;
  contato: string;
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
  boletins: BoletimEdicao[];
  representantes: Representante[];
  planosOdontologicos: PlanoSaude[];
  planosMedicos: PlanoSaude[];
  parceirosSeguro: ParceiroSeguro[];
  farmacia: FarmaciaInfo;
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
      dayUse: 'R$ 50,00',
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
  boletins: [
    { id: 'b1', numero: 48, titulo: 'Boletim AES - Março 2026', data: 'Março 2026', resumo: 'Novas parcerias, calendário de eventos atualizado e informações sobre reservas nos núcleos de lazer.' },
    { id: 'b2', numero: 47, titulo: 'Boletim AES - Fevereiro 2026', data: 'Fevereiro 2026', resumo: 'Carnaval nos núcleos, torneio de verão e novidades sobre o plano de saúde.' },
    { id: 'b3', numero: 46, titulo: 'Boletim AES - Janeiro 2026', data: 'Janeiro 2026', resumo: 'Posse da nova gestão 2026-2030, confraternização de início de ano e balanço 2025.' },
    { id: 'b4', numero: 45, titulo: 'Boletim AES - Dezembro 2025', data: 'Dezembro 2025', resumo: 'Encerramento do ano, festa de confraternização e prestação de contas anual.' },
  ],
  representantes: [
    // Conselho Deliberativo
    { id: 'cd1', nome: 'Luiz Marcelo de Oliveira Silva', cargo: 'Presidente', categoria: 'conselho-deliberativo' },
    { id: 'cd2', nome: 'Membro Conselho 1', cargo: 'Conselheiro', categoria: 'conselho-deliberativo' },
    { id: 'cd3', nome: 'Membro Conselho 2', cargo: 'Conselheiro', categoria: 'conselho-deliberativo' },
    // Conselho Fiscal
    { id: 'cf1', nome: 'Membro Fiscal 1', cargo: 'Titular', categoria: 'conselho-fiscal' },
    { id: 'cf2', nome: 'Membro Fiscal 2', cargo: 'Titular', categoria: 'conselho-fiscal' },
    { id: 'cf3', nome: 'Membro Fiscal 3', cargo: 'Suplente', categoria: 'conselho-fiscal' },
    // Diretoria Executiva
    { id: 'de1', nome: 'Luiz Marcelo de Oliveira Silva', cargo: 'Gerente', categoria: 'diretoria-executiva', email: 'gerente@aessenai.org.br' },
    // Diretores de Departamentos
    { id: 'dd1', nome: 'Dulceni Maria Paglione de Oliveira', cargo: 'Diretora - Aposentados', categoria: 'diretores-departamentos' },
    { id: 'dd2', nome: 'Alessandra Angelim da Silva', cargo: 'Diretora - Cultural e Recreativo', categoria: 'diretores-departamentos' },
    { id: 'dd3', nome: 'Rubens da Silva Moreira', cargo: 'Diretor - Esportivo Capital', categoria: 'diretores-departamentos' },
    { id: 'dd4', nome: 'Edison Simon', cargo: 'Diretor - Esportivo Interior', categoria: 'diretores-departamentos' },
    // Representantes Regionais
    { id: 'r1', nome: 'Carlos Alberto Santos', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Capital', unidade: 'SENAI Brás', email: 'representante.bras@aessenai.org.br' },
    { id: 'r2', nome: 'Maria Helena Oliveira', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Capital', unidade: 'SENAI Ipiranga' },
    { id: 'r3', nome: 'José Roberto Silva', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Grande São Paulo', unidade: 'SENAI Santo André' },
    { id: 'r4', nome: 'Roberto Mendes', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Interior', unidade: 'SENAI Campinas' },
    { id: 'r5', nome: 'Sandra Almeida', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Litoral', unidade: 'SENAI Santos' },
    { id: 'r6', nome: 'Lucia Martins', cargo: 'Representante', categoria: 'representantes-regionais', regional: 'Vale do Paraíba', unidade: 'SENAI São José dos Campos' },
  ],
  planosOdontologicos: [
    { id: 'po1', tipo: 'MetLife Dental Básico', operadora: 'MetLife', cobertura: 'Consultas, limpeza, restaurações, extrações simples', faixas: [{ faixa: 'Titular', valor: 'R$ 28,90' }, { faixa: 'Dependente', valor: 'R$ 28,90' }], aberto: true },
    { id: 'po2', tipo: 'MetLife Dental Plus', operadora: 'MetLife', cobertura: 'Básico + próteses, endodontia, periodontia, ortodontia', faixas: [{ faixa: 'Titular', valor: 'R$ 49,90' }, { faixa: 'Dependente', valor: 'R$ 49,90' }], aberto: true },
  ],
  planosMedicos: [
    { id: 'pm1', tipo: 'UNIMED Enfermaria', operadora: 'UNIMED', cobertura: 'Consultas, exames, internação em enfermaria', faixas: [{ faixa: '0-18 anos', valor: 'R$ 189,00' }, { faixa: '19-23 anos', valor: 'R$ 210,00' }, { faixa: '24-28 anos', valor: 'R$ 245,00' }, { faixa: '29-33 anos', valor: 'R$ 280,00' }, { faixa: '34-38 anos', valor: 'R$ 320,00' }, { faixa: '39-43 anos', valor: 'R$ 365,00' }, { faixa: '44-48 anos', valor: 'R$ 425,00' }, { faixa: '49-53 anos', valor: 'R$ 510,00' }, { faixa: '54-58 anos', valor: 'R$ 620,00' }, { faixa: '59+ anos', valor: 'R$ 780,00' }], aberto: false },
    { id: 'pm2', tipo: 'UNIMED Apartamento', operadora: 'UNIMED', cobertura: 'Consultas, exames, internação em apartamento individual', faixas: [{ faixa: '0-18 anos', valor: 'R$ 245,00' }, { faixa: '19-23 anos', valor: 'R$ 275,00' }, { faixa: '24-28 anos', valor: 'R$ 320,00' }, { faixa: '29-33 anos', valor: 'R$ 365,00' }, { faixa: '34-38 anos', valor: 'R$ 420,00' }, { faixa: '39-43 anos', valor: 'R$ 485,00' }, { faixa: '44-48 anos', valor: 'R$ 565,00' }, { faixa: '49-53 anos', valor: 'R$ 680,00' }, { faixa: '54-58 anos', valor: 'R$ 830,00' }, { faixa: '59+ anos', valor: 'R$ 1.050,00' }], aberto: true },
  ],
  parceirosSeguro: [
    { id: 'ps1', nome: 'Porto Seguro', tipo: 'Seguro de Vida', descricao: 'Seguro de vida em grupo para associados e dependentes com cobertura por morte e invalidez.', contato: 'seguros@aessenai.org.br' },
    { id: 'ps2', nome: 'SulAmérica', tipo: 'Seguro Residencial', descricao: 'Proteção para residência do associado com cobertura contra incêndio, roubo e danos elétricos.', contato: 'seguros@aessenai.org.br' },
    { id: 'ps3', nome: 'Tokio Marine', tipo: 'Seguro Auto', descricao: 'Seguro automotivo com condições especiais para associados AES. Assistência 24h inclusa.', contato: 'seguros@aessenai.org.br' },
  ],
  farmacia: {
    rede: 'System Farma',
    descricao: 'Convênio com a rede System Farma para desconto em medicamentos. Apresente o cartão AES no ato da compra.',
    restricao: 'Disponível apenas nas unidades da capital de São Paulo.',
    contato: 'cadastro@aessenai.org.br',
  },
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
