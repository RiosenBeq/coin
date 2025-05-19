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
};

module.exports = nextConfig; 