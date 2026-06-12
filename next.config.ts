import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Vetro-Studio',
  assetPrefix: '/Vetro-Studio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
