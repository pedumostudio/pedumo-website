import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig = {
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  poweredByHeader: false
};

export default nextConfig;