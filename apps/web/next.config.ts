import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/meerkat", destination: "/organisms/meerkat" },
      { source: "/leech", destination: "/organisms/leech" },
      { source: "/rabbit", destination: "/organisms/rabbit" },
      { source: "/cockroach", destination: "/organisms/cockroach" },
      { source: "/frog", destination: "/organisms/frog" },
      { source: "/honeybee", destination: "/organisms/honeybee" },
      { source: "/honey-bee", destination: "/organisms/honey-bee" },
      { source: "/human-evolution", destination: "/organisms/human-evolution" },
      { source: "/horse-evolution", destination: "/organisms/horse-evolution" },
    ];
  },
};

export default nextConfig
