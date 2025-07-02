import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jhtjdapbeiybxpqvyqqs.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
    dangerouslyAllowSVG: false,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Optimización adicional
  experimental: {
    // optimizeCss: true, // Disabled temporarily - requires critters dependency
    gzipSize: true,
  },
};

export default nextConfig;
