/**
 * Helpers for the "Markdown for Agents" representation of public pages.
 * Served when a client sends `Accept: text/markdown` (see rewrites in next.config.js);
 * browsers and search crawlers keep receiving HTML.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipropietas.com.ar';

const API_HOST = process.env.VERCEL ? 'https://api.rentia.com.ar' : 'http://localhost:3001';
export const PUBLIC_API = `${API_HOST}/api/v1`;

const MARKDOWN_REVALIDATE_SECONDS = 300;

export async function fetchPublic<T = any>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${PUBLIC_API}${path}`, { next: { revalidate: MARKDOWN_REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

/** Plain-text version of the rich-text descriptions stored as HTML. */
export function htmlToText(html: unknown): string {
  if (typeof html !== 'string') return '';
  return html
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|ul|ol)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (m) => HTML_ENTITIES[m] ?? m)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function formatMoney(value?: { amount?: number; currency?: string } | null): string | null {
  if (!value || !value.amount || value.amount <= 0) return null;
  return `${value.currency ?? ''} ${value.amount.toLocaleString('es-AR')}`.trim();
}

const TYPE_LABELS: Record<string, string> = {
  DEPARTAMENTO: 'Departamento',
  CASA: 'Casa',
  LOTE: 'Lote',
  TERRENO: 'Terreno',
  LOCAL: 'Local',
  OFICINA: 'Oficina',
  COCHERA: 'Cochera',
};

export function typeLabel(type?: string): string {
  if (!type) return 'Propiedad';
  return TYPE_LABELS[type] ?? type.charAt(0) + type.slice(1).toLowerCase();
}

export function propertyUrl(id: string): string {
  return `${SITE_URL}/listing_details_05/${id}`;
}

/** One-line summary of a property for lists. */
export function propertyLine(p: any): string {
  const where = [p.locality?.name, p.province?.name].filter(Boolean).join(', ') || p.address;
  const sale = formatMoney(p.valueForSale);
  const rent = formatMoney(p.valueForRent);
  const ops = [p.publishForSale && sale ? `Venta ${sale}` : null, p.publishForRent && rent ? `Alquiler ${rent}` : null]
    .filter(Boolean)
    .join(' · ');
  const title = p.title || `${typeLabel(p.type)} en ${where}`;
  return `- [${title}](${propertyUrl(p._id)}) — ${typeLabel(p.type)}, ${where}${ops ? ` — ${ops}` : ''}`;
}

/** Rough token estimate (~4 chars per token) for the x-markdown-tokens hint. */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function markdownResponse(body: string, canonicalPath: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      Vary: 'Accept',
      'x-markdown-tokens': String(estimateTokens(body)),
      // The /markdown/* paths are an implementation detail; keep them out of search indexes.
      'X-Robots-Tag': 'noindex, nofollow',
      Link: `<${SITE_URL}${canonicalPath}>; rel="canonical"`,
    },
  });
}
