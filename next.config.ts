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
      ...["/developers", "/console", "/dashboard"].map((source) => ({
        source,
        destination: "https://sponsors.xeiaso.net",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
