/**
 * Identidade do site para SEO: URL canônica e se ela já é o domínio definitivo.
 *
 * Enquanto o site roda em `*.azurewebsites.net`, ele é ambiente de validação —
 * e não deve ser indexado, sob risco de o Google registrar o endereço temporário
 * como se fosse o oficial (conteúdo duplicado e link errado no resultado de busca).
 *
 * No cutover, basta definir NEXT_PUBLIC_SITE_URL=https://aessenai.org.br no App
 * Service: o robots.txt libera a indexação e o sitemap passa a apontar para o
 * domínio certo, sem alterar código.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://aes-next-prod-d0adesfndvcvh0hs.brazilsouth-01.azurewebsites.net'
).replace(/\/$/, '');

/** Domínios oficiais da AES. Só neles a indexação é liberada. */
const DOMINIOS_OFICIAIS = ['aessenai.org.br', 'www.aessenai.org.br'];

export const INDEXAVEL = DOMINIOS_OFICIAIS.some((d) => SITE_URL.includes(d));

export const SITE_NAME = 'AES - Associação dos Empregados do SENAI';
