/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const API_HOST = isProd ? 'https://api.netra.com.ar' : 'http://localhost:3050';

const nextConfig = {
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
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${API_HOST}/uploads/:path*`,
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
