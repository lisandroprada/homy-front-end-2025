import {fetchPublic, formatMoney, typeLabel} from '@/lib/markdown';

/**
 * Data for the server-rendered link blocks. The interactive lists on the site are filled in the browser, so
 * crawlers received pages with no links to the listings or the articles (Search Console: "Discovered, currently
 * not indexed"). These helpers feed plain <a href> lists that ARE in the initial HTML.
 * Same public API and 5-minute cache as the rest of the server-side fetches.
 */
export interface PropertyLink {
  id: string;
  href: string;
  title: string;
  detail: string;
  type?: string;
  locality?: string;
  status?: string;
}

export interface PostLink {
  id: string;
  href: string;
  title: string;
  detail: string;
}

const MAX_ITEMS = 100;

const placeOf = (p: any) => [p.locality?.name, p.province?.name].filter(Boolean).join(', ');

export function toPropertyLink(p: any): PropertyLink {
  const place = placeOf(p) || p.address || '';
  const sale = p.publishForSale ? formatMoney(p.valueForSale) : null;
  const rent = p.publishForRent ? formatMoney(p.valueForRent) : null;
  const price = [sale && `Venta ${sale}`, rent && `Alquiler ${rent}`].filter(Boolean).join(' · ');
  return {
    id: p._id,
    href: `/listing_details_05/${p._id}`,
    title: `${p.status === 'VENDIDO' ? 'Vendido · ' : ''}${p.title || `${typeLabel(p.type)} en ${place}`}`,
    detail: [typeLabel(p.type), place, price].filter(Boolean).join(' · '),
    type: p.type,
    locality: p.locality?.name,
    status: p.status,
  };
}

export async function getPublicPropertyLinks(limit = MAX_ITEMS): Promise<PropertyLink[]> {
  const data = await fetchPublic<{items?: any[]}>(`/property/public?page=0&pageSize=${MAX_ITEMS}`);
  return (data?.items ?? []).slice(0, limit).map(toPropertyLink);
}

/** Same locality and type first, then same locality, then same type, then the rest. Never the property itself. */
export function pickSimilar(all: PropertyLink[], current: {id: string; type?: string; locality?: string}, count = 6): PropertyLink[] {
  const score = (p: PropertyLink) => (p.locality && p.locality === current.locality ? 2 : 0) + (p.type && p.type === current.type ? 1 : 0);
  return all
    .filter((p) => p.id !== current.id && p.status !== 'VENDIDO')
    .map((p, index) => ({p, index, s: score(p)}))
    .sort((a, b) => b.s - a.s || a.index - b.index)
    .slice(0, count)
    .map(({p}) => p);
}

export async function getPublicPostLinks(limit = 50): Promise<PostLink[]> {
  const data = await fetchPublic<{items?: any[]}>(`/blog/public?page=0&pageSize=${limit}`);
  return (data?.items ?? []).map((p: any) => ({
    id: p.id,
    href: `/blog_details/${p.id}`,
    title: p.title,
    detail: p.description ?? '',
  }));
}
