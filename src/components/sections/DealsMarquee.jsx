"use client";

import { deals, formatPKR } from "@/lib/menu";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { IconPlus, IconStar } from "@/components/ui/Icons";
import DishImage from "@/components/ui/DishImage";

/**
 * Every deal from the flyer as a "ticket", in two counter-scrolling rows
 * (pure CSS marquee, pauses on hover/focus so the Add buttons are usable).
 * Below it: the real Google review, and a nudge to leave more.
 */
export default function DealsMarquee() {
  const half = Math.ceil(deals.length / 2);
  const rowA = deals.slice(0, half);
  const rowB = deals.slice(half);

  return (
    <section id="deals" aria-labelledby="deals-title" className="overflow-hidden pt-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">Saare deals, ek nazar mein</p>
          <h2 id="deals-title" className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Rs 370 se <span className="flourish text-deep">family feast</span> tak.
          </h2>
        </div>
        <p className="max-w-sm text-muted md:justify-self-end">
          Hover karein to ruk jata hai — jo pasand aaye, wahin se add karein. Har deal mein cold drink aap ki pasand ki.
        </p>
      </div>

      <div className="mask-fade-x group mt-12 space-y-4 focus-within:[&_*]:[animation-play-state:paused]">
        <Row items={rowA} className="animate-marquee" />
        <Row items={rowB} className="animate-marquee-rev" />
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        {reviews.map((r) => (
          <figure key={r.name} className="flex gap-4 rounded-[var(--radius-card)] bg-surface p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-deep text-lg font-bold text-on-deep">
              {r.name[0]}
            </span>
            <div>
              <div className="flex gap-0.5 text-pop" aria-label={`${r.stars} out of 5`}>
                {Array.from({ length: r.stars }).map((_, k) => (
                  <IconStar key={k} className="h-4 w-4 stroke-foreground/30" />
                ))}
              </div>
              <blockquote className="mt-2 text-lg leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-2 text-sm text-muted">
                {r.name} · {r.source} review
              </figcaption>
            </div>
          </figure>
        ))}
        <a
          href={site.links.google}
          target="_blank"
          rel="noopener"
          className="card-lift flex flex-col justify-center rounded-[var(--radius-card)] border-2 border-dashed border-border p-6"
        >
          <span className="text-lg font-bold">Khaya? Pasand aaya?</span>
          <span className="mt-1 text-muted">Google par ek review zaroor chhorein — isi se aur log hum tak pohanchte hain. ↗</span>
        </a>
      </div>
    </section>
  );
}

function Row({ items, className }) {
  const { setSheetItem } = useCart();
  const doubled = [...items, ...items];
  return (
    <div className={`flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused] ${className}`}>
      {doubled.map((d, i) => {
        const clone = i >= items.length;
        return (
          <article
            key={`${d.id}-${i}`}
            aria-hidden={clone || undefined}
            className="relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-[var(--radius-card)] bg-deep p-5 text-on-deep sm:w-[320px]"
          >
            <span className="absolute right-4 top-4 h-20 w-20 overflow-hidden rounded-full ring-4 ring-pop/80" aria-hidden>
              <DishImage src={d.image} art={d.art} alt="" sizes="80px" />
            </span>
            <span className="badge-pop self-start">{d.cat === "student" ? "🎓 Student" : d.cat === "family" ? "👨‍👩‍👧‍👦 Family" : "🔥 Deal"}</span>
            <h3 className="mt-3 pr-20 text-2xl font-extrabold tracking-tight">{d.name}</h3>
            <ul className="mt-2 flex-1 space-y-0.5 text-sm opacity-90">
              {(d.includes || []).map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-pop">{formatPKR(d.price)}</span>
              <button
                type="button"
                tabIndex={clone ? -1 : 0}
                onClick={() => setSheetItem(d)}
                className="btn btn-pop !min-h-11 !gap-1.5 !px-4 text-sm"
                aria-label={`Add ${d.name}`}
              >
                <IconPlus className="h-4 w-4" /> Add
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
