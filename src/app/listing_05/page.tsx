import ListingFive from '@/components/inner-listing/listing-05';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Listado de propiedades Propietas Inmobiliaria',
  openGraph: {
    title: 'Listado de propiedades Propietas Inmobiliaria',
    images: ['/og/preview.webp'],
  },
};

interface SearchParams {
  searchParams: {
    publishForSale?: string;
    publishForRent?: string;
    type?: string;
    locality?: string;
    price?: string;
  };
}

const IndexPage = ({searchParams}: SearchParams) => {
  // Nuevo: lee los flags de venta/alquiler
  const publishForSale = searchParams?.publishForSale === 'true';
  const publishForRent = searchParams?.publishForRent === 'true';
  const type = searchParams?.type || '';
  const locality = searchParams?.locality || '';
  const price = searchParams?.price || '';

  return (
    <Wrapper>
      <ListingFive publishForSale={publishForSale} publishForRent={publishForRent} type={type} locality={locality} price={price} />
    </Wrapper>
  );
};

export default IndexPage;
