import { cache } from 'react';

// cache() deduplicates calls within the same request — generateMetadata and Page
// both call this, so without cache() the backend receives two hits per page visit.
export const getPropertyById = cache(async (id: string) => {
  const apiHost = process.env.VERCEL
    ? 'https://api.rentia.com.ar'
    : 'http://localhost:3001';

  const url = `${apiHost}/api/v1/property/public/${id}`;

  try {
    const res = await fetch(url, {next: {revalidate: 3600}});
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipropietas.com.ar';

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
