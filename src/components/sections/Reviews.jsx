import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import { IconStar } from "@/components/ui/Icons";

const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

/* Real reviews, two counter-scrolling rows (CSS only, pause on hover). */
export default function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, half);
  const rowB = reviews.slice(half);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden pt-[var(--section-gap)]">
      <Reveal className="mx-auto grid max-w-7xl items-end gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr] lg:px-8">
        <div data-reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-deep">What Islamabad says</p>
          <h2 id="reviews-title" className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            “Felt like <span className="flourish text-deep">home.</span>”
          </h2>
        </div>
        <div data-reveal className="flex items-center gap-5 rounded-[var(--radius-card)] bg-surface p-5 md:justify-self-end">
          <span className="text-6xl font-extrabold leading-none tracking-tight text-deep">{site.rating.value}</span>
          <span>
            <span className="flex gap-0.5 text-pop" aria-label={`${site.rating.value} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="h-5 w-5 stroke-foreground/30" />
              ))}
            </span>
            <span className="mt-1 block text-sm font-semibold">
              {site.rating.count.toLocaleString()}+ ratings on {site.rating.source}
            </span>
            <a href={site.links.foodpanda} target="_blank" rel="noopener" className="text-sm text-muted underline underline-offset-4 hover:text-foreground">
              Read them all
            </a>
          </span>
        </div>
      </Reveal>

      <div className="mask-fade-x group mt-12 space-y-4">
        <Row items={rowA} className="animate-marquee" />
        <Row items={rowB} className="animate-marquee-rev" />
      </div>
    </section>
  );
}

function Row({ items, className }) {
  const doubled = [...items, ...items];
  return (
    <div className={`flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused] ${className}`}>
      {doubled.map((r, i) => (
        <figure
          key={i}
          aria-hidden={i >= items.length ? true : undefined}
          className="w-[300px] shrink-0 rounded-[var(--radius-card)] bg-surface p-5 sm:w-[360px]"
        >
          <div className="flex gap-0.5 text-pop">
            {Array.from({ length: 5 }).map((_, k) => (
              <IconStar key={k} className="h-4 w-4 stroke-foreground/30" />
            ))}
          </div>
          <blockquote className="mt-3 text-[0.98rem] leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3 text-sm">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-deep font-bold text-on-deep">{r.name[0]}</span>
            <span>
              <span className="block font-bold">{r.name}</span>
              <span className="text-muted">
                {r.source} · {fmtDate(r.date)}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
