/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.icons8.com'],
  },
  onDemandEntries: {
    // Page cache duration in memory (ms)
    maxInactiveAge: 25 * 1000,
    // Maximum number of pages to keep in memory
    pagesBufferLength: 2,
  },
  // Show detailed error messages
  devIndicators: {
    buildActivity: true,
  },
  // Better error tracking during development
  typescript: {
    ignoreBuildErrors: true,
  },
  // For better 404 page handling
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'ref',
            value: '(?<ref>.*)',
          },
        ],
        destination: '/',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/404',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? '' // Disable CSP in development mode
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.whatsapp.com; frame-src 'none';"
          }
        ],
      },
    ]
  }
};

module.exports = nextConfig; 