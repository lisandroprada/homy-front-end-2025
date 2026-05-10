import AboutUsThree from '@/components/inner-pages/about-us/about-us-three';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Sobre nosotros - iPropietas',
  description: 'Conocé a iPropietas, la inmobiliaria de confianza en la Patagonia Argentina. Experiencia en venta y alquiler de propiedades en Rawson, Trelew y Puerto Madryn.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/about_us_03',
  },
  openGraph: {
    title: 'Sobre nosotros - iPropietas',
    description: 'Conocé a iPropietas, la inmobiliaria de confianza en la Patagonia Argentina.',
    images: ['/og/preview.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'iPropietas',
  url: 'https://www.ipropietas.com.ar',
  description: 'Inmobiliaria local en la Patagonia Argentina. Compra, venta y alquiler de propiedades en Rawson, Trelew y Puerto Madryn.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gregorio Mayo 106',
    addressLocality: 'Rawson',
    addressRegion: 'Chubut',
    addressCountry: 'AR',
  },
  email: 'info@ipropietas.com.ar',
  sameAs: [
    'https://www.facebook.com/ipropietas',
    'https://www.instagram.com/propietasinmobiliaria/',
  ],
};

const index = () => {
  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <AboutUsThree />
    </Wrapper>
  );
};

export default index;
