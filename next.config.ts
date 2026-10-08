import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // На старом сайте было две почти одинаковые политики ПД; объединены в /policy.
      { source: "/privacy-policy-altcoinlog", destination: "/policy", permanent: true },
    ];
  },
};

export default nextConfig;
