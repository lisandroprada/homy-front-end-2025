import { SITE_URL, fetchPublic, markdownResponse, propertyLine } from '@/lib/markdown';

export async function GET() {
  const data = await fetchPublic<{ items?: any[] }>('/property/public?page=0&pageSize=12');
  const items = data?.items ?? [];

  const body = [
    '# iPropietas',
    '',
    'Portal inmobiliario de Argentina: propiedades en venta y alquiler (casas, departamentos, lotes) publicadas por Rentia.',
    '',
    '## Dónde encontrar cada cosa',
    `- [Buscador de propiedades](${SITE_URL}/listing_05)`,
    `- [Mapa de propiedades](${SITE_URL}/listing_14)`,
    `- [Blog](${SITE_URL}/blog_01)`,
    `- [Contacto](${SITE_URL}/contact)`,
    `- [Preguntas frecuentes](${SITE_URL}/faq)`,
    `- [Mapa del sitio](${SITE_URL}/sitemap.xml)`,
    '',
    '## Propiedades destacadas',
    items.length ? items.map(propertyLine).join('\n') : '_No hay propiedades publicadas en este momento._',
    '',
  ].join('\n');

  return markdownResponse(body, '/');
}
