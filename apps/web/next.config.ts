import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
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
