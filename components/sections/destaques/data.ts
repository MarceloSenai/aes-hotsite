import type { ElementType } from 'react';
import {
  Stethoscope,
  Smile,
  Shield,
  Pill,
  ShieldCheck,
} from 'lucide-react';

export type Beneficio = {
  icon: ElementType;
  title: string;
  description: string;
  chips: string[];
  href: string;
};

export type Nucleo = {
  title: string;
  location: string;
  description: string;
  chips: string[];
  href: string;
  /** 526x658 (4:5), recortado à mão do original 16:9 — ver CREDITOS.md. */
  image: string;
  alt: string;
};

/**
 * O primeiro item é renderizado como card de destaque. A ordem importa.
 * São exatamente 5 itens (1 destaque + 4 cards claros): o grid usa
 * md:grid-cols-4 com o destaque em md:row-span-2, formando um bento de 2 linhas.
 * A terceira linha é o card da parceria TotalPass, esticado na largura toda
 * (md:col-span-4, ParceriaDestaque — não um benefício, ver TotalPassCard.tsx).
 * Um sexto benefício quebraria as 2 linhas.
 */
/**
 * Descrições copiadas de app/(public)/servicos/page.tsx:14-65.
 * Chips derivados das páginas de detalhe de cada serviço:
 *   assistencia-medica/page.tsx:62-77 e :73 ("Atendimento 24h em pronto-socorro")
 *   assistencia-odontologica/page.tsx:84,197
 *   fundo-mutuo/page.tsx:81,138,146
 *   farmacias/page.tsx:16-32
 * Seguros não tem chips de fonte fixa: a página lista parceiros vindos do banco,
 * então os dois chips descrevem a natureza do benefício, não parceiros.
 * "Farmácias" encurta "Farmácias Conveniadas" do índice, acompanhando o rótulo
 * que a home já usa hoje.
 */
export const beneficios: Beneficio[] = [
  {
    icon: Stethoscope,
    title: 'Assistência Médica',
    description:
      'Plano de saúde UNIMED FESP com cobertura completa: consultas, exames, urgências, emergências e maternidade.',
    chips: ['Rede UNIMED FESP', 'Urgência 24h', 'Maternidade'],
    href: '/servicos/assistencia-medica',
  },
  {
    icon: Smile,
    title: 'Assistência Odontológica',
    description:
      'Cuidado dental completo para associados e dependentes com rede credenciada de qualidade.',
    chips: ['Rede credenciada', 'Coparticipação', 'Dependentes'],
    href: '/servicos/assistencia-odontologica',
  },
  {
    icon: Shield,
    title: 'Fundo Mútuo',
    description:
      'FUMUS e FUMUA: auxílio financeiro solidário e reembolso parcial de ambulância para associados e dependentes.',
    chips: ['FUMUS', 'FUMUA', 'Reembolso parcial de ambulância'],
    href: '/servicos/fundo-mutuo',
  },
  {
    icon: Pill,
    title: 'Farmácias',
    description:
      'Rede conveniada de farmácias com descontos exclusivos para associados AES.',
    chips: ['Descontos exclusivos', 'Rede ampla', 'Desconto em folha'],
    href: '/servicos/farmacias',
  },
  {
    icon: ShieldCheck,
    title: 'Seguros',
    description:
      'Produtos de seguros com condições especiais negociadas para associados AES.',
    chips: ['Condições negociadas', 'Parceiros credenciados'],
    href: '/servicos/seguros',
  },
];

/**
 * São exatamente 3 itens: os cards ficam lado a lado (md:grid-cols-3) dentro da
 * coluna de Lazer, então um quarto núcleo cairia sozinho numa segunda linha e
 * desfaria a paridade de altura com a coluna de Benefícios.
 */
