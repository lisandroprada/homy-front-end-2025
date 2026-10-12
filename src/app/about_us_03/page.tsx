import AboutUsThree from '@/components/inner-pages/about-us/about-us-three';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Sobre iPropietas, inmobiliaria en Rawson',
  description: 'Conocé a iPropietas, la inmobiliaria de Rawson y Playa Unión. Experiencia en venta y alquiler de propiedades en Rawson, Playa Unión y el Valle del Río Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/about_us_03',
  },
  openGraph: {
    title: 'Sobre iPropietas, inmobiliaria en Rawson | iPropietas',
    description: 'Conocé a iPropietas, la inmobiliaria de Rawson y Playa Unión, en el Valle del Río Chubut.',
    images: ['/og/preview.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'iPropietas',
  url: 'https://www.ipropietas.com.ar',
  description: 'Inmobiliaria en Rawson y Playa Unión, Chubut. Compra, venta y alquiler de propiedades en Rawson, Playa Unión y el Valle del Río Chubut.',
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
