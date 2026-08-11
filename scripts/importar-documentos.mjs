/**
 * Importa os documentos institucionais do site legado (aessenai.org.br) para o
 * container publico do nosso Storage.
 *
 * Motivo: o site legado sai do ar no cutover, e os PDFs sao a unica copia
 * publicada hoje. Depois de rodar, a tabela `documentos` passa a apontar para
 * arquivos nossos, sem dependencia externa.
 *
 * Sobe para `aes-public/documentos/`, e nao para `aes-documentos`, porque este
 * ultimo esta com acesso privado — uma URL direta dele responde 404 para o
 * visitante. Ver app/(public)/documentos/page.tsx.
 *
 * Uso: AZURE_STORAGE_CONNECTION_STRING='...' node scripts/importar-documentos.mjs
 */
import { BlobServiceClient } from '@azure/storage-blob';

const CONTAINER = 'aes-public';
const PREFIX = 'documentos/';
const ORIGEM = 'https://aessenai.org.br/_arq/';

const DOCUMENTOS = [
  {
    origem: '1-EstatutoRegimentos/Estatuto_setembro-2024.pdf',
    arquivo: 'estatuto-setembro-2024.pdf',
    titulo: 'Estatuto Social',
    descricao: 'Estatuto Social da AES, versão de setembro de 2024.',
    categoria: 'Estatuto e Regimentos',
  },
  {
    origem: '1-EstatutoRegimentos/regimento-interno-2025.pdf',
    arquivo: 'regimento-interno-2025.pdf',
    titulo: 'Regimento Interno',
    descricao: 'Regimento Interno da AES, versão de 2025.',
    categoria: 'Estatuto e Regimentos',
  },
  {
    origem: '3-Regulamentos/Regulamento_ClubeCampo.pdf',
    arquivo: 'regulamento-clube-de-campo.pdf',
    titulo: 'Regulamento do Clube de Campo',
    descricao: 'Normas de uso e hospedagem do Clube de Campo, em Jundiaí.',
    categoria: 'Regulamentos',
  },
  {
    origem: '3-Regulamentos/Regulamento_ClubeNautico.pdf',
    arquivo: 'regulamento-clube-nautico.pdf',
    titulo: 'Regulamento do Clube Náutico',
    descricao: 'Normas de uso e hospedagem do Clube Náutico, em Boracéia.',
    categoria: 'Regulamentos',
  },
  {
    origem: '3-Regulamentos/Regulamento_Colonia.pdf',
    arquivo: 'regulamento-colonia-de-ferias.pdf',
    titulo: 'Regulamento da Colônia de Férias',
    descricao: 'Normas de uso e hospedagem da Colônia de Férias, em Itanhaém.',
    categoria: 'Regulamentos',
  },
  {
    origem: '3-Regulamentos/Regulamento_FUMUS2020.pdf',
    arquivo: 'regulamento-fumus-2020.pdf',
    titulo: 'Regulamento do FUMUS',
    descricao: 'Regulamento do Fundo Mútuo de Solidariedade, versão de 2020.',
    categoria: 'Regulamentos',
  },
];

const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!conn) throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set');

const container = BlobServiceClient.fromConnectionString(conn).getContainerClient(CONTAINER);
const resultado = [];

for (const doc of DOCUMENTOS) {
  const res = await fetch(ORIGEM + doc.origem);
  if (!res.ok) {
    console.error(`FALHOU  ${doc.arquivo} — origem respondeu ${res.status}`);
    continue;
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  const blobPath = PREFIX + doc.arquivo;
  await container.getBlockBlobClient(blobPath).uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: 'application/pdf',
      // Documentos institucionais mudam raramente; 1 dia evita rebaixar o PDF
      // a cada visita sem prender uma versao velha por muito tempo.
      blobCacheControl: 'public, max-age=86400',
      blobContentDisposition: `inline; filename="${doc.arquivo}"`,
    },
  });

  resultado.push({ ...doc, file_path: blobPath, bytes: buffer.length });
  console.log(`ok  ${doc.arquivo.padEnd(36)} ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);
}

console.log('\n--- para registrar na tabela `documentos` ---');
console.log(JSON.stringify(
  resultado.map((d) => ({
    titulo: d.titulo,
    descricao: d.descricao,
    categoria: d.categoria,
    file_path: d.file_path,
    file_name: d.arquivo,
  })),
  null,
  2,
));
