import ListingFourteen from '@/components/inner-listing/listing-14';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Mapa de ubicación - Propietas Inmobiliaria',
  openGraph: {
    title: 'Mapa de ubicación - Propietas Inmobiliaria',
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
