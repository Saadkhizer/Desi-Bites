import Reveal from "@/components/motion/Reveal";
import { IconFlame, IconWhatsApp, IconCheck } from "@/components/ui/Icons";

/* The ONE accent-deep band on the page (duotone rule). Pop is allowed as
   large display text here — pop-on-deep is 4.58:1. */
const points = [
  { icon: IconFlame, title: "Aap ki marzi", body: "Coke, Sprite, 7up ya Pepsi — aur regular, spicy ya extra spicy. Har deal par aap chunein." },
  { icon: IconWhatsApp, title: "No app, no signup", body: "Build your order here, send it on WhatsApp in one tap. The kitchen confirms it there." },
  { icon: IconCheck, title: "Free delivery, cash on arrival", body: "Free home delivery within 2 km on orders over Rs 350. Pay when it reaches you." },
];

export default function DirectBand() {
  return (
    <section aria-labelledby="direct-title" className="mx-auto max-w-7xl px-4 pt-[var(--section-gap)] sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-band)] bg-deep px-6 py-14 text-on-deep sm:px-12 lg:px-16 lg:py-20">
        <svg className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-pop opacity-[0.12]" viewBox="0 0 200 200" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="40" rx="14" ry="40" fill="currentColor" transform={`rotate(${i * 30} 100 100)`} />
          ))}
        </svg>

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">Order direct</p>
            <h2 id="direct-title" className="mt-3 text-[clamp(2.1rem,5vw,3.8rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Aap ka khana,
              <br />
              <span className="flourish text-pop text-[1.1em]">aap ke tareeqay se.</span>
            </h2>
            <a href="#menu" className="btn btn-pop mt-8 !min-h-14 !px-7 text-base">
              Start your order →
            </a>
          </div>

          <ul className="grid gap-4">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} data-reveal className="flex gap-4 rounded-[var(--radius-card)] bg-on-deep/10 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pop text-on-pop">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-lg font-bold">{title}</span>
                  <span className="mt-1 block leading-relaxed opacity-85">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
