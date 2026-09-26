"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { byId } from "@/lib/menu";
import DishImage from "@/components/ui/DishImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Counter se darwaze tak" — the free scroll-world.
 * One pinned stage; scroll scrubs a plate that rotates while each chapter's
 * dish wipes in through a growing circle, a progress ring fills, and spices
 * drift at different depths. No video, no paid generation — just transforms
 * and clip-path, so it stays light on phones.
 *
 * Without JS / with reduced motion it renders as a plain readable list.
 */
const chapters = [
  {
    kicker: "01 · Order",
    title: "Deal chunein, bas.",
    body: "Pick a deal, choose your drink and spice level, and your order goes straight to the kitchen on WhatsApp. No app, no signup.",
    dish: "deal-1",
  },
  {
    kicker: "02 · Fryer & wok",
    title: "Garam tel, tez aanch.",
    body: "Zingers fried crisp to order, chowmein and fried rice tossed on high flame, shashlik in its saucy best.",
    dish: "deal-5",
  },
  {
    kicker: "03 · Packing",
    title: "Garam garam, seal band.",
    body: "Shawarmas rolled tight, fries kept crisp, everything packed hot so it reaches you the way it left the counter.",
    dish: "student-2",
  },
  {
    kicker: "04 · Darwaza",
    title: "2 km tak, free.",
    body: "Free home delivery within 2 km of Bahria Enclave, Sector A, on orders over Rs 350. Party and function orders too.",
    dish: "family",
  },
];

const R = 47; // progress ring radius (viewBox 100)
const CIRC = 2 * Math.PI * R;

