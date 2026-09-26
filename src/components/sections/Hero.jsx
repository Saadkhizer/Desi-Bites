import Image from "next/image";
import { site } from "@/lib/site";
import { byId, formatPKR } from "@/lib/menu";
import { reviews } from "@/lib/reviews";
import DishImage from "@/components/ui/DishImage";
import Magnetic from "@/components/motion/Magnetic";
import { IconArrow, IconStar, IconWhatsApp } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";
import HeroParallax from "./HeroParallax";

/* Nothing above the fold waits for an animation — the hero paints instantly.
   Only the card stack gets a gentle scroll parallax (HeroParallax). */
export default function Hero() {
  const a = byId["deal-1"];
  const b = byId["student-2"];
  const review = reviews[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:pb-24">
        {/* copy */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-pop">🔥 {site.category}</span>
            <span className="badge-soft bg-surface">📍 {site.address.area}, Sector A</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.7rem,7.2vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            Love at
            <br />
            first <span className="flourish text-deep text-[1.12em] leading-none">bite.</span>
          </h1>

          <p className="urdu mt-3 text-2xl text-muted sm:text-[1.7rem]" lang="ur">
            {site.urduTagline}
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Zinger burgers, shawarma, chowmein, fried rice aur shashlik — plus deals jo jeb par
            halkay hain. Free home delivery within {site.delivery.freeRadiusKm} km on orders over Rs{" "}
            {site.delivery.minOrder}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#menu" className="btn btn-deep !min-h-14 !px-7 text-base">
                See the deals <IconArrow className="h-5 w-5" />
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
              ["8", "value deals"],
              [`${site.delivery.freeRadiusKm} km`, "free delivery"],
              ["Party", "& function orders"],
            ].map(([k, v]) => (
              <div key={v} className="rounded-2xl bg-surface px-4 py-3">
                <dt className="sr-only">{v}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-deep">{k}</dd>
                <dd className="text-xs font-medium text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* card stack — the owner's own flyer art + two deal tiles */}
        <HeroParallax>
          <div className="relative mx-auto aspect-[1/1.08] w-full max-w-[560px]">
            <div data-par="0.1" className="absolute left-0 top-[4%] w-[72%] rotate-[-3deg]">
              <div className="rounded-[calc(var(--radius-card)+6px)] bg-surface p-2.5 shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[764/504] overflow-hidden rounded-[var(--radius-card)] bg-pop">
                  <Image
                    src="/brand/food-collage.jpg"
                    alt="Desi Bite zinger burgers, shawarma, sandwiches and fries"
                    fill
                    priority
                    sizes="(max-width: 1024px) 72vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-2 px-1.5 pb-1 pt-2.5">
                  <span className="text-base font-bold leading-tight">Chinese & Fast Food</span>
                  <span className="text-sm font-bold text-deep">Sector A</span>
                </div>
              </div>
            </div>

            <div data-par="-0.08" className="absolute right-0 top-[30%] w-[40%] rotate-[5deg]">
              <HeroCard item={a} badge="Rs 370 only" />
            </div>
            <div data-par="0.2" className="absolute bottom-0 right-[18%] w-[38%] rotate-[-4deg]">
              <HeroCard item={b} badge="Student" />
            </div>

            {review && (
              <figure
                data-par="-0.16"
                className="absolute bottom-[4%] left-[-2%] w-[50%] max-w-[250px] rotate-[2deg] rounded-[var(--radius-card)] bg-deep p-4 text-on-deep shadow-[var(--shadow-lift)]"
              >
                <div className="flex gap-0.5 text-pop" aria-label={`${review.stars} stars`}>
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-2 text-sm leading-snug">“{review.text}”</blockquote>
                <figcaption className="mt-2 text-xs opacity-80">
                  {review.name} · {review.source} review
                </figcaption>
              </figure>
            )}
          </div>
        </HeroParallax>
      </div>
    </section>
  );
}

function HeroCard({ item, badge }) {
  return (
    <div className="rounded-[calc(var(--radius-card)+6px)] bg-surface p-2 shadow-[var(--shadow-lift)]">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
        <DishImage
          src={item.image}
          art={item.art}
          alt={item.name}
          sizes="(max-width: 1024px) 40vw, 230px"
        />
        <span className="badge-pop absolute left-2 top-2 !bg-background">{badge}</span>
      </div>
      <div className="flex items-baseline justify-between gap-2 px-1.5 pb-1 pt-2">
        <span className="text-sm font-bold leading-tight">{item.name}</span>
        <span className="shrink-0 text-xs font-bold text-deep">{formatPKR(item.price)}</span>
      </div>
    </div>
  );
}
