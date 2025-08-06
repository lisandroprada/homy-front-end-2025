import ListingDetailsFive from '@/components/ListingDetails/listing-details-5';
import Wrapper from '@/layouts/Wrapper';
import {notFound} from 'next/navigation';
import {API_BASE_URL} from '@/utils/apiConfig'; // Importa la URL base

interface PropertyResponse {
  items: any[];
}

async function getPropertyById(id: string) {
  const url = `${API_BASE_URL}/property/public?_id=${id}`; // Usa la variable de entorno
  const res = await fetch(url, {cache: 'no-store'});
  if (!res.ok) return null;
  const data: PropertyResponse = await res.json();
  return data.items?.[0] || null;
}

export default async function Page({params}: {params: {id: string}}) {
  const property = await getPropertyById(params.id);
  if (!property) return notFound();
  return (
    <Wrapper>
      <ListingDetailsFive property={property} />
    </Wrapper>
  );
}
