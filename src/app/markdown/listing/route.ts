import { SITE_URL, fetchPublic, markdownResponse, propertyLine } from '@/lib/markdown';

export async function GET() {
  const data = await fetchPublic<{ items?: any[]; meta?: { totalItems?: number } }>('/property/public?page=0&pageSize=50');
  const items = data?.items ?? [];
  const total = data?.meta?.totalItems;

  const body = [
    '# Propiedades en venta y alquiler',
    '',
    total != null
      ? `Mostrando ${items.length} de ${total} propiedades disponibles.`
      : `Mostrando ${items.length} propiedades disponibles.`,
    `Cada ficha incluye precio, superficie, ambientes y ubicación. Para filtrar por zona, tipo u operación usá el [buscador](${SITE_URL}/listing_05).`,
    '',
    items.length ? items.map(propertyLine).join('\n') : '_No hay propiedades publicadas en este momento._',
    '',
  ].join('\n');

  return markdownResponse(body, '/listing_05');
}
