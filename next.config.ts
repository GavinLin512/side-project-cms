import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 在構建時忽略 ESLint 錯誤，因為使用 Biome 來處理 ESLint 錯誤
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
