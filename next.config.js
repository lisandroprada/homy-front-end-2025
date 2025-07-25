/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3050',
        pathname: '/uploads/**',
      },
    ],
    domains: ['placehold.co'],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3050/uploads/:path*',
      },
      {
        source: '/api/v1/blog/:id',
        destination: 'http://localhost:3050/api/v1/blog/:id',
      },
      {
        source: '/api/v1/blog/public',
        destination: 'http://localhost:3050/api/v1/blog/public',
      },
      {
        source: '/api/v1/property/public',
        destination: 'http://localhost:3050/api/v1/property/public',
      },
      {
        source: '/api/v1/blog/stats/categories',
        destination: 'http://localhost:3050/api/v1/blog/stats/categories',
      },
      {
        source: '/api/v1/blog/public/recent',
        destination: 'http://localhost:3050/api/v1/blog/public/recent',
      },
      {
        source: '/api/locality/with-available-properties',
        destination: 'http://localhost:3050/api/v1/locality/with-available-properties',
      },
    ];
  },
};

module.exports = nextConfig;
