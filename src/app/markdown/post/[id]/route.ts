import {categoryLabel} from '@/lib/blogMetadata';
import {SITE_URL, fetchPublic, markdownResponse} from '@/lib/markdown';

export async function GET(_req: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const post = await fetchPublic<any>(`/blog/public/${encodeURIComponent(id)}`);
  const canonical = `/blog_details/${id}`;

  if (!post) {
    return markdownResponse('# Artículo no encontrado\n\nEste artículo no existe o ya no está publicado.\n', canonical, 404);
  }

  const published = (post.publishedAt || post.createdAt || '').slice(0, 10);
  const keywords = Array.isArray(post.keywords) ? post.keywords.join(', ') : '';
  const meta = [
    categoryLabel(post.category) && `- Categoría: ${categoryLabel(post.category)}`,
    post.author && `- Autor: ${post.author}`,
    published && `- Publicado: ${published}`,
    keywords && `- Palabras clave: ${keywords}`,
    `- Artículo: ${SITE_URL}${canonical}`,
  ].filter(Boolean);

  // `content` is already Markdown (see BLOG_COPY_BRIEF.md), so it is served as written.
  const body = [`# ${post.title}`, '', post.description, '', ...meta, '', post.content ?? '', ''].join('\n');
  return markdownResponse(body, canonical);
}
