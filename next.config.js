/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // prefer modern formats
  },
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
