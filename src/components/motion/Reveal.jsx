"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { M } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Wrap a section; every [data-reveal] child rises in once, duotone-bouncy.
 * Content is visible without JS (the .js class gates the hidden state).
 */
export default function Reveal({ as: Tag = "div", children, className, ...rest }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray("[data-reveal]", scope.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(els, { autoAlpha: 1 });
        return;
      }
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: M.distance.far },
            { autoAlpha: 1, y: 0, duration: M.duration.slow, ease: M.ease.entrance, stagger: M.stagger.tight, overwrite: true }
          ),
      });
    },
    { scope }
  );

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}
