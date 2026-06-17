/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Menghilangkan eror sourcemap massal di Vercel
  reactStrictMode: true,
};

module.exports = nextConfig;