import ListingSeventeen from '@/components/inner-listing/listing-17';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listado de propiedades - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <ListingSeventeen />
    </Wrapper>
  );
};

export default index;
