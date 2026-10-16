import {
  fetchPublic,
  formatMoney,
  htmlToText,
  markdownResponse,
  propertyUrl,
  typeLabel,
} from '@/lib/markdown';

const nameOf = (x: any): string | null => (typeof x === 'string' ? x : x?.name ?? null);

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await fetchPublic<any>(`/property/public/${encodeURIComponent(id)}`);
  const canonical = `/listing_details_05/${id}`;

  if (!p) {
    return markdownResponse('# Propiedad no encontrada\n\nEsta propiedad no existe o ya no está disponible.\n', canonical, 404);
  }

  const where = [p.address, p.locality?.name, p.province?.name].filter(Boolean).join(', ');
  const sale = p.publishForSale ? formatMoney(p.valueForSale) : null;
  const rent = p.publishForRent ? formatMoney(p.valueForRent) : null;
  const s = p.specs ?? {};
  const specs = [
    s.rooms ? `Ambientes: ${s.rooms}` : null,
    s.bedrooms ? `Dormitorios: ${s.bedrooms}` : null,
    s.bathrooms ? `Baños: ${s.bathrooms}` : null,
    s.garageCount ? `Cocheras: ${s.garageCount}` : null,
    s.totalSquareMeters ? `Superficie total: ${s.totalSquareMeters} m²` : null,
    s.coveredSquareMeters ? `Superficie cubierta: ${s.coveredSquareMeters} m²` : null,
  ].filter(Boolean) as string[];
  const amenities = (Array.isArray(p.amenities) ? p.amenities : []).map(nameOf).filter(Boolean) as string[];
  const description = htmlToText(p.detailedDescription);
  const cover = p.imgCover?.thumbWeb;

  const lines = [
    `# ${p.title || `${typeLabel(p.type)} en ${p.locality?.name ?? 'Argentina'}`}`,
    '',
    `- Tipo: ${typeLabel(p.type)}`,
    p.status === 'VENDIDO' ? '- Estado: VENDIDO · Operación concretada' : null,
    `- Ubicación: ${where || 'No informada'}`,
    sale ? `- Venta: ${sale}` : null,
    rent ? `- Alquiler: ${rent}` : null,
    !sale && !rent && p.status !== 'VENDIDO' ? '- Precio: consultar' : null,
    ...specs.map((x) => `- ${x}`),
    p.lat && p.lng ? `- Coordenadas: ${p.lat}, ${p.lng}` : null,
    `- Ficha: ${propertyUrl(id)}`,
    '',
    description ? '## Descripción\n\n' + description + '\n' : null,
    amenities.length ? '## Comodidades\n\n' + amenities.map((a) => `- ${a}`).join('\n') + '\n' : null,
    cover ? `![Foto de portada](${cover})\n` : null,
    '## Contacto',
    '',
    p.status === 'VENDIDO'
      ? `Para buscar una propiedad similar, usá el [formulario de la ficha de referencia](${propertyUrl(id)}).`
      : `Para consultar por esta propiedad usá el [formulario de contacto](${propertyUrl(id).replace(/\/listing_details_05\/.*/, '/contact')}).`,
    '',
  ];

  return markdownResponse(lines.filter((l) => l !== null).join('\n'), canonical);
}
