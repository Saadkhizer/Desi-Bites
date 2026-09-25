/**
 * next/image loader for dish photos.
 *  - Foodpanda CDN images are resized by the CDN itself (?width=&height=),
 *    so we skip Next's optimizer and don't burn Vercel image quota.
 *  - Local images (/dishes/...) pass through untouched.
 */
export default function dishLoader({ src, width }) {
  if (src.startsWith("/")) return src;
  const w = Math.min(width, 1200);
  return `${src}?width=${w}&height=${w}`;
}
