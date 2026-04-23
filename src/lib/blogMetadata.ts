const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipropietas.com.ar';

export async function getBlogPostById(id: string) {
  let baseUrl = 'http://localhost:3000';

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  }

  const url = `${baseUrl}/api/v1/blog/public/${id}`;
  console.log(`[SSR Fetch] Blog post ${id} from: ${url}`);

  try {
    const res = await fetch(url, {next: {revalidate: 3600}});
    if (!res.ok) {
      console.error(`Error fetching blog post ${id}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for blog post ${id}:`, error);
    return null;
  }
}

export function buildBlogJsonLd(post: any, id: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || '',
    description: post.excerpt || post.summary || (post.content ? post.content.slice(0, 160) : ''),
    image: post.image_url || post.image || `${SITE_URL}/og/preview.webp`,
    datePublished: post.date || post.createdAt || '',
    dateModified: post.updatedAt || post.date || post.createdAt || '',
    author: {
      '@type': 'Organization',
      name: post.author || 'iPropietas',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'iPropietas',
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog_details/${id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog_details/${id}`,
    },
  };
}

export function buildBlogMetadata(post: any, id: string) {
  const title = post.title || 'Artículo - iPropietas';
  const rawDescription = post.excerpt || post.summary || post.content || '';
  const description = rawDescription ? rawDescription.replace(/<[^>]*>/g, '').slice(0, 160) : 'Noticias del mercado inmobiliario argentino en iPropietas.';
  const image = post.image_url || post.image || '/og/preview.webp';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/blog_details/${id}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date || post.createdAt || undefined,
      authors: [post.author || 'iPropietas'],
      images: [{url: image, width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [image],
    },
  };
}
