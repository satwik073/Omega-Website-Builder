const { m } = require('framer-motion')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  fastRefresh: true,
  onDemandEntries: {
    maxInactiveAge: 15 * 60 * 1000,
    pageBufferLenth: 4
  },
  concurrentFeatures: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  minify: false,
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'img.clerk.com',
      'subdomain',
      'files.stripe.com',
      'images.unsplash.com',
      'assets.aceternity.com'

    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
