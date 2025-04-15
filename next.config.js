/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mxdedvyiejcorhyosvud.supabase.co",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/:path*.(png|jpg|jpeg|webp|avif|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=59", // 1 hour
          },
        ],
      },
      {
        source: "/about-us",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=59", // 1 hour
          },
        ],
      },
      {
        source: "/contact-us",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=59", // 1 hour
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
