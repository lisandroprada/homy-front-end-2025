import ListingDetailsTwo from '@/components/ListingDetails/listing-details-2';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listing Details Two Homy - Propietas Inmobiliaria',
  openGraph: {
    title: 'Listing Details Two Homy - Propietas Inmobiliaria',
    images: ['/og/preview.webp'],
  },
};
const index = () => {
  return (
    <Wrapper>
      <ListingDetailsTwo />
    </Wrapper>
  );
};

export default index;
