/** @type {import('next').NextConfig} */

const shouldAnalyzeBundles = process.env.ANALYZE === "true";

let nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer = require("next-bundle-analyzer")();
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
