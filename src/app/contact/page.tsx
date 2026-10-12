import Contact from '@/components/inner-pages/contact';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Contacto de la inmobiliaria en Rawson',
  description: 'Contactá a iPropietas por propiedades en venta o alquiler en Rawson, Playa Unión, el Valle del Río Chubut, Trelew y Puerto Madryn. Estamos en Gregorio Mayo 106, Rawson, Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/contact',
  },
  openGraph: {
    title: 'Contacto de la inmobiliaria en Rawson | iPropietas',
    description: 'Contactá a iPropietas por propiedades en venta o alquiler en Rawson, Playa Unión, el Valle del Río Chubut, Trelew y Puerto Madryn.',
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
