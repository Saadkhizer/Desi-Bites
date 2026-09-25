"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { nav, site } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { HandiMark, IconBag } from "@/components/ui/Icons";
import OpenBadge from "@/components/ui/OpenBadge";

export default function Header() {
  const { count, setOpen, pulse } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pulse) controls.start({ scale: [1, 1.22, 0.94, 1], transition: { duration: 0.5 } });
  }, [pulse, controls]);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--border)]" : ""
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <HandiMark className="h-10 w-10 text-deep transition-transform duration-500 group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="block text-[1.35rem] font-extrabold tracking-tight">
              Desi <span className="flourish text-deep text-[1.5rem]">Bites</span>
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Homemade · Islamabad
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="ml-8 hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden md:block"><OpenBadge /></span>
          <a href="#menu" className="btn btn-pop hidden !min-h-11 sm:inline-flex">
            Order now
          </a>
          <motion.button
            animate={controls}
            type="button"
            onClick={() => setOpen(true)}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-deep text-on-deep"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <IconBag />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pop px-1 text-[0.7rem] font-bold text-on-pop">
                {count}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
