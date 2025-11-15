// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Entweder kurz …
    domains: [
      "app.powerbook.at",
      "images.unsplash.com",
      "flaticon.com",
      "cdn-icons-png.flaticon.com",
    ],

    // … oder granular:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'app.qnotes.net', pathname: '/**' },
    // ],
  },
};

export default nextConfig;
