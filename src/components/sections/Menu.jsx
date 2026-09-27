"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { categories, menu } from "@/lib/menu";
import DishCard from "@/components/cart/DishCard";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { IconSearch, IconClose } from "@/components/ui/Icons";

/**
 * Full menu: sticky chip row with scrollspy + search.
 * Every item is server-rendered in the HTML (good for SEO); search only
 * filters what's visible.
 */
export default function Menu() {
  const [active, setActive] = useState(categories[0].id);
  const [query, setQuery] = useState("");
  const chipRow = useRef(null);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? menu.filter((m) => `${m.name} ${m.desc}`.toLowerCase().includes(q)) : []),
    [q]
  );

  // Scrollspy — whichever category crosses the band under the chip row wins.
  useEffect(() => {
    if (q) return;
    const els = categories.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("cat-", ""));
        });
      },
      { rootMargin: "-160px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [q]);

  // Keep the active chip visible inside the horizontally-scrolling row.
  useEffect(() => {
    const chip = chipRow.current?.querySelector(`[data-chip="${active}"]`);
    if (!chip || !chipRow.current) return;
    const row = chipRow.current;
    const left = chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2;
    row.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const jump = (id) => {
    setQuery("");
    setActive(id);
    requestAnimationFrame(() => scrollToTarget(`#cat-${id}`, -150));
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="pt-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">Full menu</p>
            <h2 id="menu-title" className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
              Aaj kya <span className="flourish text-deep">khayenge?</span>
            </h2>
            <p className="mt-3 text-sm text-muted">Tasveerein sirf andaaza dene ke liye hain — asal khana is se bhi zabardast. 😉</p>
          </div>
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search the menu</span>
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — zinger, shawarma, fries…"
              className="h-13 w-full rounded-full border border-border bg-surface pl-12 pr-12 text-base outline-none placeholder:text-muted/80 focus:border-deep"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full hover:bg-surface-2" aria-label="Clear search">
                <IconClose className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* sticky chip row */}
      <div className="sticky top-[72px] z-30 mt-8 bg-background/92 py-3 backdrop-blur-md">
        <nav aria-label="Menu categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={chipRow} className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto">
            {categories.map((c) => {
              const on = !q && active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  data-chip={c.id}
                  onClick={() => jump(c.id)}
                  aria-current={on ? "true" : undefined}
                  className={`flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                    on ? "bg-pop text-on-pop shadow-[0_6px_16px_-8px_rgb(35_21_15/0.5)]" : "bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  <span aria-hidden>{c.emoji}</span> {c.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {q ? (
          <div className="pt-8" aria-live="polite">
            <p className="text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
            </p>
            {results.length ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((item) => (
                  <DishCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-[var(--radius-card)] bg-surface p-8 text-center">
                Nahi mila? WhatsApp karein — kitchen batayega aur kya available hai.
              </p>
            )}
          </div>
        ) : (
          categories.map((c) => {
            const items = menu.filter((m) => m.cat === c.id);
            return (
              <div key={c.id} id={`cat-${c.id}`} className="scroll-mt-40 pt-12">
                <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
                  {c.label}
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-sm font-semibold text-muted">{items.length}</span>
                </h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <DishCard key={item.id} item={item} headingLevel="h4" />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
