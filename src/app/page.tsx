import HomeFour from '@/components/homes/home-four';
import Wrapper from '@/layouts/Wrapper';
import {PropertyLinkIndex} from '@/components/seo/CrawlableLinks';
import {getPublicPropertyLinks} from '@/lib/crawlable';

export const metadata = {
  title: 'iPropietas — Inmobiliaria en Argentina',
  description: 'Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler. iPropietas, tu inmobiliaria en la Patagonia.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/',
  },
  openGraph: {
    title: 'iPropietas — Inmobiliaria en Argentina',
    description: 'Encontrá las mejores propiedades en Argentina: casas, departamentos y terrenos en venta y alquiler.',
    images: ['/og/preview.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'iPropietas',
  url: 'https://www.ipropietas.com.ar',
  logo: 'https://www.ipropietas.com.ar/assets/images/logo/logo_propietas_01.svg',
  description: 'Inmobiliaria en la Patagonia Argentina. Compra, venta y alquiler de propiedades en Rawson, Trelew y Puerto Madryn.',
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

const index = async () => {
  const featured = await getPublicPropertyLinks(12);
  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <HomeFour>
        <PropertyLinkIndex
          title='Propiedades disponibles'
          intro='Las últimas propiedades publicadas en venta y alquiler.'
          items={featured}
        />
      </HomeFour>
    </Wrapper>
  );
};

export default index;
