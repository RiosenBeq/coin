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
    domains: ['img.icons8.com'], // Eski ve yeni yöntemleri birlikte destekleyelim
  },
  trailingSlash: false,
  // Basitleştirilmiş fallback yapılandırması
  async rewrites() {
    return {
      // Fallback rotaları burada tanımlayalım
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
              ? '' 
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.whatsapp.com; frame-src 'none';"
          }
        ],
      },
    ]
  }
};

module.exports = nextConfig; 