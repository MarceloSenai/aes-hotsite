import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

/**
 * Seed do Corpo de Administração da AES (Conselho Deliberativo, Conselho Fiscal,
 * Diretoria Executiva e Diretores de Departamentos) na tabela `representantes`.
 *
 * Estratégia: apaga as 4 categorias administrativas e reinsere — preserva
 * `representantes-regionais`, que é tratado em outro fluxo.
 *
 * Uso: npx tsx scripts/seed-representantes.ts
 */

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set');

const adapter = new PrismaMssql(url);
const prisma = new PrismaClient({ adapter });

interface Linha {
  nome: string;
  cargo: string;
  categoria: string;
  sort_order: number;
}

const CATEGORIAS_ADMIN = [
  'conselho-deliberativo',
  'conselho-fiscal',
  'diretoria-executiva',
  'diretores-departamentos',
] as const;

const LINHAS: Linha[] = [
  // ── Conselho Deliberativo ──
  { nome: 'Thiago De Souza Santos', cargo: 'Presidente', categoria: 'conselho-deliberativo', sort_order: 0 },
  { nome: 'Wilian Diogenes Batista', cargo: 'Vice Presidente', categoria: 'conselho-deliberativo', sort_order: 1 },
  { nome: 'Ygor Ferreira Fabre', cargo: 'Secretário', categoria: 'conselho-deliberativo', sort_order: 2 },
  { nome: 'Danilo Kazuhire Shimoda', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 3 },
  { nome: 'Dirlene Guimaraes Arantes Fialkovics', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 4 },
  { nome: 'Edison Simon', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 5 },
  { nome: 'Fernando Manoel Goncalves', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 6 },
  { nome: 'Jose Luis Leme Candido Teixeira', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 7 },
  { nome: 'Ronaldo Sotrate Junior', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 8 },
  { nome: 'Valdeir Donizete Borges', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 9 },
  { nome: 'Wagner Roberto', cargo: 'Membro', categoria: 'conselho-deliberativo', sort_order: 10 },

  // ── Conselho Fiscal ──
  { nome: 'Heverton Luis Marino', cargo: 'Presidente', categoria: 'conselho-fiscal', sort_order: 0 },
  { nome: 'Fulvia Alves Da Silva', cargo: 'Secretário', categoria: 'conselho-fiscal', sort_order: 1 },
  { nome: 'Caiza Carla Herbella', cargo: 'Membro', categoria: 'conselho-fiscal', sort_order: 2 },
  { nome: 'Adriano Cesar Cardoso', cargo: 'Membro', categoria: 'conselho-fiscal', sort_order: 3 },

  // ── Diretoria Executiva ──
  { nome: 'Jose Heroino De Sousa', cargo: 'Presidente', categoria: 'diretoria-executiva', sort_order: 0 },
  { nome: 'Joao Domingos Chiari Sanchez', cargo: '1ºVice Presidente', categoria: 'diretoria-executiva', sort_order: 1 },
  { nome: 'Claudio Murari', cargo: '2º Vice Presidente', categoria: 'diretoria-executiva', sort_order: 2 },
  { nome: 'Maria Eugenia Cioffi', cargo: '1ª Secretária', categoria: 'diretoria-executiva', sort_order: 3 },
  { nome: 'Selma Maria Rossi Ganzaroli', cargo: '2ª Secretária', categoria: 'diretoria-executiva', sort_order: 4 },
  { nome: 'Marcel Adriano Pereira Porto', cargo: '1° Tesoureiro', categoria: 'diretoria-executiva', sort_order: 5 },
  { nome: 'Denise Riguero Gallego', cargo: '2° Tesoureiro', categoria: 'diretoria-executiva', sort_order: 6 },
  { nome: 'Jose Marlito Benicio Ricarte', cargo: '3° Tesoureiro', categoria: 'diretoria-executiva', sort_order: 7 },

  // ── Diretores de Departamentos ──
  { nome: 'Andreia Costa Moreira De Souza', cargo: 'Departamento de Aposentados', categoria: 'diretores-departamentos', sort_order: 0 },
  { nome: 'Cassia Fatima Da Silva Oliveira', cargo: 'Departamento Cultural e Recreativo', categoria: 'diretores-departamentos', sort_order: 1 },
  { nome: 'Michel Simao De Carvalho', cargo: 'Departamento Esportivo - Capital', categoria: 'diretores-departamentos', sort_order: 2 },
  { nome: 'Jeferson Andre Bonora', cargo: 'Departamento Esportivo - Interior', categoria: 'diretores-departamentos', sort_order: 3 },
];

async function main() {
  console.log('Limpando categorias administrativas (preserva regionais)...');
  const apagados = await prisma.representante.deleteMany({
    where: { categoria: { in: [...CATEGORIAS_ADMIN] } },
  });
  console.log(`${apagados.count} linha(s) removida(s).`);

  console.log('Inserindo corpo administrativo...');
  for (const linha of LINHAS) {
    await prisma.representante.create({ data: linha });
  }
  console.log(`${LINHAS.length} linha(s) inserida(s).`);
}

main()
  .then(() => {
    console.log('\nSeed concluído com sucesso.');
  })
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
