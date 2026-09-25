"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { popular } from "@/lib/menu";
import { M } from "@/lib/motion";
import DishCard from "@/components/cart/DishCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * SIGNATURE MOVE (duotone): the "pill wave" — cards land with a back.out
 * overshoot, staggered DIAGONALLY across the grid (row + col), not row by row.
 */
export default function Popular() {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray("[data-wave]", scope.current);
      const cols = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: M.distance.far, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: M.duration.slow,
          ease: M.ease.entrance,
          delay: (i) => ((i % cols) + Math.floor(i / cols)) * 0.09,
          scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
        }
      );
    },
    { scope }
  );

  return (
    <section aria-labelledby="popular-title" className="mx-auto max-w-7xl px-4 pt-[var(--section-gap)] sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">Most ordered right now</p>
          <h2 id="popular-title" className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Sab ki <span className="flourish text-deep">pasand.</span>
          </h2>
        </div>
        <a href="#menu" className="btn btn-ghost">Full menu →</a>
      </div>

      <div ref={scope} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((item) => (
          <div key={item.id} data-wave className="js-wave">
            <DishCard item={item} featured />
          </div>
        ))}
      </div>
    </section>
  );
}
