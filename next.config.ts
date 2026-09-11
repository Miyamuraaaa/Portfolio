import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
