import { Suspense } from 'react';
import Wrapper from '@/layouts/Wrapper';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import BreadcrumbThree from '@/components/common/breadcrumb/BreadcrumbThree';
import FancyBanner from '@/components/common/FancyBanner';
import FooterFour from '@/layouts/footers/FooterFour';
import BlogOneArea from '@/components/blogs/blog-one/BlogOneArea';

export const metadata = {
  title: 'Noticias del mercado inmobiliario - iPropietas',
  description: 'Noticias, consejos y tendencias del mercado inmobiliario argentino. Alquileres, ventas, inversiones y más en el blog de iPropietas.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/blog_01',
  },
  openGraph: {
    title: 'Noticias del mercado inmobiliario - iPropietas',
    description: 'Noticias, consejos y tendencias del mercado inmobiliario argentino.',
    images: ['/og/preview.webp'],
  },
};

export default async function Page() {
  // Server-side prefetch (best-effort). In build, we avoid failing by catching errors.
  let categories: any[] = [];
  let postsData: any = {items: [], meta: null};
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE || 'https://api.rentia.com.ar'}/api/v1`;
  try {
    const [categoriesRes, postsRes] = await Promise.all([
      fetch(`${API}/blog/stats/categories`, {next: {revalidate: 300}}),
      fetch(`${API}/blog/public?page=0&pageSize=6&sort=-date`, {next: {revalidate: 300}}),
    ]);
    if (categoriesRes.ok) categories = await categoriesRes.json();
    if (postsRes.ok) postsData = await postsRes.json();
  } catch {}

  return (
    <Wrapper>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbThree title='Noticias' link='#' link_title='Pagina' sub_title='Noticias' style={false} />
      {/* Hydrate BlogOneArea via search params + it will fetch client-side; we keep server doing the heavy first render by passing initial markup */}
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <BlogOneArea /* could accept initial data via props in a future refactor */ />
      </Suspense>
      <FancyBanner />
      <FooterFour />
      {/* Optionally embed JSON for hydration later */}
      <script type='application/json' id='__blog-initial__' dangerouslySetInnerHTML={{__html: JSON.stringify({posts: postsData.items || [], meta: postsData.meta || null, categories})}} />
    </Wrapper>
  );
}
