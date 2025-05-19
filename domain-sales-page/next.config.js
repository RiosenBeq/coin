/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
  trailingSlash: false,
  // 404 sayfası için basitleştirilmiş fallback yapılandırması
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/404'
        },
      ],
    };
  },
  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? '' 
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.whatsapp.com; frame-src 'none';"
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ]
  }
};

module.exports = nextConfig; 