export const nucleos: Nucleo[] = [
  {
    title: 'Clube de Campo',
    location: 'Jundiaí/SP',
    description:
      'Chalés, apartamentos, piscinas, saunas e muito mais em meio à natureza.',
    chips: ['12 Chalés', 'Piscinas', 'Saunas'],
    href: '/nucleo-de-lazer/clube-de-campo',
    image: '/images/nucleos/portrait/clube-de-campo.webp',
    alt: 'Área verde com quiosques do Clube de Campo da AES em Jundiaí',
  },
  {
    title: 'Clube Náutico',
    location: 'Boracéia/SP',
    description:
      'Chalés à beira da represa com pier de pesca, academia ao ar livre e a tranquilidade do interior paulista.',
    chips: ['8 Chalés', 'Pier de Pesca', 'Academia'],
    href: '/nucleo-de-lazer/clube-nautico',
    image: '/images/nucleos/portrait/clube-nautico.webp',
    alt: 'Pier de pesca do Clube Náutico da AES na represa de Boracéia',
  },
  {
    title: 'Colônia de Férias',
    location: 'Itanhaém/SP',
    description:
      'Apartamentos completos na praia com restaurante, cinema, piscina e toda infraestrutura para suas férias.',
    chips: ['48 Apartamentos', 'Restaurante', 'Cinema'],
    href: '/nucleo-de-lazer/colonia-de-ferias',
    image: '/images/nucleos/portrait/colonia-de-ferias.webp',
    alt: 'Praia do litoral sul paulista, onde fica a Colônia de Férias da AES em Itanhaém',
  },
];

export type ParceriaDestaque = {
  nome: string;
  logo: string;
  logoAlt: string;
  /** Proporção intrínseca do SVG oficial (784.55 × 87.24), normalizada para h-7. */
  logoWidth: number;
  logoHeight: number;
  headline: string;
  description: string;
  /** Versão curta para o card do bento (a `description` era da faixa larga). */
  resumo: string;
  chips: string[];
  adesaoHref: string;
  adesaoLabel: string;
  siteHref: string;
  siteLabel: string;
  cor: string;
};

/**
 * Parceria em destaque na home, abaixo do bento de benefícios.
 *
 * Números conferidos em totalpass.com/br em 21/07/2026: "Mais de 35 mil
 * academias em 1.900 cidades", "Mais de 250 modalidades" e o Total Mind
 * ("milhares de psicólogos on-line + 400 áudios de meditação").
 *
 * A adesão é intermediada pela AES, não contratada direto com o parceiro:
 * site-config.ts:165 e contact.ts:41 rotulam cadastro@aessenai.org.br como o
 * canal responsável por TotalPass. Daí o CTA principal ser um mailto e não o
 * site do parceiro.
 *
 * O texto não cita desconto, preço nem gratuidade: não há fonte para essas
 * condições em nenhum lugar do projeto. Vende amplitude de rede, que é
 * verificável.
 *
 * `cor` é o verde da marca, extraído da classe .cls-1 do SVG oficial.
 */
export const totalpass: ParceriaDestaque = {
  nome: 'TotalPass',
  logo: '/images/parceiros/totalpass-white.svg',
  logoAlt: 'TotalPass',
  logoWidth: 252,
  logoHeight: 28,
  headline: 'O Brasil inteiro é a sua academia.',
  description:
    'Com a TotalPass, você treina em mais de 35 mil academias em 1.900 cidades — Smart Fit, Bio Ritmo e estúdios com mais de 250 modalidades. E ainda leva psicólogo online e meditação junto.',
  resumo:
    'Rede de mais de 35 mil academias — Smart Fit, Bio Ritmo e estúdios com +250 modalidades — e ainda saúde mental online.',
  chips: ['+35 mil academias', '1.900 cidades', '+250 modalidades', 'Psicólogos online'],
  adesaoHref: 'mailto:cadastro@aessenai.org.br?subject=TotalPass%20-%20quero%20aderir',
  adesaoLabel: 'Quero aderir',
  siteHref: 'https://totalpass.com/br/',
  siteLabel: 'Conhecer a rede',
  cor: '#26D07C',
};
