/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // From your config
  },
  reactStrictMode: true, // From your config
  // images: {
  //   domains: ["mxdedvyiejcorhyosvud.supabase.co"], // From your config
  // },
  headers: async () => {
    return [
      {
        // Cache static assets (images, JS, CSS)
        source: "/:path*.(png|jpg|jpeg|webp|avif|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year
          },
        ],
      },
      {
        // Cache Homepage (root URL)
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
        // Cache AboutUs page
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
        // Cache ContactUs page
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
