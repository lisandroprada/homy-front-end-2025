import ListingDetailsOne from '@/components/ListingDetails/listing-details-1';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listing Details One Homy - Propietas Inmobiliaria',
  openGraph: {
    title: 'Listing Details One Homy - Propietas Inmobiliaria',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <ListingDetailsOne />
    </Wrapper>
  );
};

export default index;
