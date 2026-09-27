/**
 * next/image loader for dish photos. Resizing happens on the image CDN,
 * so Next never proxies them and no Vercel image quota is used.
 *  - Unsplash: square crop, auto WebP/AVIF, quality 75.
 *  - Local images (/dishes/...) pass through untouched.
 */
export default function dishLoader({ src, width, quality }) {
  if (src.startsWith("/")) return src;
  const w = Math.min(width, 1200);
  if (src.includes("images.unsplash.com")) {
    return `${src}?auto=format&fit=crop&crop=entropy&w=${w}&h=${w}&q=${quality || 75}`;
  }
  return `${src}?width=${w}&height=${w}`;
}
