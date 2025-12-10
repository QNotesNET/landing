// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Entweder kurz …
    domains: [
      "my.powrbook.com",
      "app.powrbook.com",
      "app.powerbook.at",
      "images.unsplash.com",
      "flaticon.com",
      "cdn-icons-png.flaticon.com",
      "cdn.sanity.io",
    ],

    // … oder granular:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'app.qnotes.net', pathname: '/**' },
    // ],
  },
};

export default nextConfig;
