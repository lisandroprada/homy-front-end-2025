import {API_BASE_URL} from '@/utils/apiConfig';

interface PropertyResponse {
  items: any[];
}

export async function getPropertyById(id: string) {
  // En SSR, fetch necesita una URL absoluta. 
  // Intentamos obtenerla de las variables de entorno, con fallbacks seguros para desarrollo y producción local.
  let baseUrl = 'http://localhost:3000';
  
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  }

  const url = `${baseUrl}${API_BASE_URL}/property/public/${id}`;
  console.log(`[SSR Fetch] Property ${id} from: ${url}`);
  
  try {
    const res = await fetch(url, {next: {revalidate: 3600}});
    if (!res.ok) {
      console.error(`Error fetching property ${id}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data; // El endpoint de detalle /public/:id ya devuelve el objeto directo
  } catch (error) {
    console.error(`Fetch error for property ${id}:`, error);
    return null;
  }
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
