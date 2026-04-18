import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error"],
    } : false,
  },

  // Security and cache headers
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];

    // Only apply cache headers in production
    if (process.env.NODE_ENV === "production") {
      // Let Next.js handle /_next/static caching automatically
      // Custom headers there can interfere with Next.js's built-in strategy
      headers.push(
        {
          source: "/images/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        }
      );
    }

    return headers;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80],
    minimumCacheTTL: 60,
  },

  compress: true,
  output: "standalone",
};

export default nextConfig;
