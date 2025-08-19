/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const API_HOST = isProd ? 'https://api.netra.com.ar' : 'http://localhost:3050';

const nextConfig = {
  // Avoid running ESLint during builds on CI (can trigger heavy globs)
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
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
  },
  images: {
    remotePatterns: [
      {
        protocol: isProd ? 'https' : 'http',
        hostname: isProd ? 'api.netra.com.ar' : 'localhost',
        port: isProd ? '' : '3050',
        pathname: '/uploads/**',
      },
    ],
    domains: ['placehold.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${API_HOST}/uploads/:path*`,
      },
      {
        source: '/api/v1/property/map',
        destination: `${API_HOST}/api/v1/property/map`,
      },
      {
        source: '/api/v1/blog/:id',
        destination: `${API_HOST}/api/v1/blog/:id`,
      },
      {
        source: '/api/v1/blog/public',
        destination: `${API_HOST}/api/v1/blog/public`,
      },
      {
        source: '/api/v1/property/public',
        destination: `${API_HOST}/api/v1/property/public`,
      },
      {
        source: '/api/v1/blog/stats/categories',
        destination: `${API_HOST}/api/v1/blog/stats/categories`,
      },
      {
        source: '/api/v1/blog/public/recent',
        destination: `${API_HOST}/api/v1/blog/public/recent`,
      },
      {
        source: '/api/locality/with-available-properties',
        destination: `${API_HOST}/api/v1/locality/with-available-properties`,
      },
    ];
  },
};

module.exports = nextConfig;
