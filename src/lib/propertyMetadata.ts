import {API_BASE_URL} from '@/utils/apiConfig';

interface PropertyResponse {
  items: any[];
}

export async function getPropertyById(id: string) {
  const url = `${API_BASE_URL}/property/public?_id=${id}`;
  const res = await fetch(url, {cache: 'no-store'});
  if (!res.ok) return null;
  const data: PropertyResponse = await res.json();
  return data.items?.[0] || null;
}

export function buildJsonLd(property: any, paramsId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: property.title || property.name || `Propiedad ${property._id}`,
    description: property.description || '',
    image: property.media && property.media.length ? property.media[0].url : undefined,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipropietas.com.ar'}/listing_details_05/${paramsId}`,
    address: property.address || undefined,
    offers: property.price ? {'@type': 'Offer', price: property.price} : undefined,
  };
}

export function buildMetadata(property: any, paramsId: string) {
  const title = property.title || property.name || `Propiedad - ${paramsId}`;
  const description = property.description ? property.description.slice(0, 160) : 'Propiedad en iPropietas';
  const image = property.media && property.media.length ? property.media[0].url : '/og/preview.webp';

  return {
    title,
    description,
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
