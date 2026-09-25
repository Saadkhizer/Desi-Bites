import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so a stray lockfile in a parent folder
  // (e.g. C:\Users\<you>) can't confuse Turbopack's file resolution.
  turbopack: { root: __dirname },
  images: {
    // Dish photos are served by the client's Foodpanda CDN and resized there
    // by our custom loader (src/lib/dishImage.js), so Next never proxies them.
    // When the client's own photos arrive, drop them in /public/dishes and
    // switch `image` paths in src/lib/menu.js — nothing else changes.
    remotePatterns: [
      { protocol: "https", hostname: "images.deliveryhero.io" },
      { protocol: "https", hostname: "foodpanda.dhmedia.io" },
    ],
    qualities: [75, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
