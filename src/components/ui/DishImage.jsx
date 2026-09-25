"use client";

import Image from "next/image";
import { useState } from "react";
import dishLoader from "@/lib/dishImage";
import { HandiMark } from "./Icons";

/** Dish photo with CDN-side resizing and a graceful fallback if it 404s. */
export default function DishImage({ src, alt, className = "", sizes, priority = false, fill = true, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`grid h-full w-full place-items-center bg-surface-2 ${className}`} role="img" aria-label={alt}>
        <HandiMark className="h-1/3 w-1/3 text-deep/40" />
      </div>
    );
  }

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
