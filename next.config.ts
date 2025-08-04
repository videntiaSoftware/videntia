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
  // Headers de seguridad para Google Search Console
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://partner.googleadservices.com https://tpc.googlesyndication.com https://securepubads.g.doubleclick.net https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://sodar.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: https: blob: https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://partner.googleadservices.com https://securepubads.g.doubleclick.net",
              "connect-src 'self' https://www.google-analytics.com https://jhtjdapbeiybxpqvyqqs.supabase.co https://api.ipify.org https://ipapi.co https://www.google.com/recaptcha/api/siteverify https://www.google.com/recaptcha/ https://www.google.com/recaptcha/api2/ https://www.google.com/recaptcha/api2/clr https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://partner.googleadservices.com https://tpc.googlesyndication.com https://securepubads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com",
              "frame-src 'self' https://www.google.com/recaptcha/ https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://partner.googleadservices.com https://securepubads.g.doubleclick.net https://fundingchoicesmessages.google.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  },
  // Optimización adicional
  experimental: {
    // optimizeCss: true, // Disabled temporarily - requires critters dependency
    gzipSize: true,
  },
};

export default nextConfig;
