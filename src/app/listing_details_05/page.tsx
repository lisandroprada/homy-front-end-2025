import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listad de Propiedades - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <ListingDetailsFive property={undefined} />
    </Wrapper>
  );
};

export default index;
