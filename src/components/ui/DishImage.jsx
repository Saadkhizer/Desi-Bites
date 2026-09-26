"use client";

import Image from "next/image";
import { useState } from "react";
import dishLoader from "@/lib/dishImage";

/**
 * Dish visual. Real photo when `src` is set; otherwise a branded "art tile"
 * (big food emoji on a brand-colour sunburst) so the demo never shows a
 * broken or stock image. Swap in real photos by setting `image` in menu.js.
 */
export default function DishImage({ src, art, alt, className = "", sizes, priority = false, fill = true, emojiScale = 1, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return <FoodTile art={art} alt={alt} className={className} scale={emojiScale} />;

  return (
    <Image
      loader={dishLoader}
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

export function FoodTile({ art, alt, className = "", scale = 1 }) {
  const deep = art?.hue === "deep";
  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 grid place-items-center overflow-hidden [container-type:size] ${deep ? "bg-deep" : "bg-pop"} ${className}`}
    >
      {/* sunburst rays — echo the flyer's orange burst, drawn once in SVG */}
      <svg viewBox="0 0 200 200" className={`absolute h-[160%] w-[160%] ${deep ? "text-pop/15" : "text-deep/12"}`} aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d="M100 100 L92 -20 L108 -20 Z" fill="currentColor" transform={`rotate(${i * 22.5} 100 100)`} />
        ))}
      </svg>
      <span
        className="absolute h-[62%] w-[62%] rounded-full"
        style={{ background: deep ? "rgb(248 241 228 / 0.14)" : "rgb(248 241 228 / 0.55)" }}
        aria-hidden
      />
      <span
        className="pointer-events-none relative select-none leading-none drop-shadow-[0_10px_14px_rgb(35_21_15/0.35)]"
        style={{ fontSize: `calc(min(9rem, 42cqw) * ${scale})` }}
        aria-hidden
      >
        {art?.emoji || "🍔"}
      </span>
    </div>
  );
}
