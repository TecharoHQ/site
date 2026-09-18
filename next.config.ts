import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://anubis.techaro.lol/docs/",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/products",
        permanent: false,
      },
      {
        source: "/about.md",
        destination: "/products.md",
        permanent: false,
      },
      ...["/developers", "/console", "/dashboard"].map((source) => ({
        source,
        destination: "https://sponsors.xeiaso.net",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
