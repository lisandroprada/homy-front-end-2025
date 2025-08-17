import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';
import {notFound} from 'next/navigation';
import {getPropertyById, buildJsonLd, buildMetadata} from '@/lib/propertyMetadata';

export default async function Page({params}: {params: {id: string}}) {
  const property = await getPropertyById(params.id);
  if (!property) return notFound();
  const jsonLd = buildJsonLd(property, params.id);

  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <ListingDetailsFive property={property} />
    </Wrapper>
  );
}

export async function generateMetadata({params}: {params: {id: string}}) {
  const property = await getPropertyById(params.id);
  if (!property) return {};

  return buildMetadata(property, params.id);
}
