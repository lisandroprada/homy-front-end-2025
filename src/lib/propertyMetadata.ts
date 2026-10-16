import { cache } from 'react';
import { htmlToText } from '@/lib/markdown';

// cache() deduplicates calls within the same request — generateMetadata and Page
// both call this, so without cache() the backend receives two hits per page visit.
export const getPropertyById = cache(async (id: string) => {
  const apiHost = process.env.VERCEL
    ? 'https://api.rentia.com.ar'
    : 'http://localhost:3001';

  const url = `${apiHost}/api/v1/property/public/${id}`;

  try {
    // Visibility can be withdrawn at any time. Never serve a cached public detail.
    const res = await fetch(url, {cache: 'no-store'});
    if (!res.ok) {
      console.error(`Error fetching property ${id}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for property ${id}:`, error);
    return null;
  }
});

const SITE = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipropietas.com.ar';

/** Plain-text description (the API only provides rich text in `detailedDescription`). */
function descriptionOf(property: any): string {
  return htmlToText(property.detailedDescription || property.description || '');
}

/** Absolute image URLs, cover first. The API returns them under `imgCover` / `img[]`. */
function imagesOf(property: any): string[] {
  const urls = [property.imgCover?.thumbWeb, ...(Array.isArray(property.img) ? property.img.map((i: any) => i?.thumbWeb || i?.imgSlider) : [])]
    .filter((u): u is string => typeof u === 'string' && u.length > 0);
  return [...new Set(urls)];
}

const titleOf = (property: any, id: string) => property.title || property.name || `Propiedad - ${id}`;

/**
 * Serialize JSON-LD for an inline <script>. Escapes `<` so user-entered text containing
 * "</script>" cannot break out of the tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildJsonLd(property: any, paramsId: string) {
  const images = imagesOf(property);
  const specs = property.specs ?? {};
  const sale = property.status !== 'VENDIDO' && property.publishForSale ? property.valueForSale : null;
  const rent = property.status !== 'VENDIDO' && property.publishForRent ? property.valueForRent : null;
  const offers = [
    sale?.amount > 0 && { '@type': 'Offer', businessFunction: 'http://purl.org/goodrelations/v1#Sell', price: sale.amount, priceCurrency: sale.currency },
    rent?.amount > 0 && { '@type': 'Offer', businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut', price: rent.amount, priceCurrency: rent.currency },
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: titleOf(property, paramsId),
    description: descriptionOf(property) || undefined,
    image: images.length ? images : undefined,
    url: `${SITE()}/listing_details_05/${paramsId}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || undefined,
      addressLocality: property.locality?.name || undefined,
      addressRegion: property.province?.name || undefined,
      addressCountry: 'AR',
    },
    geo: property.lat && property.lng ? { '@type': 'GeoCoordinates', latitude: property.lat, longitude: property.lng } : undefined,
    numberOfRooms: specs.rooms > 0 ? specs.rooms : undefined,
    floorSize: specs.totalSquareMeters > 0 ? { '@type': 'QuantitativeValue', value: specs.totalSquareMeters, unitCode: 'MTK' } : undefined,
    offers: offers.length ? offers : undefined,
  };
}

export function buildMetadata(property: any, paramsId: string) {
  const title = `${property.status === 'VENDIDO' ? 'Vendido · ' : ''}${titleOf(property, paramsId)}`;
  const text = descriptionOf(property);
  const description = text ? text.replace(/\s+/g, ' ').slice(0, 160) : 'Propiedad en iPropietas';
  const image = imagesOf(property)[0] || '/og/preview.webp';
  const siteUrl = SITE();

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/listing_details_05/${paramsId}`,
    },
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
