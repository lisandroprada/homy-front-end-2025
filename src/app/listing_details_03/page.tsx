import ListingDetailsThree from '@/components/ListingDetails/listing-details-3';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listing Details Three Homy - Propietas Inmobiliaria',
  openGraph: {
    title: 'Listing Details Three Homy - Propietas Inmobiliaria',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <ListingDetailsThree />
    </Wrapper>
  );
};

export default index;
