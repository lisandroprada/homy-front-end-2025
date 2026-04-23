import BlogDetails from '@/components/blogs/blog-details';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Noticias del mercado inmobiliario - iPropietas',
  description: 'Noticias, consejos y tendencias del mercado inmobiliario argentino. Alquileres, ventas, inversiones y más en el blog de iPropietas.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/blog_details',
  },
  openGraph: {
    title: 'Noticias del mercado inmobiliario - iPropietas',
    description: 'Noticias, consejos y tendencias del mercado inmobiliario argentino.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
};

export default index;
