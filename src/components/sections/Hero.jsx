import { site } from "@/lib/site";
import { byId, formatPKR } from "@/lib/menu";
import DishImage from "@/components/ui/DishImage";
import Magnetic from "@/components/motion/Magnetic";
import { IconArrow, IconStar, IconWhatsApp, IconLeaf } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";
import HeroParallax from "./HeroParallax";

/* Nothing above the fold waits for an animation — the hero paints instantly.
   Only the photo stack gets a gentle scroll parallax (HeroParallax). */
export default function Hero() {
  const a = byId["daal-chawal"];
  const b = byId["chicken-haleem"];
  const c = byId["chicken-chowmein"];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:pb-24">
        {/* copy */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-pop">
              <IconStar className="h-3.5 w-3.5" /> {site.rating.value} on {site.rating.source}
            </span>
            <span className="badge-soft bg-surface">{site.rating.count.toLocaleString()}+ ratings</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.7rem,7.2vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            Ghar jaisa khana,
            <br />
            roz <span className="flourish text-deep text-[1.12em] leading-none">taaza.</span>
          </h1>

          <p className="urdu mt-3 text-2xl text-muted sm:text-[1.7rem]" lang="ur">
            {site.urduTagline}
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Daal chawal, chicken haleem, chana pulao, Lahori chanay — cooked fresh every day in
            our Islamabad kitchen, packed hygienically and delivered hot. Mirch aap ki marzi ki.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#menu" className="btn btn-deep !min-h-14 !px-7 text-base">
                See the menu <IconArrow className="h-5 w-5" />
              </a>
            </Magnetic>
            <a
              href={waLink(`Assalam o Alaikum ${site.name}! I'd like to place an order.`)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost !min-h-14 !px-6 text-base"
            >
              <IconWhatsApp className="h-5 w-5 text-positive" /> Order on WhatsApp
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ["45+", "dishes, daily"],
              ["100%", "homemade"],
              ["3 AM", "open till late"],
            ].map(([k, v]) => (
              <div key={v} className="rounded-2xl bg-surface px-4 py-3">
                <dt className="sr-only">{v}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-deep">{k}</dd>
                <dd className="text-xs font-medium text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* photo stack — in-frame rounded cards, never cut-outs (duotone rule) */}
        <HeroParallax>
          <div className="relative mx-auto aspect-[1/1.14] w-full max-w-[560px]">
            <div data-par="0.12" className="absolute left-0 top-[6%] w-[56%] rotate-[-4deg]">
              <HeroCard item={a} badge="Best Seller" priority />
            </div>
            <div data-par="-0.08" className="absolute right-0 top-0 w-[42%] rotate-[5deg]">
              <HeroCard item={b} badge="Must try" small />
            </div>
            <div data-par="0.2" className="absolute bottom-0 right-[3%] w-[46%] rotate-[-2deg]">
              <HeroCard item={c} badge="10/10" small />
            </div>

            <figure
              data-par="-0.16"
              className="absolute bottom-[8%] left-[-2%] w-[58%] max-w-[270px] rotate-[2deg] rounded-[var(--radius-card)] bg-deep p-4 text-on-deep shadow-[var(--shadow-lift)]"
            >
              <div className="flex gap-0.5 text-pop" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-2 text-sm leading-snug">
                “Mom’s gone for Hajj, was craving her daal chawal. Waqae maza agaya.”
              </blockquote>
              <figcaption className="mt-2 text-xs opacity-80">Abdullah · Foodpanda review</figcaption>
            </figure>

            <span className="absolute left-[4%] top-[-2%] hidden rotate-[-8deg] items-center gap-1.5 rounded-full bg-background px-3 py-2 text-xs font-bold shadow-[var(--shadow-lift)] sm:inline-flex">
              <IconLeaf className="h-4 w-4 text-positive" /> Fresh daily
            </span>
          </div>
        </HeroParallax>
      </div>
    </section>
  );
}

function HeroCard({ item, badge, small = false, priority = false }) {
  return (
    <div className="rounded-[calc(var(--radius-card)+6px)] bg-surface p-2.5 shadow-[var(--shadow-lift)]">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
        <DishImage
          src={item.image}
          alt={item.name}
          priority={priority}
          sizes={small ? "(max-width: 1024px) 45vw, 260px" : "(max-width: 1024px) 62vw, 360px"}
        />
        <span className="badge-pop absolute left-2.5 top-2.5">{badge}</span>
      </div>
      <div className="flex items-baseline justify-between gap-2 px-1.5 pb-1 pt-2.5">
        <span className={`font-bold leading-tight ${small ? "text-sm" : "text-base"}`}>{item.name}</span>
        <span className={`shrink-0 font-bold text-deep ${small ? "text-xs" : "text-sm"}`}>{formatPKR(item.price)}</span>
      </div>
    </div>
  );
}
