import type { NextConfig } from "next";

/** GitHub Pages project site: https://<user>.github.io/termmobalance/ */
const repo = "termmobalance";
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
