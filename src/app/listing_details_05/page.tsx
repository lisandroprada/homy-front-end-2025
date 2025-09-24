import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listad de Propiedades - Propietas Inmobiliaria',
};
const index = () => {
  const mockProperty = {
    type: 'lote',
    // Add other necessary properties for the component to render correctly
  };

  return (
    <Wrapper>
      <ListingDetailsFive property={mockProperty} />
    </Wrapper>
  );
};

export default index;
