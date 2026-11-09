import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only: build to ./out.
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
