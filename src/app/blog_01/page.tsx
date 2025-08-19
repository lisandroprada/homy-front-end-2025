import Wrapper from '@/layouts/Wrapper';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import BreadcrumbThree from '@/components/common/breadcrumb/BreadcrumbThree';
import FancyBanner from '@/components/common/FancyBanner';
import FooterFour from '@/layouts/footers/FooterFour';
import BlogOneArea from '@/components/blogs/blog-one/BlogOneArea';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Noticias - Propietas Inmobiliaria',
};

export default async function Page() {
  // Server-side prefetch (best-effort). In build, we avoid failing by catching errors.
  let categories: any[] = [];
  let postsData: any = {items: [], meta: null};
  const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.netra.com.ar/api/v1';
  try {
    const categoriesRes = await fetch(`${API}/blog/stats/categories`, {cache: 'no-store'});
    if (categoriesRes.ok) categories = await categoriesRes.json();
  } catch {}
  try {
    const postsRes = await fetch(`${API}/blog/public?page=0&pageSize=6&sort=-date`, {cache: 'no-store'});
    if (postsRes.ok) postsData = await postsRes.json();
  } catch {}

  return (
    <Wrapper>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbThree title='Noticias' link='#' link_title='Pagina' sub_title='Noticias' style={false} />
      {/* Hydrate BlogOneArea via search params + it will fetch client-side; we keep server doing the heavy first render by passing initial markup */}
      <BlogOneArea /* could accept initial data via props in a future refactor */ />
      <FancyBanner />
      <FooterFour />
      {/* Optionally embed JSON for hydration later */}
      <script type='application/json' id='__blog-initial__' dangerouslySetInnerHTML={{__html: JSON.stringify({posts: postsData.items || [], meta: postsData.meta || null, categories})}} />
    </Wrapper>
  );
}
