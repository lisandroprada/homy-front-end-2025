import ListingFive from '@/components/inner-listing/listing-05';
import Wrapper from '@/layouts/Wrapper';
import {PropertyLinkIndex} from '@/components/seo/CrawlableLinks';
import {getPublicPropertyLinks} from '@/lib/crawlable';

export const metadata = {
  title: 'Alquiler y venta de propiedades en Rawson',
  description: 'Casas, departamentos, lotes y terrenos en alquiler y venta en Rawson, Playa Unión, el Valle del Río Chubut, Trelew y Puerto Madryn. Filtrá por tipo, zona y precio.',
  alternates: {
    canonical: 'https://www.ipropietas.com.ar/listing_05',
  },
  openGraph: {
    title: 'Alquiler y venta de propiedades en Rawson | iPropietas',
    description: 'Casas, departamentos, lotes y terrenos en alquiler y venta en Rawson, Playa Unión, el Valle del Río Chubut, Trelew y Puerto Madryn.',
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
  const properties = await getPublicPropertyLinks();

  return (
    <Wrapper>
      <ListingFive publishForSale={publishForSale} publishForRent={publishForRent} type={type} locality={locality} price={price}>
        <PropertyLinkIndex
          title='Todas nuestras propiedades'
          intro='Casas, departamentos, lotes y más en Rawson, Playa Unión, el Valle del Río Chubut, Trelew y Puerto Madryn.'
          items={properties}
        />
      </ListingFive>
    </Wrapper>
  );
};

export default IndexPage;
