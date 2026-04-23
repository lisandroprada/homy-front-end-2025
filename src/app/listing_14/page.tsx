import ListingFourteen from '@/components/inner-listing/listing-14';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Mapa de propiedades - iPropietas',
  description: 'Encontrá propiedades en venta y alquiler en el mapa interactivo de iPropietas. Buscá por zona en toda Argentina.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/listing_14',
  },
  openGraph: {
    title: 'Mapa de propiedades - iPropietas',
    description: 'Encontrá propiedades en venta y alquiler en el mapa interactivo de iPropietas.',
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
