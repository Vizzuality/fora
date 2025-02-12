const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging.fora.dev-vizzuality.com',
      },
    ],
  },
  output: 'standalone',
};

module.exports = withPlugins(
  [
    withOptimizedImages({
      optimizeImages: false,
    }),
  ],
  nextConfig
);
