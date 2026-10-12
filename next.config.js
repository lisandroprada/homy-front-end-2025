/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = !!process.env.VERCEL;
// Force localhost in development/local testing to avoid environment variable overrides
const API_HOST = isVercel
  ? (process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE || 'https://api.rentia.com.ar')
  : 'http://localhost:3001';

console.log(`[Next Config] API_HOST: ${API_HOST} (isVercel: ${isVercel}, isProd: ${isProd})`);

const nextConfig = {
  outputFileTracingExcludes: {
    '*': [
      './public/assets/fonts/**',
      './public/assets/fonts/bootstrap-icons-1.11.1/**',
      './public/assets/fonts/font-awesome-6.4.2/**',
      './public/assets/scss/**',
      './public/assets/css/**',
      './.next/cache/**',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: isProd ? 'https' : 'http',
        hostname: isProd ? 'api.rentia.com.ar' : 'localhost',
        port: isProd ? '' : '3000',
        pathname: '/uploads/**',
      },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    formats: ['image/webp'], // Removí AVIF para reducir variantes

    // ✅ OPTIMIZACIÓN 1: Reduce tamaños de dispositivo
    deviceSizes: [640, 768, 1024, 1280, 1536], // Solo breakpoints comunes
    imageSizes: [16, 32, 48, 64, 96, 128], // Removí tamaños grandes

    // ✅ OPTIMIZACIÓN 2: Configuración de calidad y cache
    minimumCacheTTL: 31536000, // 1 año de cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ✅ OPTIMIZACIÓN 3: Loader personalizado activado
    loader: 'custom',
    loaderFile: './image-loader.js',

    // ✅ OPTIMIZACIÓN 4: Para desarrollo, desactiva optimización
    ...(isProd ? {} : {unoptimized: true}),
  },
  async rewrites() {
    // "Markdown for Agents": same URL, markdown body when the client asks for it.
    // Resolved in the routing layer before the CDN cache lookup, so browsers and Googlebot
    // (which never send text/markdown) keep getting the cached HTML.
    const wantsMarkdown = [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }];
    const beforeFiles = [
      { source: '/', has: wantsMarkdown, destination: '/markdown/home' },
      { source: '/listing_05', has: wantsMarkdown, destination: '/markdown/listing' },
      { source: '/listing_details_05/:id', has: wantsMarkdown, destination: '/markdown/property/:id' },
      { source: '/blog_details/:id', has: wantsMarkdown, destination: '/markdown/post/:id' },
    ];
    const afterFiles = [
      {
        source: '/uploads/:path*',
        destination: `${API_HOST}/uploads/:path*`,
      },
      {
        source: '/api/v1/reference/:path*',
        destination: `${API_HOST}/reference/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${API_HOST}/api/v1/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${API_HOST}/api/:path*`,
      },
    ];
    return { beforeFiles, afterFiles };
  },
  async redirects() {
    // Detail routes without an id have no content; /listing_details_05/:id and /blog_details/:id are the real ones.
    // Template demo pages that still answered 200 under our domain (Search Console: "Rastreada/Descubierta, sin
    // indexar", duplicates without canonical). Each goes to the closest REAL page. Demo pages with no real
    // equivalent (pricing, service, project, compare, dashboard) were removed and answer 404 instead.
    const demoToReal = {
      '/listing_05': [
        ...[1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17].map((n) => `listing_${String(n).padStart(2, '0')}`),
        'listing_details_01', 'listing_details_02', 'listing_details_03', 'listing_details_04', 'listing_details_06',
      ],
      '/': ['home-two', 'home-three', 'home-four', 'home-five', 'home-six', 'home-seven', 'home-eight'],
      '/agent': ['agency', 'agency_details', 'agent_details'],
      '/blog_01': ['blog_02', 'blog_03', 'blog_details_02'],
      '/about_us_03': ['about_us_01', 'about_us_02'],
    };
    const demoRedirects = Object.entries(demoToReal).flatMap(([destination, routes]) =>
      routes.map((route) => ({ source: `/${route}`, destination, permanent: true })),
    );

    return [
      { source: '/listing_details_05', destination: '/listing_05', permanent: true },
      { source: '/blog_details', destination: '/blog_01', permanent: true },
      ...demoRedirects,
    ];
  },
  async headers() {
    return [
      {
        // Agent discovery (RFC 8288) + this page has a markdown variant selected by Accept.
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '</sitemap.xml>; rel="sitemap"; type="application/xml"',
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
            ].join(', '),
          },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      // Pages with a markdown variant: caches must key on Accept.
      { source: '/listing_05', headers: [{ key: 'Vary', value: 'Accept' }] },
      { source: '/listing_details_05/:id', headers: [{ key: 'Vary', value: 'Accept' }] },
      { source: '/blog_details/:id', headers: [{ key: 'Vary', value: 'Accept' }] },
    ];
  },
};

module.exports = nextConfig;
