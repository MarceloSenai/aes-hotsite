import type { MetadataRoute } from 'next';
import { SITE_URL, INDEXAVEL } from '@/lib/config/site';

/**
 * Enquanto o site responde pelo endereço temporário do App Service, bloqueia
 * tudo: indexar `*.azurewebsites.net` faria o Google registrar o endereço de
 * validação como se fosse o oficial — e ele competiria nos resultados com o
 * domínio real depois do cutover.
 *
 * Definir NEXT_PUBLIC_SITE_URL=https://aessenai.org.br libera a indexação.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAVEL) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Áreas autenticadas e endpoints não têm o que oferecer em busca.
        disallow: ['/admin', '/admin/', '/login', '/area-do-associado', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
