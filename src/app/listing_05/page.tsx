import ListingFive from '@/components/inner-listing/listing-05';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Propiedades en venta y alquiler - iPropietas',
  description: 'Buscá entre cientos de propiedades en venta y alquiler en Argentina. Filtrá por tipo, ubicación y precio en iPropietas.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/listing_05',
  },
  openGraph: {
    title: 'Propiedades en venta y alquiler - iPropietas',
    description: 'Buscá entre cientos de propiedades en venta y alquiler en Argentina.',
    images: ['/og/preview.webp'],
  },
};

interface SearchParams {
  searchParams: Promise<{
    publishForSale?: string;
    publishForRent?: string;
    type?: string;
    locality?: string;
    price?: string;
  }>;
}

const IndexPage = async ({searchParams}: SearchParams) => {
  const resolvedParams = await searchParams;
  // Nuevo: lee los flags de venta/alquiler
  const publishForSale = resolvedParams?.publishForSale === 'true';
  const publishForRent = resolvedParams?.publishForRent === 'true';
  const type = resolvedParams?.type || '';
  const locality = resolvedParams?.locality || '';
  const price = resolvedParams?.price || '';

  return (
    <Wrapper>
      <ListingFive publishForSale={publishForSale} publishForRent={publishForRent} type={type} locality={locality} price={price} />
    </Wrapper>
  );
};

export default IndexPage;
