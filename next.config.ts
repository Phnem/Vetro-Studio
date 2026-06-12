import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Vetro',
  assetPrefix: '/Vetro',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
