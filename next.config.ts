const path = require("node:path");

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 修正 Next.js 偵測到專案根目錄以外還有其他的 lockfile 導致 Turbopack 對專案根目錄的判斷產生混淆。
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
