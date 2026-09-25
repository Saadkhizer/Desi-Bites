"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Each [data-par] child drifts by its factor as the hero scrolls away. Linear, scrubbed. */
export default function HeroParallax({ children }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray("[data-par]", scope.current).forEach((el) => {
        const f = parseFloat(el.dataset.par || "0");
        gsap.to(el, {
          yPercent: f * -100,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      });
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
