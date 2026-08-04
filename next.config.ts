import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.indiaweightlosschallenge.in",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.indiaweightlosschallenge.in",
        pathname: "/app/banners/**",
      },
      {
        protocol: "https",
        hostname: "www.indiaweightlosschallenge.in",
        pathname: "/app/tips/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