export default function KitchenStory() {
  const scope = useRef(null);
  const [enhanced, setEnhanced] = useState(false);

  // Step 1: decide if we can run the pinned version.
  useGSAP(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnhanced(true);
  });

  // Step 2: build the scrubbed timeline once the pinned layout is in the DOM.
  useGSAP(
    () => {
      if (!enhanced) return;
      const q = gsap.utils.selector(scope);
      const texts = q("[data-chapter]");
      const imgs = q("[data-dish]");
      const dots = q("[data-dot]");

      gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(imgs.slice(1), { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(dots[0], { scale: 1.6, backgroundColor: "var(--accent-deep)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: q("[data-stage]")[0],
          start: "top top",
          end: () => `+=${window.innerHeight * 3.2}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q("[data-plate]"), { rotate: -135, duration: 3 }, 0);
      tl.fromTo(q("[data-ring]"), { strokeDashoffset: CIRC }, { strokeDashoffset: 0, duration: 3 }, 0);
      q("[data-spice]").forEach((el) => {
        const d = parseFloat(el.dataset.spice);
        tl.to(el, { yPercent: d * -160, rotate: d * 220, duration: 3 }, 0);
      });

      for (let i = 1; i < chapters.length; i++) {
        const at = i - 0.55;
        tl.to(imgs[i], { clipPath: "circle(72% at 50% 50%)", duration: 0.55 }, at);
        tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.3 }, at);
        tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.25);
        tl.to(dots[i - 1], { scale: 1, backgroundColor: "var(--border)", duration: 0.2 }, at + 0.2);
        tl.to(dots[i], { scale: 1.6, backgroundColor: "var(--accent-deep)", duration: 0.2 }, at + 0.2);
      }
      tl.to({}, { duration: 0.25 }); // small hold on the last chapter
    },
    { scope, dependencies: [enhanced] }
  );

  return (
    <section id="story" ref={scope} aria-labelledby="story-title" className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-[var(--section-gap)] sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">Our kitchen</p>
        <h2 id="story-title" className="mt-2 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
          Counter se <span className="flourish text-deep">darwaze</span> tak.
        </h2>
      </div>

      {enhanced ? (
        <div data-stage className="relative flex h-[100svh] items-center overflow-hidden">
          <Spices />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8">
            {/* plate */}
            <div className="relative order-1 mx-auto aspect-square w-[min(78vw,46svh)] md:order-2 md:w-[min(42vw,72svh)]">
              <svg viewBox="0 0 100 100" className="absolute inset-[-5%] h-[110%] w-[110%] -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={R} fill="none" stroke="var(--border)" strokeWidth="1.2" />
                <circle
                  data-ring
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="var(--accent-deep)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                />
              </svg>
              <div className="absolute inset-0 rounded-full bg-surface p-[4.5%] shadow-[0_40px_60px_-30px_rgb(35_21_15/0.45)]">
                <div data-plate className="relative h-full w-full overflow-hidden rounded-full will-change-transform">
                  {chapters.map((c, i) => (
                    <div key={c.dish} data-dish className="absolute inset-0 overflow-hidden rounded-full">
                      <DishImage src={byId[c.dish].image} art={byId[c.dish].art} alt={byId[c.dish].name} emojiScale={1.5} sizes="(max-width: 768px) 78vw, 42vw" />
                    </div>
                  ))}
                </div>
              </div>
              <span className="badge-pop absolute -bottom-1 left-1/2 -translate-x-1/2 !px-4 !py-2 !text-xs">Scroll karein ↓</span>
            </div>

            {/* chapter text */}
            <div className="order-2 md:order-1">
              <div className="mb-6 flex gap-2.5" aria-hidden>
                {chapters.map((c) => (
                  <span key={c.kicker} data-dot className="h-2.5 w-2.5 rounded-full bg-border" />
                ))}
              </div>
              <div className="grid">
                {chapters.map((c) => (
                  <article key={c.kicker} data-chapter className="[grid-area:1/1]">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">{c.kicker}</p>
                    <h3 className="mt-3 text-[clamp(1.7rem,3.6vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.025em]">{c.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{c.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ol className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {chapters.map((c) => (
            <li key={c.kicker} className="rounded-[var(--radius-card)] bg-surface p-3">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <DishImage src={byId[c.dish].image} art={byId[c.dish].art} alt={byId[c.dish].name} sizes="(max-width: 640px) 90vw, 25vw" />
              </div>
              <p className="mt-4 px-2 text-sm font-bold uppercase tracking-[0.18em] text-deep">{c.kicker}</p>
              <h3 className="mt-1 px-2 text-xl font-extrabold">{c.title}</h3>
              <p className="mt-2 px-2 pb-3 text-muted">{c.body}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/* Hand-drawn spice glyphs drifting at different depths (data-spice = depth). */
function Spices() {
  const items = [
    { d: 0.9, cls: "left-[6%] top-[14%] w-10 text-deep", g: "chilli" },
    { d: 0.5, cls: "left-[42%] top-[8%] w-7 text-positive", g: "leaf" },
    { d: 1.2, cls: "right-[6%] top-[22%] w-9 text-pop", g: "anise" },
    { d: 0.7, cls: "right-[14%] bottom-[10%] w-8 text-deep", g: "chilli" },
    { d: 1.0, cls: "left-[12%] bottom-[14%] w-7 text-pop", g: "cardamom" },
    { d: 0.4, cls: "left-[48%] bottom-[6%] w-6 text-positive", g: "leaf" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {items.map((s, i) => (
        <span key={i} data-spice={s.d} className={`absolute ${s.cls} opacity-80`}>
          <SpiceGlyph kind={s.g} />
        </span>
      ))}
    </div>
  );
}

function SpiceGlyph({ kind }) {
  const common = { viewBox: "0 0 40 40", className: "h-auto w-full" };
  if (kind === "chilli")
    return (
      <svg {...common}>
        <path d="M8 30c10 2 22-6 24-18 1-3-3-4-4-1-3 9-10 14-19 14-3 0-4 4-1 5Z" fill="currentColor" />
        <path d="M29 10c0-3 2-5 5-5" stroke="var(--tone-positive)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  if (kind === "leaf")
    return (
      <svg {...common}>
        <path d="M6 34C6 18 16 8 34 6c-2 18-12 28-28 28Z" fill="currentColor" />
        <path d="M6 34 24 16" stroke="var(--background)" strokeWidth="1.6" />
      </svg>
    );
  if (kind === "anise")
    return (
      <svg {...common}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="20" cy="9" rx="3.6" ry="8" fill="currentColor" transform={`rotate(${i * 45} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="3" fill="var(--accent-deep)" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M20 4c8 6 10 20 0 32C10 24 12 10 20 4Z" fill="currentColor" />
      <path d="M20 8v24" stroke="var(--accent-deep)" strokeWidth="1.4" opacity=".4" />
    </svg>
  );
}
