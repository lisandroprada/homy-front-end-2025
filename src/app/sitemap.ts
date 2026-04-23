import {MetadataRoute} from 'next';

const ROOT = 'https://www.ipropietas.com.ar';
const API = 'https://api.netra.com.ar/api/v1';

// Revalida el sitemap cada 12 horas en Vercel
export const revalidate = 43200;

async function fetchItems(url: string): Promise<{id: string; lastmod: string | null}[]> {
  try {
    const res = await fetch(url, {next: {revalidate: 43200}});
    if (!res.ok) return [];
    const data = await res.json();
    const source: any[] = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
    return source
      .map((item: any) => {
        const id = item._id || item.id || item.slug || null;
        const lastmod = item.updatedAt || item.createdAt || item.date || null;
        if (!id) return null;
        return {id: String(id), lastmod: lastmod ? String(lastmod).slice(0, 10) : null};
      })
      .filter(Boolean) as {id: string; lastmod: string | null}[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().slice(0, 10);

  const staticPages: MetadataRoute.Sitemap = [
    {url: `${ROOT}/`, lastModified: today, changeFrequency: 'daily', priority: 1.0},
    {url: `${ROOT}/listing_05`, lastModified: today, changeFrequency: 'daily', priority: 0.9},
    {url: `${ROOT}/listing_14`, lastModified: today, changeFrequency: 'daily', priority: 0.8},
    {url: `${ROOT}/blog_01`, lastModified: today, changeFrequency: 'weekly', priority: 0.7},
    {url: `${ROOT}/about_us_03`, lastModified: today, changeFrequency: 'monthly', priority: 0.6},
    {url: `${ROOT}/contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.6},
    {url: `${ROOT}/faq`, lastModified: today, changeFrequency: 'monthly', priority: 0.5},
    {url: `${ROOT}/agent`, lastModified: today, changeFrequency: 'monthly', priority: 0.5},
  ];

  const [properties, posts] = await Promise.all([
    fetchItems(`${API}/property/public?page=0&pageSize=1000`),
    fetchItems(`${API}/blog/public?page=0&pageSize=1000`),
  ]);

  const propertyPages: MetadataRoute.Sitemap = properties.map(({id, lastmod}) => ({
    url: `${ROOT}/listing_details_05/${id}`,
    lastModified: lastmod ?? today,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map(({id, lastmod}) => ({
    url: `${ROOT}/blog_details/${id}`,
    lastModified: lastmod ?? today,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
