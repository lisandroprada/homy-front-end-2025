import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { propertyId } = body;
  if (!propertyId) {
    return NextResponse.json({ error: 'propertyId required' }, { status: 400 });
  }

  revalidatePath(`/listing_details_05/${propertyId}`);

  return NextResponse.json({ revalidated: true, propertyId });
}
