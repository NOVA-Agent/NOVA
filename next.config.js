/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'solana.com', 'cryptologos.cc'],
  },
}

module.exports = nextConfig 