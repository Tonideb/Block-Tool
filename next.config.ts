import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true, // 🚨 This will skip ALL ESLint checks
  },

  // Optional: Disable TypeScript errors too (if needed)
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Use with caution!
  },
};

export default nextConfig;