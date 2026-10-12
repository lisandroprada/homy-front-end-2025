import ListingFourteen from '@/components/inner-listing/listing-14';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Mapa de propiedades en Rawson y Playa Unión',
  description: 'Encontrá en el mapa las propiedades en venta y alquiler en Rawson, Playa Unión y el Valle del Río Chubut.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/listing_14',
  },
  openGraph: {
    title: 'Mapa de propiedades en Rawson y Playa Unión | iPropietas',
    description: 'Encontrá en el mapa las propiedades en venta y alquiler en Rawson, Playa Unión y el Valle del Río Chubut.',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <ListingFourteen />
    </Wrapper>
  );
};

export default index;
