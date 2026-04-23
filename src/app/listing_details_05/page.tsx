import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Propiedades en venta y alquiler - iPropietas',
  description: 'Explorá el listado completo de propiedades en venta y alquiler en iPropietas. Casas, departamentos, lotes y más en Argentina.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/listing_05',
  },
  openGraph: {
    title: 'Propiedades en venta y alquiler - iPropietas',
    description: 'Explorá el listado completo de propiedades en venta y alquiler en iPropietas.',
    images: ['/og/preview.webp'],
  },
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
