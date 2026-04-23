import HomeFour from '@/components/homes/home-four';
import ListingTwo from '@/components/inner-listing/listing-02';
import ListingFive from '@/components/inner-listing/listing-05';
import AboutUsThree from '@/components/inner-pages/about-us/about-us-three';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Sobre nosotros - iPropietas',
  description: 'Conocé a iPropietas, la inmobiliaria de confianza en la Patagonia Argentina. Más de años de experiencia en venta y alquiler de propiedades.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/about_us_03',
  },
  openGraph: {
    title: 'Sobre nosotros - iPropietas',
    description: 'Conocé a iPropietas, la inmobiliaria de confianza en la Patagonia Argentina.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <AboutUsThree />
    </Wrapper>
  );
};

export default index;
