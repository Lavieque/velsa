import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only honours quality values listed here. 90 is for the project
    // screenshots, where text turns soft at the default 75.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
