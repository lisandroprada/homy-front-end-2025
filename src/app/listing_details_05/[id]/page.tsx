import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';
import {notFound} from 'next/navigation';
import {getPropertyById, buildJsonLd, buildMetadata, serializeJsonLd} from '@/lib/propertyMetadata';
import {PropertyLinkIndex} from '@/components/seo/CrawlableLinks';
import {getPublicPropertyLinks, pickSimilar} from '@/lib/crawlable';

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const property = await getPropertyById(id);
  if (!property) return notFound();
  const jsonLd = buildJsonLd(property, id);
  const similar = pickSimilar(await getPublicPropertyLinks(), {id, type: property.type, locality: property.locality?.name});

  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: serializeJsonLd(jsonLd)}} />
      <ListingDetailsFive property={property}>
        <PropertyLinkIndex title='Propiedades similares' items={similar} />
      </ListingDetailsFive>
    </Wrapper>
  );
}

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const property = await getPropertyById(id);
  if (!property) return {};

  return buildMetadata(property, id);
}
