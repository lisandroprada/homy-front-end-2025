import Contact from '@/components/inner-pages/contact';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Contacto - iPropietas',
  description: 'Contactá a iPropietas para consultas sobre propiedades en venta o alquiler en Argentina. Estamos en Rawson, Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/contact',
  },
  openGraph: {
    title: 'Contacto - iPropietas',
    description: 'Contactá a iPropietas para consultas sobre propiedades en venta o alquiler en Argentina.',
    images: ['/og/preview.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'iPropietas',
  url: 'https://www.ipropietas.com.ar',
  email: 'info@ipropietas.com.ar',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gregorio Mayo 106',
    addressLocality: 'Rawson',
    addressRegion: 'Chubut',
    addressCountry: 'AR',
  },
  sameAs: [
    'https://www.facebook.com/ipropietas',
    'https://www.instagram.com/propietasinmobiliaria/',
  ],
};

const index = () => {
  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <Contact />
    </Wrapper>
  );
};

export default index;
