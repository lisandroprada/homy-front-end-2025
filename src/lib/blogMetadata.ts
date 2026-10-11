import {PUBLIC_API, SITE_URL, htmlToText} from '@/lib/markdown';

/** Blog post as returned by GET /api/v1/blog/public/:id. */
export async function getBlogPostById(id: string) {
  try {
    const res = await fetch(`${PUBLIC_API}/blog/public/${encodeURIComponent(id)}`, {next: {revalidate: 3600}});
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for blog post ${id}:`, error);
    return null;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  CREDITOS_HIPOTECARIOS: 'Créditos hipotecarios',
  MERCADO_DE_ALQUILERES: 'Mercado de alquileres',
  CONSTRUCCION: 'Construcción',
  MERCADO_INMOBILIARIO: 'Mercado inmobiliario',
  INVERSION_INMOBILIARIA: 'Inversión inmobiliaria',
  FINANCIAMIENTO: 'Financiamiento',
  POLITICAS_GUBERNAMENTALES: 'Políticas gubernamentales',
  TENDENCIAS_DEL_MERCADO: 'Tendencias del mercado',
  VIVIENDA: 'Vivienda',
};

export const categoryLabel = (category?: string) => (category ? CATEGORY_LABELS[category] ?? category : undefined);

const plain = (text: unknown, max: number) => htmlToText(String(text ?? '')).replace(/\s+/g, ' ').trim().slice(0, max);

export function buildBlogJsonLd(post: any, id: string) {
  const url = `${SITE_URL}/blog_details/${id}`;
  const keywords = Array.isArray(post.keywords) ? post.keywords.join(', ') : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: plain(post.title, 110),
    description: plain(post.description, 300) || undefined,
    image: post.imageUrl ? [post.imageUrl, post.secondImageUrl].filter(Boolean) : [`${SITE_URL}/og/preview.webp`],
    datePublished: post.publishedAt || post.createdAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt || undefined,
    author: {'@type': 'Organization', name: post.author || 'iPropietas', url: SITE_URL},
    publisher: {'@type': 'Organization', name: 'iPropietas', url: SITE_URL},
    articleSection: categoryLabel(post.category),
    keywords,
    inLanguage: 'es-AR',
    url,
    mainEntityOfPage: {'@type': 'WebPage', '@id': url},
  };
}

export function buildBlogMetadata(post: any, id: string) {
  const title = post.title || 'Artículo - iPropietas';
  const description = plain(post.description || post.content, 160) || 'Noticias del mercado inmobiliario argentino en iPropietas.';
  const image = post.imageUrl || `${SITE_URL}/og/preview.webp`;

  return {
    title,
    description,
    keywords: Array.isArray(post.keywords) ? post.keywords : undefined,
    alternates: {canonical: `${SITE_URL}/blog_details/${id}`},
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: [post.author || 'iPropietas'],
      images: [{url: image, width: 1200, height: 630, alt: title}],
    },
    twitter: {card: 'summary_large_image' as const, title, description, images: [image]},
  };
}
