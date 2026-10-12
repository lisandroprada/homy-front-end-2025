import Error from '@/components/inner-pages/error';
import Wrapper from '@/layouts/Wrapper';

// Unmatched URLs (and notFound() calls) must answer HTTP 404. The previous catch-all *page* answered 200,
// which Search Console reports as "Soft 404" and exposed the template name in the title.
export const metadata = {
  title: 'Página no encontrada',
  robots: {index: false, follow: true},
};

export default function NotFound() {
  return (
    <Wrapper>
      <Error />
    </Wrapper>
  );
}
