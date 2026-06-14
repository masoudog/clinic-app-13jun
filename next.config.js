/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Enable standalone mode for Amplify (better cold starts, smaller deployment)
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
    // Disable static optimization for now (use default)
    // Can optimize later based on actual usage
  },

  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // Optimize for production
  productionBrowserSourceMaps: false,

  // Headers for static assets (Amplify serves these)
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
