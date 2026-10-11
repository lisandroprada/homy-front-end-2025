import { SITE_URL } from '@/lib/markdown';

/** RFC 9727 API catalog: tells agents which APIs exist and where their machine-readable description lives. */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/v1`,
        'service-desc': [{ href: `${SITE_URL}/openapi.json`, type: 'application/openapi+json' }],
      },
    ],
  };
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
