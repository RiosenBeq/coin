/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.icons8.com'],
  },
  onDemandEntries: {
    // Sayfaların bellekte tutulma süresi (ms)
    maxInactiveAge: 25 * 1000,
    // Aynı anda bellekte tutulacak maksimum sayfa sayısı
    pagesBufferLength: 2,
  },
  // Detaylı hata mesajlarını göster
  devIndicators: {
    position: 'bottom-right',
  },
  // Geliştirme sırasında daha iyi hata izleme için
  typescript: {
    ignoreBuildErrors: false,
  },
  // Daha kullanışlı 404 sayfası için
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? '' // Geliştirme modunda CSP'yi devre dışı bırak
              : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.whatsapp.com; frame-src 'none';"
          }
        ],
      },
    ]
  }
};

module.exports = nextConfig; 